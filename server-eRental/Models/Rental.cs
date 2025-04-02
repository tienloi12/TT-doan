using System;
using System.Collections.Generic;

#nullable disable

namespace server_eRental.Models
{
    public partial class Rental
    {
        public Rental()
        {
            Payments = new HashSet<Payment>();
            UserVouchers = new HashSet<UserVoucher>();
        }

        public int RentalId { get; set; }
        public int? CustomerId { get; set; }
        public int? OrderId { get; set; }
        public DateTime? StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal TotalPrice { get; set; }
        public string Status { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual User Customer { get; set; }
        public virtual Order Order { get; set; }
        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<UserVoucher> UserVouchers { get; set; }
    }
}
