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

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.Users.ToListAsync();
        }

        // GET: api/Users/5
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

        // PUT: api/Users/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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

        // POST: api/Users
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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

    // Tạo token reset mật khẩu
    user.ResetToken = Guid.NewGuid().ToString();
    user.ResetTokenExpiry = DateTime.UtcNow.AddHours(1); // Hết hạn sau 1 giờ

    await _context.SaveChangesAsync();

    // ⚠️ Thay vì gửi email, trả token về frontend để test
    return Ok(new { message = "Reset token generated", token = user.ResetToken });
}

      [HttpPost("reset-password")]
public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordRequest request)
{
    Console.WriteLine($"Received Token: {request.Token}"); // Debug token

    var user = await _context.Users.FirstOrDefaultAsync(u => u.ResetToken == request.Token);
    if (user == null || user.ResetTokenExpiry < DateTime.UtcNow)
    {
        return BadRequest(new { message = "Invalid or expired reset token" });
    }

    // Cập nhật mật khẩu mới
    user.PasswordHash = request.NewPassword; // Nếu không băm mật khẩu
    user.ResetToken = null;
    user.ResetTokenExpiry = null;

    await _context.SaveChangesAsync();

    return Ok(new { message = "Password reset successful" });
}


        // DELETE: api/Users/5
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
    }
}
