using System;
using System.Collections.Generic;

#nullable disable

namespace server_eRental.Models
{
    public partial class Voucher
    {
        public Voucher()
        {
            Payments = new HashSet<Payment>();
            UserVouchers = new HashSet<UserVoucher>();
        }

        public int VoucherId { get; set; }
        public string Code { get; set; }
        public string DiscountType { get; set; }
        public decimal DiscountValue { get; set; }
        public decimal? MinOrderValue { get; set; }
        public int MaxUses { get; set; }
        public int? UsedCount { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual ICollection<Payment> Payments { get; set; }
        public virtual ICollection<UserVoucher> UserVouchers { get; set; }
    }
}
