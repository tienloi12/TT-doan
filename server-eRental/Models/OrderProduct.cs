﻿using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

#nullable disable

namespace server_eRental.Models
{
    public partial class OrderProduct
    {
        public int OrderProductId { get; set; }
        public int OrderId { get; set; }
        public int ProductId { get; set; }
        public int Quantity { get; set; }
         [JsonIgnore]
        public virtual Order Order { get; set; }
        public virtual Product Product { get; set; }
    }
}
