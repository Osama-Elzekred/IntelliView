using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntelliView.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class fix_userjobAnswerDublication : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserJobAnswer_QuestionId",
                table: "UserJobAnswer");

            migrationBuilder.CreateIndex(
                name: "IX_UserJobAnswer_QuestionId",
                table: "UserJobAnswer",
                column: "QuestionId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_UserJobAnswer_QuestionId",
                table: "UserJobAnswer");

            migrationBuilder.CreateIndex(
                name: "IX_UserJobAnswer_QuestionId",
                table: "UserJobAnswer",
                column: "QuestionId",
                unique: true);
        }
    }
}
