using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using server_eRental.Models;

namespace eRental.Controllers
{
    [Route("api/products")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        private readonly eRentalContext _context;

        public ProductsController(eRentalContext context)
        {
            _context = context;
        }

        // API lấy danh sách sản phẩm
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts()
        {
            var products = await _context.Products.ToListAsync();
            return Ok(products);
        }
        [HttpGet("{productId}")]
        public async Task<ActionResult<Product>> GetProductById(int productId)
        {
            var product = await _context.Products
                .Where(p => p.ProductId == productId)
                .Select(p => new
                {
                    p.ProductId,
                    p.Name,
                    p.Description,
                    p.Category,
                    p.Price,
                    p.ImageUrl,
                    p.CreatedAt
                })
                .FirstOrDefaultAsync();

            if (product == null)
            {
                return NotFound(new { message = "Không tìm thấy sản phẩm." });
            }

            return Ok(product);
        }

 [HttpGet("status-summary")]
public IActionResult GetProductStatusSummary()
{
    // Lấy tất cả trạng thái sản phẩm và sản phẩm
    var productStatuses = _context.ProductStatuses.ToList();
    var products = _context.Products.ToList();

    // Kiểm tra nếu không có dữ liệu trong bảng ProductStatuses
    if (!productStatuses.Any())
    {
        return NotFound(new { message = "Không tìm thấy trạng thái sản phẩm." });
    }

    // Tạo kết quả nhóm theo trạng thái sản phẩm
    var result = products
        .GroupBy(p => p.Status)  // Giả sử p.Status là khóa ngoại liên kết với bảng ProductStatuses
        .Select(g =>
        {
            // Kiểm tra và lấy tên trạng thái đúng
            var status = productStatuses
                .FirstOrDefault(ps => ps.StatusCode == g.Key);

            var statusName = status?.StatusName ?? "Unknown";  // Sử dụng đúng tên cột StatusCode

            return new
            {
                name = statusName,
                value = g.Count(),
            };
        })
        .ToList();

    return Ok(result);
}




    }
}
