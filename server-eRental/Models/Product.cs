using System;
using System.Collections.Generic;

#nullable disable

namespace server_eRental.Models
{
    public partial class Product
    {
        public int ProductId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public string Category { get; set; }
        public decimal Price { get; set; }
        public string ImageUrl { get; set; }
        public DateTime? CreatedAt { get; set; }
    }
}
