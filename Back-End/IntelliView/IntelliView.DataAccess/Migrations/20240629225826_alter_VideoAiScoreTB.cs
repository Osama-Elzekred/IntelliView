using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntelliView.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class alter_VideoAiScoreTB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ComparisonScore",
                table: "VideoAiScore");

            migrationBuilder.DropColumn(
                name: "Timestamp",
                table: "EmotionScore");

            migrationBuilder.AlterColumn<decimal>(
                name: "SentimentScore",
                table: "VideoAiScore",
                type: "decimal(8,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "AnswerSimilarityScore",
                table: "VideoAiScore",
                type: "decimal(8,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "RecommendationText",
                table: "VideoAiScore",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "Time",
                table: "EmotionScore",
                type: "decimal(8,2)",
                nullable: false,
                defaultValue: 0m);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "RecommendationText",
                table: "VideoAiScore");

            migrationBuilder.DropColumn(
                name: "Time",
                table: "EmotionScore");

            migrationBuilder.AlterColumn<decimal>(
                name: "SentimentScore",
                table: "VideoAiScore",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(8,2)",
                oldNullable: true);

            migrationBuilder.AlterColumn<decimal>(
                name: "AnswerSimilarityScore",
                table: "VideoAiScore",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(8,2)",
                oldNullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "ComparisonScore",
                table: "VideoAiScore",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "Timestamp",
                table: "EmotionScore",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }
    }
}
