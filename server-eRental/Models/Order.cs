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
        }

        public int OrderId { get; set; }
        public int OwnerId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public string Status { get; set; }
        public string ImageUrl { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual User Owner { get; set; }
        public virtual ICollection<Rental> Rentals { get; set; }
        public virtual ICollection<Review> Reviews { get; set; }
        public virtual ICollection<Wishlist> Wishlists { get; set; }
    }
}
