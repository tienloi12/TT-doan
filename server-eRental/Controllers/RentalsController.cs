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
        [HttpGet("monthly-revenue")]
        public async Task<IActionResult> GetMonthlyRevenue([FromQuery] int year)
{
    try
    {
        var rentals = await _context.Rentals
            .Where(r => r.EndDate.Year == year)
            .ToListAsync();

        var monthlyRevenue = rentals
            .GroupBy(r => r.EndDate.Month)
            .Select(g => new
            {
                Month = g.Key,
                TotalRevenue = g.Sum(r => r.TotalPrice)
            })
            .OrderBy(r => r.Month)
            .ToList();

        var result = Enumerable.Range(1, 12).Select(month => new
        {
            Month = month,
            TotalRevenue = monthlyRevenue.FirstOrDefault(r => r.Month == month)?.TotalRevenue ?? 0
        });

        return Ok(result);
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Lỗi server: {ex.Message}");
    }
}
        [HttpPut("update-status")]
        public async Task<IActionResult> UpdateProductStatus([FromBody] List<int> productIds)
{
    try
    {
        var products = await _context.Products
            .Where(p => productIds.Contains(p.ProductId))
            .ToListAsync();

        if (!products.Any()) return NotFound("Không tìm thấy sản phẩm nào.");

        foreach (var product in products)
        {
            product.StatusCode = "renting"; // hoặc mã code tương ứng từ ProductStatus
        }

        await _context.SaveChangesAsync();
        return Ok("Cập nhật trạng thái thành công.");
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Lỗi server: {ex.Message}");
    }
}


    }
}
