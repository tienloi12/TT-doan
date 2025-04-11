using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System;
using System.Threading.Tasks;
using server_eRental.Models;

namespace server_eRental.Controllers
{
    [Route("api/orders")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly eRentalContext _context;

        public OrderController(eRentalContext context)
        {
            _context = context;
        }
        [HttpGet]
        public async Task<IActionResult> GetAllOrders()
        {
            var orders = await _context.Orders
                .Include(o => o.UserId) // Lấy thông tin khách hàng
                .Include(o => o.Rentals) // Lấy thông tin thuê
                .Select(o => new
                {
                    OrderId = o.OrderId,
                    CreatedAt = o.CreatedAt,
                    Rentals = o.Rentals.Select(r => new Rental
                    {
                        RentalId = r.RentalId,
                        StartDate = r.StartDate,
                        EndDate = r.EndDate,
                    }),
                })
                .ToListAsync();

            return Ok(orders);
        }
        

        [HttpGet("{orderId}")]
        public async Task<ActionResult<Order>> GetOrderById(int orderId)
        {
            var order = await _context.Orders
                .Where(o => o.OrderId == orderId)
                .Include(o => o.Rentals)     // Lấy danh sách Rentals
                .Include(o => o.Reviews)     // Lấy danh sách Reviews
                .Include(o => o.Wishlists)
                .Include(o => o.OrderProducts)  
                .Select(o => new Order
                {
                    OrderId = o.OrderId,
                    CreatedAt = o.CreatedAt,
                    Rentals = o.Rentals.Select(r => new Rental
                    {
                        RentalId = r.RentalId,
                        StartDate = r.StartDate,
                        EndDate = r.EndDate,
                    }).ToList(),
                    Reviews = o.Reviews.Select(r => new Review
                    {
                        ReviewId = r.ReviewId,
                        Rating = r.Rating,
                        Comment = r.Comment,
                    }).ToList(),
                    Wishlists = o.Wishlists.Select(w => new Wishlist
                    {
                        WishlistId = w.WishlistId,
                        UserId = w.UserId,
                    }).ToList(),
                    OrderProducts = o.OrderProducts.Select(od => new OrderProduct
                    {
                        OrderProductId = od.OrderProductId,
                        OrderId = od.OrderId,
                        ProductId = od.ProductId,
                        Quantity = od.Quantity,
                    }).ToList(),
                })
                .FirstOrDefaultAsync();

            if (order == null)
            {
                return NotFound(new { message = "Không tìm thấy đơn hàng." });
            }

            return Ok(order);
        }

       [HttpPost]
public async Task<IActionResult> CreateOrder([FromBody] Order order)
{
    if (order == null)
    {
        return BadRequest("Invalid data.");
    }

    order.CreatedAt = DateTime.UtcNow;

    if (order.Rentals != null)
    {
        foreach (var rental in order.Rentals)
        {
            rental.CreatedAt = DateTime.UtcNow;
            rental.Status = "Pending";
        }
    }

    try
    {
        await _context.Orders.AddAsync(order);
        await _context.SaveChangesAsync();

        // Load lại Rentals nếu cần trả về cho client
        await _context.Entry(order)
                      .Collection(o => o.Rentals)
                      .LoadAsync();

        return Ok(order); // hoặc Ok(new { orderId = order.OrderId });
    }
    catch (Exception ex)
    {
        return StatusCode(500, $"Internal server error: {ex.Message}");
    }
}

    }
}
