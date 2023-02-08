using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AudioStorage.Migrations
{
    public partial class AddedPosterPositon : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "PosterPosition",
                table: "projects",
                type: "double",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "PosterPosition",
                table: "projects");
        }
    }
}
