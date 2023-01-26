using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace MusicProgress.Migrations
{
    public partial class RenameTableAndModles : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Audios_Lessons_LessonId",
                table: "Audios");

            migrationBuilder.DropForeignKey(
                name: "FK_RefreshTokens_Users_UserId",
                table: "RefreshTokens");

            migrationBuilder.DropTable(
                name: "Lessons");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Users",
                table: "Users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_RefreshTokens",
                table: "RefreshTokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Audios",
                table: "Audios");

            migrationBuilder.DropIndex(
                name: "IX_Audios_LessonId",
                table: "Audios");

            migrationBuilder.RenameTable(
                name: "Users",
                newName: "users");

            migrationBuilder.RenameTable(
                name: "RefreshTokens",
                newName: "refreshtokens");

            migrationBuilder.RenameTable(
                name: "Audios",
                newName: "audios");

            migrationBuilder.RenameIndex(
                name: "IX_RefreshTokens_UserId",
                table: "refreshtokens",
                newName: "IX_refreshtokens_UserId");

            migrationBuilder.AddColumn<Guid>(
                name: "ProjectId",
                table: "audios",
                type: "char(36)",
                nullable: true,
                collation: "ascii_general_ci");

            migrationBuilder.AddPrimaryKey(
                name: "PK_users",
                table: "users",
                column: "UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_refreshtokens",
                table: "refreshtokens",
                column: "RefreshTokenId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_audios",
                table: "audios",
                column: "AudioId");

            migrationBuilder.CreateTable(
                name: "projects",
                columns: table => new
                {
                    ProjectId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    Title = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Category = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_projects", x => x.ProjectId);
                    table.ForeignKey(
                        name: "FK_projects_users_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_audios_ProjectId",
                table: "audios",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_projects_UserId",
                table: "projects",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_audios_projects_ProjectId",
                table: "audios",
                column: "ProjectId",
                principalTable: "projects",
                principalColumn: "ProjectId");

            migrationBuilder.AddForeignKey(
                name: "FK_refreshtokens_users_UserId",
                table: "refreshtokens",
                column: "UserId",
                principalTable: "users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_audios_projects_ProjectId",
                table: "audios");

            migrationBuilder.DropForeignKey(
                name: "FK_refreshtokens_users_UserId",
                table: "refreshtokens");

            migrationBuilder.DropTable(
                name: "projects");

            migrationBuilder.DropPrimaryKey(
                name: "PK_users",
                table: "users");

            migrationBuilder.DropPrimaryKey(
                name: "PK_refreshtokens",
                table: "refreshtokens");

            migrationBuilder.DropPrimaryKey(
                name: "PK_audios",
                table: "audios");

            migrationBuilder.DropIndex(
                name: "IX_audios_ProjectId",
                table: "audios");

            migrationBuilder.DropColumn(
                name: "ProjectId",
                table: "audios");

            migrationBuilder.RenameTable(
                name: "users",
                newName: "Users");

            migrationBuilder.RenameTable(
                name: "refreshtokens",
                newName: "RefreshTokens");

            migrationBuilder.RenameTable(
                name: "audios",
                newName: "Audios");

            migrationBuilder.RenameIndex(
                name: "IX_refreshtokens_UserId",
                table: "RefreshTokens",
                newName: "IX_RefreshTokens_UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Users",
                table: "Users",
                column: "UserId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_RefreshTokens",
                table: "RefreshTokens",
                column: "RefreshTokenId");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Audios",
                table: "Audios",
                column: "AudioId");

            migrationBuilder.CreateTable(
                name: "Lessons",
                columns: table => new
                {
                    LessonId = table.Column<Guid>(type: "char(36)", nullable: false, collation: "ascii_general_ci"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Category = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Title = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lessons", x => x.LessonId);
                    table.ForeignKey(
                        name: "FK_Lessons_Users_UserId",
                        column: x => x.UserId,
                        principalTable: "Users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Audios_LessonId",
                table: "Audios",
                column: "LessonId");

            migrationBuilder.CreateIndex(
                name: "IX_Lessons_UserId",
                table: "Lessons",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_Audios_Lessons_LessonId",
                table: "Audios",
                column: "LessonId",
                principalTable: "Lessons",
                principalColumn: "LessonId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_RefreshTokens_Users_UserId",
                table: "RefreshTokens",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "UserId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
