using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntelliView.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class alter_datatypeToDouble : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<double>(
                name: "SentimentScore",
                table: "VideoAiScores",
                type: "float",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(8,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<double>(
                name: "AnswerSimilarityScore",
                table: "VideoAiScores",
                type: "float",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(8,2)",
                oldNullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "SentimentScore",
                table: "VideoAiScores",
                type: "decimal(8,2)",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "AnswerSimilarityScore",
                table: "VideoAiScores",
                type: "decimal(8,2)",
                nullable: true,
                oldClrType: typeof(double),
                oldType: "float",
                oldNullable: true);
        }
    }
}
