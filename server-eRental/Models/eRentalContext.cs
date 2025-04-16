using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

#nullable disable

namespace server_eRental.Models
{
    public partial class eRentalContext : DbContext
    {
        public eRentalContext()
        {
        }

        public eRentalContext(DbContextOptions<eRentalContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Order> Orders { get; set; }
        public virtual DbSet<OrderProduct> OrderProducts { get; set; }
        public virtual DbSet<Payment> Payments { get; set; }
        public virtual DbSet<Product> Products { get; set; }
        public virtual DbSet<Rental> Rentals { get; set; }
        public virtual DbSet<Review> Reviews { get; set; }
        public virtual DbSet<User> Users { get; set; }
        public virtual DbSet<UserVoucher> UserVouchers { get; set; }
        public virtual DbSet<Voucher> Vouchers { get; set; }
        public virtual DbSet<Wishlist> Wishlists { get; set; }
        public virtual DbSet<Login> Logins { get; set; }
        public virtual DbSet<ProductStatus> ProductStatuses { get; set; }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
                optionsBuilder.UseSqlServer("Server=DESKTOP-B3R6EGE\\SQLEXPRESS;Database=eRental;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.HasAnnotation("Relational:Collation", "SQL_Latin1_General_CP1_CI_AS");

            {
   modelBuilder.Entity<Product>()
        .HasOne(p => p.ProductStatus)
        .WithMany(s => s.Products)
        .HasForeignKey(p => p.StatusCode)
        .HasPrincipalKey(s => s.StatusCode); // Chỉ rõ khóa chính
        modelBuilder.Entity<ProductStatus>()
        .Property(ps => ps.StatusCode)
        .HasColumnName("status_code"); 
                 modelBuilder.Entity<ProductStatus>()
        .Property(ps => ps.StatusName)
        .HasColumnName("status_name");  // Cột trong cơ sở dữ liệu là 'status_code'
}
            modelBuilder.Entity<Order>(entity =>
            {
                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at");
            });
           modelBuilder.Entity<Order>()
    .Property(o => o.UserId)
    .HasColumnName("user_id");

            modelBuilder.Entity<OrderProduct>(entity =>
            {
                entity.ToTable("OrderProduct");

                entity.Property(e => e.OrderProductId).HasColumnName("order_product_id");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.ProductId).HasColumnName("product_id");

                entity.Property(e => e.Quantity).HasColumnName("quantity");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.OrderProducts)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__OrderProd__order__2A164134");

                entity.HasOne(d => d.Product)
                    .WithMany(p => p.OrderProducts)
                    .HasForeignKey(d => d.ProductId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK__OrderProd__produ__2B0A656D");
            });

            modelBuilder.Entity<Payment>(entity =>
            {
                entity.HasIndex(e => e.TransactionId, "UQ__Payments__85C600AE7D830D90")
                    .IsUnique();

                entity.Property(e => e.PaymentId).HasColumnName("payment_id");

                entity.Property(e => e.Amount)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("amount");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.PaymentMethod)
                    .HasMaxLength(50)
                    .HasColumnName("payment_method");

                entity.Property(e => e.RentalId).HasColumnName("rental_id");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasColumnName("status")
                    .HasDefaultValueSql("('pending')");

                entity.Property(e => e.TransactionId)
                    .HasMaxLength(255)
                    .HasColumnName("transaction_id");

                entity.Property(e => e.VoucherId).HasColumnName("voucher_id");

                entity.HasOne(d => d.Rental)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.RentalId)
                    .HasConstraintName("FK__Payments__rental__73BA3083");

                entity.HasOne(d => d.Voucher)
                    .WithMany(p => p.Payments)
                    .HasForeignKey(d => d.VoucherId)
                    .HasConstraintName("FK__Payments__vouche__74AE54BC");
            });

          modelBuilder.Entity<Product>(entity =>
{
    entity.Property(e => e.ProductId).HasColumnName("product_id");

    entity.Property(e => e.Category)
        .HasMaxLength(100)
        .HasColumnName("category");

    entity.Property(e => e.CreatedAt)
        .HasColumnType("datetime")
        .HasColumnName("created_at")
        .HasDefaultValueSql("(getdate())");

    entity.Property(e => e.Description)
        .HasColumnType("text")
        .HasColumnName("description");

    entity.Property(e => e.ImageUrl)
        .HasMaxLength(255)
        .HasColumnName("image_url");

    entity.Property(e => e.Name)
        .IsRequired()
        .HasMaxLength(255)
        .HasColumnName("name");

    entity.Property(e => e.Price)
        .HasColumnType("decimal(10, 2)")
        .HasColumnName("price");

    // Đảm bảo ánh xạ cho StatusCode
    entity.Property(e => e.StatusCode)
        .HasMaxLength(50)  // Đảm bảo chỉ định độ dài nếu là chuỗi
        .HasColumnName("status_code");
});


   

            modelBuilder.Entity<Rental>(entity =>
            {
                entity.Property(e => e.RentalId).HasColumnName("rental_id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.CustomerId).HasColumnName("customer_id");

                entity.Property(e => e.EndDate)
                    .HasColumnType("datetime")
                    .HasColumnName("end_date");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.StartDate)
                    .HasColumnType("datetime")
                    .HasColumnName("start_date");

                entity.Property(e => e.Status)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasColumnName("status")
                    .HasDefaultValueSql("('pending')");

                entity.Property(e => e.TotalPrice)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("total_price");

                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Rentals)
                    .HasForeignKey(d => d.CustomerId)
                    .HasConstraintName("FK__Rentals__custome__5535A963")
                    .OnDelete(DeleteBehavior.Restrict);

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Rentals)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK_Rentals_Orders");
            });

            modelBuilder.Entity<Review>(entity =>
            {
                entity.Property(e => e.ReviewId).HasColumnName("review_id");

                entity.Property(e => e.Comment)
                    .HasColumnType("text")
                    .HasColumnName("comment");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.Rating).HasColumnName("rating");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.OrderId)
                    .HasConstraintName("FK__Reviews__product__619B8048");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Reviews)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK__Reviews__user_id__60A75C0F");
            });

            modelBuilder.Entity<User>(entity =>
            {
                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.Email)
                    .IsRequired()
                    .HasMaxLength(100)
                    .HasColumnName("email");

                entity.Property(e => e.PasswordHash)
                    .IsRequired()
                    .HasMaxLength(255)
                    .HasColumnName("password_hash");

                entity.Property(e => e.Phone)
                    .HasMaxLength(15)
                    .HasColumnName("phone");

                entity.Property(e => e.ResetToken).HasMaxLength(255);

                entity.Property(e => e.ResetTokenExpiry).HasColumnType("datetime");

                entity.Property(e => e.Role)
                    .IsRequired()
                    .HasMaxLength(20)
                    .HasColumnName("role");

                entity.Property(e => e.Username)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("username");
            });

            modelBuilder.Entity<UserVoucher>(entity =>
            {
                entity.HasIndex(e => new { e.UserId, e.VoucherId, e.RentalId }, "UQ__UserVouc__3BD28395C61576D7")
                    .IsUnique();

                entity.Property(e => e.UserVoucherId).HasColumnName("user_voucher_id");

                entity.Property(e => e.RentalId).HasColumnName("rental_id");

                entity.Property(e => e.UsedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("used_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.Property(e => e.VoucherId).HasColumnName("voucher_id");

                entity.HasOne(d => d.Rental)
                    .WithMany(p => p.UserVouchers)
                    .HasForeignKey(d => d.RentalId)
                    .HasConstraintName("FK__UserVouch__renta__7E37BEF6");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserVouchers)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__UserVouch__user___7C4F7684");

                entity.HasOne(d => d.Voucher)
                    .WithMany(p => p.UserVouchers)
                    .HasForeignKey(d => d.VoucherId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__UserVouch__vouch__7D439ABD");
            });

            modelBuilder.Entity<Voucher>(entity =>
            {
                entity.HasIndex(e => e.Code, "UQ__Vouchers__357D4CF912ADD2EB")
                    .IsUnique();

                entity.Property(e => e.VoucherId).HasColumnName("voucher_id");

                entity.Property(e => e.Code)
                    .IsRequired()
                    .HasMaxLength(50)
                    .HasColumnName("code");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.DiscountType)
                    .IsRequired()
                    .HasMaxLength(10)
                    .HasColumnName("discount_type");

                entity.Property(e => e.DiscountValue)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("discount_value");

                entity.Property(e => e.EndDate)
                    .HasColumnType("datetime")
                    .HasColumnName("end_date");

                entity.Property(e => e.MaxUses).HasColumnName("max_uses");

                entity.Property(e => e.MinOrderValue)
                    .HasColumnType("decimal(10, 2)")
                    .HasColumnName("min_order_value")
                    .HasDefaultValueSql("((0))");

                entity.Property(e => e.StartDate)
                    .HasColumnType("datetime")
                    .HasColumnName("start_date");

                entity.Property(e => e.UsedCount)
                    .HasColumnName("used_count")
                    .HasDefaultValueSql("((0))");
            });

            modelBuilder.Entity<Wishlist>(entity =>
            {
                entity.ToTable("Wishlist");

                entity.HasIndex(e => new { e.UserId, e.OrderId }, "UQ__Wishlist__FDCE10D1CA5D4ED5")
                    .IsUnique();

                entity.Property(e => e.WishlistId).HasColumnName("wishlist_id");

                entity.Property(e => e.CreatedAt)
                    .HasColumnType("datetime")
                    .HasColumnName("created_at")
                    .HasDefaultValueSql("(getdate())");

                entity.Property(e => e.OrderId).HasColumnName("order_id");

                entity.Property(e => e.UserId).HasColumnName("user_id");

                entity.HasOne(d => d.Order)
                    .WithMany(p => p.Wishlists)
                    .HasForeignKey(d => d.OrderId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Wishlist__produc__68487DD7");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Wishlists)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK__Wishlist__user_i__6754599E");
            });

            OnModelCreatingPartial(modelBuilder);
        }
     
        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
