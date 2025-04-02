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
                .Include(o => o.Owner) // Lấy thông tin khách hàng
                .Include(o => o.Rentals) // Lấy thông tin thuê
                .Select(o => new
                {
                    OrderId = o.OrderId,
                    Name = o.Name,
                    Description = o.Description,
                    Category = o.Category,
                    Price = o.Price,
                    Status = o.Status,
                    ImageUrl = o.ImageUrl,
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
                .Include(o => o.Wishlists)   // Lấy danh sách Wishlists
                .Select(o => new Order
                {
                    OrderId = o.OrderId,
                    Name = o.Name,
                    Description = o.Description,
                    Category = o.Category,
                    Price = o.Price,
                    Status = o.Status,
                    ImageUrl = o.ImageUrl,
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
                })
                .FirstOrDefaultAsync();

            if (order == null)
            {
                return NotFound(new { message = "Không tìm thấy đơn hàng." });
            }

            return Ok(order);
        }

        [HttpPost]
        public async Task<ActionResult<Order>> CreateOrder(Order order)
        {
            if (order == null)
            {
                return BadRequest(new { message = "Dữ liệu đơn hàng không hợp lệ!" });
            }

            order.CreatedAt = DateTime.UtcNow;

            _context.Orders.Add(order);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetOrderById), new { orderId = order.OrderId }, order);
        }
    }
}
