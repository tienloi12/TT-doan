using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;
using server_eRental.Models;

namespace server_eRental.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PaymentsController : ControllerBase
    {
        private readonly eRentalContext _context;

        public PaymentsController(eRentalContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> CreatePayment([FromBody] Payment payment)
        {
            if (payment == null)
                return BadRequest("Dữ liệu thanh toán không hợp lệ.");

            try
            {
                // Optional: kiểm tra rentalId có tồn tại không
                var rentalExists = await _context.Rentals.AnyAsync(r => r.RentalId == payment.RentalId);
                if (!rentalExists)
                    return NotFound("Không tìm thấy rental tương ứng.");

                payment.CreatedAt = DateTime.UtcNow;

                _context.Payments.Add(payment);
                await _context.SaveChangesAsync();

                return Ok(payment); // Trả về thông tin đã lưu
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi server khi tạo payment: {ex.Message}");
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePayment(int id, [FromBody] Payment updatedPaymentData)
        {
            if (id != updatedPaymentData.PaymentId)
            {
                return BadRequest("Payment ID mismatch.");
            }

            var payment = await _context.Payments.FindAsync(id);
            if (payment == null)
            {
                return NotFound("Payment not found.");
            }

            payment.RentalId = updatedPaymentData.Status;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PaymentExists(id))
                {
                    return NotFound("Payment not found.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent(); // Trả về HTTP 204 nếu cập nhật thành công
        }

        private bool PaymentExists(int id)
        {
            return _context.Payments.Any(e => e.PaymentId == id);
        }
    }
}
}