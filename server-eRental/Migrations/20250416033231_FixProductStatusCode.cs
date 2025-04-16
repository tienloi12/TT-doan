using Microsoft.EntityFrameworkCore.Migrations;

namespace server_eRental.Migrations
{
    public partial class FixProductStatusCode : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Status",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "ProductStatusStatusCode",
                table: "Products",
                type: "nvarchar(450)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "status_code",
                table: "Products",
                type: "nvarchar(50)",
                maxLength: 50,
                nullable: true);

            migrationBuilder.CreateTable(
                name: "ProductStatuses",
                columns: table => new
                {
                    StatusCode = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    StatusName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProductStatuses", x => x.StatusCode);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Products_ProductStatusStatusCode",
                table: "Products",
                column: "ProductStatusStatusCode");

            migrationBuilder.AddForeignKey(
                name: "FK_Products_ProductStatuses_ProductStatusStatusCode",
                table: "Products",
                column: "ProductStatusStatusCode",
                principalTable: "ProductStatuses",
                principalColumn: "StatusCode",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Products_ProductStatuses_ProductStatusStatusCode",
                table: "Products");

            migrationBuilder.DropTable(
                name: "ProductStatuses");

            migrationBuilder.DropIndex(
                name: "IX_Products_ProductStatusStatusCode",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "ProductStatusStatusCode",
                table: "Products");

            migrationBuilder.DropColumn(
                name: "status_code",
                table: "Products");

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "Products",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
