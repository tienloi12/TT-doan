using System;
using System.Collections.Generic;

#nullable disable

namespace server_eRental.Models
{
    public partial class Payment
    {
        public int PaymentId { get; set; }
        public int? RentalId { get; set; }
        public int? VoucherId { get; set; }
        public decimal Amount { get; set; }
        public string PaymentMethod { get; set; }
        public string Status { get; set; }
        public string TransactionId { get; set; }
        public DateTime? CreatedAt { get; set; }

        public virtual Rental Rental { get; set; }
        public virtual Voucher Voucher { get; set; }
    }
}
