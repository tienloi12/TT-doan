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
    public class RentalsController : ControllerBase
    {
        private readonly eRentalContext _context;

        public RentalsController(eRentalContext context)
        {
            _context = context;
        }
        [HttpGet("status-summary")]
        public IActionResult GetOrderStatusSummary()
        {
            var statusSummary = _context.Rentals
                .GroupBy(o => o.Status)
                .Select(g => new
                {
                    name = g.Key,
                    value = g.Count()
                })
                .ToList();

            return Ok(statusSummary);
        }
        [HttpPost]
        public async Task<IActionResult> CreateRental([FromBody] Rental rental)
        {
            if (rental == null)
            {
                return BadRequest("Dữ liệu không hợp lệ.");
            }

            // Kiểm tra xem order có tồn tại không (an toàn hơn)
            var orderExists = await _context.Orders.AnyAsync(o => o.OrderId == rental.OrderId);
            if (!orderExists)
            {
                return NotFound("Không tìm thấy đơn hàng với OrderId đã cung cấp.");
            }

            rental.CreatedAt = DateTime.UtcNow;
            rental.Status = rental.Status ?? "Pending";

            _context.Rentals.Add(rental);

            try
            {
                await _context.SaveChangesAsync();
                return Ok(new { rentalId = rental.RentalId }); // Trả về ID rental mới tạo
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Lỗi server: {ex.Message}");
            }

        }

    }
}
