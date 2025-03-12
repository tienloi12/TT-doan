using System;
using System.Collections.Generic;

#nullable disable

namespace server_eRental.Models
{
    public partial class User
    {
        public User()
        {
            Products = new HashSet<Product>();
            Rentals = new HashSet<Rental>();
            Reviews = new HashSet<Review>();
            UserVouchers = new HashSet<UserVoucher>();
            Wishlists = new HashSet<Wishlist>();
        }

        public int UserId { get; set; }
        public string Username { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string Phone { get; set; }
        public string Role { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual ICollection<Product> Products { get; set; }
        public virtual ICollection<Rental> Rentals { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<UserVoucher> UserVouchers { get; set; }
        public virtual ICollection<Wishlist> Wishlists { get; set; }
    }
}
