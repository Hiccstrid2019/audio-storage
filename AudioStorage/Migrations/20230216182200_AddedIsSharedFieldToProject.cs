using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AudioStorage.Migrations
{
    public partial class AddedIsSharedFieldToProject : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsShared",
                table: "projects",
                type: "tinyint(1)",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsShared",
                table: "projects");
        }
    }
}
