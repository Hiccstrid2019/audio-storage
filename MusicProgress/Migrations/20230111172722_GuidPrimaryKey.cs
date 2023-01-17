using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MusicProgress.Migrations
{
    public partial class GuidPrimaryKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Audios_Lessons_LessonId",
                table: "Audios");

            migrationBuilder.DropIndex(
                name: "IX_Audios_LessonId",
                table: "Audios");

            migrationBuilder.AlterColumn<Guid>(
                name: "LessonId",
                table: "Lessons",
                type: "char(36)",
                nullable: false,
                collation: "ascii_general_ci",
                oldClrType: typeof(int),
                oldType: "int")
                .OldAnnotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn);

            migrationBuilder.AddColumn<Guid>(
                name: "LessonId1",
                table: "Audios",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Audios_LessonId1",
                table: "Audios",
                column: "LessonId1");

            migrationBuilder.AddForeignKey(
                name: "FK_Audios_Lessons_LessonId1",
                table: "Audios",
                column: "LessonId1",
                principalTable: "Lessons",
                principalColumn: "LessonId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Audios_Lessons_LessonId1",
                table: "Audios");

            migrationBuilder.DropIndex(
                name: "IX_Audios_LessonId1",
                table: "Audios");

            migrationBuilder.DropColumn(
                name: "LessonId1",
                table: "Audios");

            migrationBuilder.AlterColumn<int>(
                name: "LessonId",
                table: "Lessons",
                type: "int",
                nullable: false,
                oldClrType: typeof(Guid),
                oldType: "char(36)")
                .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn)
                .OldAnnotation("Relational:Collation", "ascii_general_ci");

            migrationBuilder.CreateIndex(
                name: "IX_Audios_LessonId",
                table: "Audios",
                column: "LessonId");

            migrationBuilder.AddForeignKey(
                name: "FK_Audios_Lessons_LessonId",
                table: "Audios",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "LessonId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
