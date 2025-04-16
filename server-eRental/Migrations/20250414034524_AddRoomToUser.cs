using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace server_eRental.Migrations
{
    public partial class AddRoomToUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Logins",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Password = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Logins", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Products",
                columns: table => new
                {
                    product_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    name = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    description = table.Column<string>(type: "text", nullable: true),
                    category = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    image_url = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    Status = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Quantity = table.Column<int>(type: "int", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Products", x => x.product_id);
                });

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    user_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    username = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    email = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    password_hash = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    phone = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: true),
                    role = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Room = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    ResetToken = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    ResetTokenExpiry = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.user_id);
                });

            migrationBuilder.CreateTable(
                name: "Vouchers",
                columns: table => new
                {
                    voucher_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    code = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    discount_type = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: false),
                    discount_value = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    min_order_value = table.Column<decimal>(type: "decimal(10,2)", nullable: true, defaultValueSql: "((0))"),
                    max_uses = table.Column<int>(type: "int", nullable: false),
                    used_count = table.Column<int>(type: "int", nullable: true, defaultValueSql: "((0))"),
                    start_date = table.Column<DateTime>(type: "datetime", nullable: false),
                    end_date = table.Column<DateTime>(type: "datetime", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Vouchers", x => x.voucher_id);
                });

            migrationBuilder.CreateTable(
                name: "Orders",
                columns: table => new
                {
                    order_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Orders", x => x.order_id);
                    table.ForeignKey(
                        name: "FK_Orders_Users_user_id",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OrderProduct",
                columns: table => new
                {
                    order_product_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    order_id = table.Column<int>(type: "int", nullable: false),
                    product_id = table.Column<int>(type: "int", nullable: false),
                    quantity = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OrderProduct", x => x.order_product_id);
                    table.ForeignKey(
                        name: "FK__OrderProd__order__2A164134",
                        column: x => x.order_id,
                        principalTable: "Orders",
                        principalColumn: "order_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__OrderProd__produ__2B0A656D",
                        column: x => x.product_id,
                        principalTable: "Products",
                        principalColumn: "product_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Rentals",
                columns: table => new
                {
                    rental_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    customer_id = table.Column<int>(type: "int", nullable: true),
                    order_id = table.Column<int>(type: "int", nullable: true),
                    start_date = table.Column<DateTime>(type: "datetime", nullable: false),
                    end_date = table.Column<DateTime>(type: "datetime", nullable: false),
                    total_price = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValueSql: "('pending')"),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Rentals", x => x.rental_id);
                    table.ForeignKey(
                        name: "FK__Rentals__custome__5535A963",
                        column: x => x.customer_id,
                        principalTable: "Users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Rentals_Orders",
                        column: x => x.order_id,
                        principalTable: "Orders",
                        principalColumn: "order_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Reviews",
                columns: table => new
                {
                    review_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<int>(type: "int", nullable: true),
                    order_id = table.Column<int>(type: "int", nullable: true),
                    rating = table.Column<int>(type: "int", nullable: true),
                    comment = table.Column<string>(type: "text", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    OrderId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reviews", x => x.review_id);
                    table.ForeignKey(
                        name: "FK__Reviews__product__619B8048",
                        column: x => x.order_id,
                        principalTable: "Products",
                        principalColumn: "product_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__Reviews__user_id__60A75C0F",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK_Reviews_Orders_OrderId1",
                        column: x => x.OrderId1,
                        principalTable: "Orders",
                        principalColumn: "order_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Wishlist",
                columns: table => new
                {
                    wishlist_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<int>(type: "int", nullable: true),
                    order_id = table.Column<int>(type: "int", nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())"),
                    OrderId1 = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Wishlist", x => x.wishlist_id);
                    table.ForeignKey(
                        name: "FK__Wishlist__produc__68487DD7",
                        column: x => x.order_id,
                        principalTable: "Products",
                        principalColumn: "product_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__Wishlist__user_i__6754599E",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Wishlist_Orders_OrderId1",
                        column: x => x.OrderId1,
                        principalTable: "Orders",
                        principalColumn: "order_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "Payments",
                columns: table => new
                {
                    payment_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    rental_id = table.Column<int>(type: "int", nullable: true),
                    voucher_id = table.Column<int>(type: "int", nullable: true),
                    amount = table.Column<decimal>(type: "decimal(10,2)", nullable: false),
                    payment_method = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    status = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false, defaultValueSql: "('pending')"),
                    transaction_id = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: true),
                    created_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Payments", x => x.payment_id);
                    table.ForeignKey(
                        name: "FK__Payments__rental__73BA3083",
                        column: x => x.rental_id,
                        principalTable: "Rentals",
                        principalColumn: "rental_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__Payments__vouche__74AE54BC",
                        column: x => x.voucher_id,
                        principalTable: "Vouchers",
                        principalColumn: "voucher_id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "UserVouchers",
                columns: table => new
                {
                    user_voucher_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    user_id = table.Column<int>(type: "int", nullable: true),
                    voucher_id = table.Column<int>(type: "int", nullable: true),
                    rental_id = table.Column<int>(type: "int", nullable: true),
                    used_at = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "(getdate())")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserVouchers", x => x.user_voucher_id);
                    table.ForeignKey(
                        name: "FK__UserVouch__renta__7E37BEF6",
                        column: x => x.rental_id,
                        principalTable: "Rentals",
                        principalColumn: "rental_id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__UserVouch__user___7C4F7684",
                        column: x => x.user_id,
                        principalTable: "Users",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK__UserVouch__vouch__7D439ABD",
                        column: x => x.voucher_id,
                        principalTable: "Vouchers",
                        principalColumn: "voucher_id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_OrderProduct_order_id",
                table: "OrderProduct",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "IX_OrderProduct_product_id",
                table: "OrderProduct",
                column: "product_id");

            migrationBuilder.CreateIndex(
                name: "IX_Orders_user_id",
                table: "Orders",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_rental_id",
                table: "Payments",
                column: "rental_id");

            migrationBuilder.CreateIndex(
                name: "IX_Payments_voucher_id",
                table: "Payments",
                column: "voucher_id");

            migrationBuilder.CreateIndex(
                name: "UQ__Payments__85C600AE7D830D90",
                table: "Payments",
                column: "transaction_id",
                unique: true,
                filter: "[transaction_id] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Rentals_customer_id",
                table: "Rentals",
                column: "customer_id");

            migrationBuilder.CreateIndex(
                name: "IX_Rentals_order_id",
                table: "Rentals",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_order_id",
                table: "Reviews",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_OrderId1",
                table: "Reviews",
                column: "OrderId1");

            migrationBuilder.CreateIndex(
                name: "IX_Reviews_user_id",
                table: "Reviews",
                column: "user_id");

            migrationBuilder.CreateIndex(
                name: "IX_UserVouchers_rental_id",
                table: "UserVouchers",
                column: "rental_id");

            migrationBuilder.CreateIndex(
                name: "IX_UserVouchers_voucher_id",
                table: "UserVouchers",
                column: "voucher_id");

            migrationBuilder.CreateIndex(
                name: "UQ__UserVouc__3BD28395C61576D7",
                table: "UserVouchers",
                columns: new[] { "user_id", "voucher_id", "rental_id" },
                unique: true,
                filter: "[user_id] IS NOT NULL AND [voucher_id] IS NOT NULL AND [rental_id] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "UQ__Vouchers__357D4CF912ADD2EB",
                table: "Vouchers",
                column: "code",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Wishlist_order_id",
                table: "Wishlist",
                column: "order_id");

            migrationBuilder.CreateIndex(
                name: "IX_Wishlist_OrderId1",
                table: "Wishlist",
                column: "OrderId1");

            migrationBuilder.CreateIndex(
                name: "UQ__Wishlist__FDCE10D1CA5D4ED5",
                table: "Wishlist",
                columns: new[] { "user_id", "order_id" },
                unique: true,
                filter: "[user_id] IS NOT NULL AND [order_id] IS NOT NULL");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Logins");

            migrationBuilder.DropTable(
                name: "OrderProduct");

            migrationBuilder.DropTable(
                name: "Payments");

            migrationBuilder.DropTable(
                name: "Reviews");

            migrationBuilder.DropTable(
                name: "UserVouchers");

            migrationBuilder.DropTable(
                name: "Wishlist");

            migrationBuilder.DropTable(
                name: "Rentals");

            migrationBuilder.DropTable(
                name: "Vouchers");

            migrationBuilder.DropTable(
                name: "Products");

            migrationBuilder.DropTable(
                name: "Orders");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
