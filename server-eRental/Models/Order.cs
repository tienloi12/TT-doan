using System;
using System.Collections.Generic;

#nullable disable

namespace server_eRental.Models
{
    public partial class Order
    {
        public Order()
        {
            Rentals = new HashSet<Rental>();
            Reviews = new HashSet<Review>();
            Wishlists = new HashSet<Wishlist>();
            OrderProducts = new HashSet<OrderProduct>();
        }

        public int OrderId { get; set; }
        public int UserId { get; set; }        
        public DateTime? CreatedAt { get; set; }

        public virtual User Users { get; set; }
        public virtual ICollection<Rental> Rentals { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<Wishlist> Wishlists { get; set; }
        public ICollection<OrderProduct> OrderProducts { get; set; } = new List<OrderProduct>();
    }
}
