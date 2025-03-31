using System;
using System.Collections.Generic;

#nullable disable

namespace server_eRental.Models
{
    public partial class Review
    {
        public int ReviewId { get; set; }
        public int? UserId { get; set; }
        public int? OrderId { get; set; }
        public int? Rating { get; set; }
        public string Comment { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual Order Order { get; set; }
        public virtual User User { get; set; }
    }
}
