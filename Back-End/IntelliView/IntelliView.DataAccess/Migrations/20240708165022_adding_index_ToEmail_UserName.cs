using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntelliView.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class adding_index_ToEmail_UserName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Users_Email",
                table: "AspNetUsers",
                column: "Email",
                unique: true,
                filter: "[Email] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Users_Username",
                table: "AspNetUsers",
                column: "UserName",
                unique: true,
                filter: "[UserName] IS NOT NULL");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Users_Email",
                table: "AspNetUsers");

            migrationBuilder.DropIndex(
                name: "IX_Users_Username",
                table: "AspNetUsers");
        }
    }
}
