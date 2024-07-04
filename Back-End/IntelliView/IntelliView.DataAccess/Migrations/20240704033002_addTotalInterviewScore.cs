using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntelliView.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class addTotalInterviewScore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<double>(
                name: "TotalInterviewScore",
                table: "UserMockSessions",
                type: "float",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TotalInterviewScore",
                table: "UserMockSessions");
        }
    }
}
