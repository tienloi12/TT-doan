using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using server_eRental.Models;
using Microsoft.AspNetCore.Identity;

namespace server_eRental.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly eRentalContext _context;

        public UsersController(eRentalContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.Users.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.UserId)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.Users.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetUser", new { id = user.UserId }, user);
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {
            if (await _context.Users.AnyAsync(u => u.Email == model.Email))
                {
                    return BadRequest(new { message = "Email already exists" });
                }

                var user = new User
                {
                Username = model.Username,
                Email = model.Email,
                Phone = model.Phone,
                PasswordHash = model.PasswordHash, // Nếu không băm mật khẩu
                Role = "Customer",
                CreatedAt = DateTime.UtcNow
                };

                _context.Users.Add(user);
                await _context.SaveChangesAsync();

                return Ok(new { message = "Registration successful", user });
            }
        [HttpPost("check-email")]
        public async Task<IActionResult> CheckEmail([FromBody] ForgotPasswordRequest request)
{

            Console.WriteLine($"Received email: {request.Email}");
    var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
    if (user == null)
    {
        return NotFound(new { message = "Email not found" });
    }

    return Ok(new { message = "Email verified" });
}
        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordRequest request)
{
    var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == request.Email);
    if (user == null)
    {
        return NotFound(new { message = "Email not found" });
    }

    user.ResetToken = Guid.NewGuid().ToString();
    user.ResetTokenExpiry = DateTime.UtcNow.AddHours(1); 

    await _context.SaveChangesAsync();

    return Ok(new { message = "Reset token generated", token = user.ResetToken });
}
        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
{
    Console.WriteLine($"Received Token: {request.Token}"); 

    var user = await _context.Users.FirstOrDefaultAsync(u => u.ResetToken == request.Token);
    if (user == null || user.ResetTokenExpiry < DateTime.UtcNow)
    {
        return BadRequest(new { message = "Invalid or expired reset token" });
    }

    user.PasswordHash = request.NewPassword; 
    user.ResetToken = null;
    user.ResetTokenExpiry = null;

    await _context.SaveChangesAsync();

    return Ok(new { message = "Password reset successful" });
}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var user = await _context.Users.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.Users.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }
        private bool UserExists(int id)
        {
            return _context.Users.Any(e => e.UserId == id);
        }
       [HttpGet("profile/{userId}")]
public async Task<IActionResult> GetUserProfile(int userId) 
{
    var user = await _context.Users
        .Where(u => u.UserId == userId) 
        .Select(u => new 
        {
            u.UserId,
            u.Username,
            u.Email,
            u.Phone,
            u.Role,
            u.CreatedAt
        })
        .FirstOrDefaultAsync();

    if (user == null)
    {
        return NotFound(new { message = "User not found" });
    }

    return Ok(user);
}
        [HttpPut("update-profile/{userId}")]
public async Task<IActionResult> UpdateUserProfile(int userId, [FromBody] UpdateProfile model)
{
    var user = await _context.Users.FirstOrDefaultAsync(u => u.UserId == userId);

    if (user == null)
    {
        return NotFound(new { message = "User not found" });
    } 
    user.Username = model.Username ?? user.Username;
    user.Email = model.Email ?? user.Email;
    user.Phone = model.Phone ?? user.Phone;
    user.PasswordHash = model.Password ?? user.PasswordHash;

    _context.Users.Update(user);
    await _context.SaveChangesAsync();

    return Ok(new { message = "Profile updated successfully", user });
}
    }
}
