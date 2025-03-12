using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server_eRental.Models;

namespace server_eRental.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginsController : ControllerBase
    {
        private readonly eRentalContext _context;

        public LoginsController(eRentalContext context)
        {
            _context = context;
        }

        // GET: api/Logins
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Login>>> GetLogin()
        {
            return await _context.Login.ToListAsync();
        }

        [HttpPost("login")]
        public IActionResult Login([FromBody] Login model)    
        {

            Console.WriteLine($"Email: {model.Email}, Password: {model.Password}");

            var user = _context.Users.FirstOrDefault(u => u.Email == model.Email && u.PasswordHash == model.Password);

            if (user != null)
            {
                var token = GenerateJwtToken(user.Email);
                return Ok(new { token });
            }
            return Unauthorized(new { message = "Invalid email or password" });
        }

        private string GenerateJwtToken(string email)
        {
            // Sinh JWT nếu cần, hoặc có thể return "mock-token"
            return "mocked-token-for-" + email;
        }
    }
}
