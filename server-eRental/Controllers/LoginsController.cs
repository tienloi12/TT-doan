using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.Extensions.Configuration;
using System.Security.Claims;
using System.Text;

using Microsoft.EntityFrameworkCore;

using server_eRental.Models;


namespace server_eRental.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginsController : ControllerBase
    {
        private readonly eRentalContext _context;
        private readonly IConfiguration _configuration;

        public LoginsController(eRentalContext context, IConfiguration configuration)
        {
            _context = context;
             _configuration = configuration;
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
        var token = GenerateJwtToken(user);
        return Ok(new { token , user = new
            {
                 userId = user.UserId,
                username = user.Username,
                email = user.Email,
                phone = user.Phone,
                role = user.Role,
                createdAt = user.CreatedAt
            }});
    }
    return Unauthorized(new { message = "Invalid email or password" });
}

private string GenerateJwtToken(User user)
{
    var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
    var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

    var claims = new List<Claim>
    {
        new Claim(JwtRegisteredClaimNames.Sub, user.Email),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
        new Claim(ClaimTypes.Name, user.Email)
    };

    // Kiểm tra nếu User có thuộc tính Id và Roles
    if (user.GetType().GetProperty("UserId") != null)
    {
        claims.Add(new Claim("UserId", user.UserId.ToString()));  
    }
    
    if (user.GetType().GetProperty("Role") != null)
    {
        claims.Add(new Claim("Role", user.Role));
    }

    var token = new JwtSecurityToken(
        issuer: _configuration["Jwt:Issuer"],
        audience: _configuration["Jwt:Audience"],
        claims: claims,
        expires: DateTime.UtcNow.AddHours(1), 
        signingCredentials: credentials
    );

    return new JwtSecurityTokenHandler().WriteToken(token);
}

}
    }
