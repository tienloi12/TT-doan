using Microsoft.EntityFrameworkCore.Migrations;

namespace server_eRental.Migrations
{
    public partial class UpdateProductStatusColumnMapping : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "StatusCode",
                table: "ProductStatuses",
                newName: "status_code");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "status_code",
                table: "ProductStatuses",
                newName: "StatusCode");
        }
    }
}
