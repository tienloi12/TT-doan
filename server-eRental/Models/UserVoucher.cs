using System;
using System.Collections.Generic;

#nullable disable

namespace server_eRental.Models
{
    public partial class UserVoucher
    {
        public int UserVoucherId { get; set; }
        public int? UserId { get; set; }
        public int? VoucherId { get; set; }
        public int? RentalId { get; set; }
        public DateTime? UsedAt { get; set; }

        public virtual Rental Rental { get; set; }
        public virtual User User { get; set; }
        public virtual Voucher Voucher { get; set; }
    }
}
