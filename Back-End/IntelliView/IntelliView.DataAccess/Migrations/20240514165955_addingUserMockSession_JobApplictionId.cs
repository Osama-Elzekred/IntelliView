using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntelliView.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addingUserMockSession_JobApplictionId : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_JobApplication_MockSessionId",
                table: "JobApplication");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "UserMockSessions",
                type: "nvarchar(450)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)");

            migrationBuilder.AddColumn<int>(
                name: "JobApplicationId",
                table: "UserMockSessions",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "JobId",
                table: "UserMockSessions",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_UserMockSessions_JobId_UserId",
                table: "UserMockSessions",
                columns: new[] { "JobId", "UserId" });

            migrationBuilder.CreateIndex(
                name: "IX_JobApplication_MockSessionId",
                table: "JobApplication",
                column: "MockSessionId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserMockSessions_JobApplication_JobId_UserId",
                table: "UserMockSessions",
                columns: new[] { "JobId", "UserId" },
                principalTable: "JobApplication",
                principalColumns: new[] { "JobId", "UserId" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserMockSessions_JobApplication_JobId_UserId",
                table: "UserMockSessions");

            migrationBuilder.DropIndex(
                name: "IX_UserMockSessions_JobId_UserId",
                table: "UserMockSessions");

            migrationBuilder.DropIndex(
                name: "IX_JobApplication_MockSessionId",
                table: "JobApplication");

            migrationBuilder.DropColumn(
                name: "JobApplicationId",
                table: "UserMockSessions");

            migrationBuilder.DropColumn(
                name: "JobId",
                table: "UserMockSessions");

            migrationBuilder.AlterColumn<string>(
                name: "UserId",
                table: "UserMockSessions",
                type: "nvarchar(max)",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.CreateIndex(
                name: "IX_JobApplication_MockSessionId",
                table: "JobApplication",
                column: "MockSessionId",
                unique: true,
                filter: "[MockSessionId] IS NOT NULL");
        }
    }
}
