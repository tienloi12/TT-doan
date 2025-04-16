using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
#nullable disable

namespace server_eRental.Models
{
    public partial class ProductStatus
    {
        [Key]
        public string StatusCode { get; set; }
        public string StatusName { get; set; }

        public ICollection<Product> Products { get; set; }
    }
}
