using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntelliView.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class altering_VideoAiScore : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VideoAiScore_MockVideoAnswers_InterviewQuestionAnswerId",
                table: "VideoAiScore");

            migrationBuilder.DropColumn(
                name: "AudioInfo",
                table: "VideoAiScore");

            migrationBuilder.DropColumn(
                name: "TextInfo",
                table: "VideoAiScore");

            migrationBuilder.DropColumn(
                name: "VideoInfo",
                table: "VideoAiScore");

            migrationBuilder.RenameColumn(
                name: "InterviewQuestionAnswerId",
                table: "VideoAiScore",
                newName: "MockVideoAnswerId");

            migrationBuilder.AlterColumn<decimal>(
                name: "AnswerSimilarityScore",
                table: "VideoAiScore",
                type: "decimal(18,2)",
                nullable: true,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)");

            migrationBuilder.AddColumn<decimal>(
                name: "ComparisonScore",
                table: "VideoAiScore",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "QuestionText",
                table: "VideoAiScore",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<decimal>(
                name: "SentimentScore",
                table: "VideoAiScore",
                type: "decimal(18,2)",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "EmotionScore",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Timestamp = table.Column<DateTime>(type: "datetime2", nullable: false),
                    SerializedScores = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    VideoAiScoreMockVideoAnswerId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_EmotionScore", x => x.Id);
                    table.ForeignKey(
                        name: "FK_EmotionScore_VideoAiScore_VideoAiScoreMockVideoAnswerId",
                        column: x => x.VideoAiScoreMockVideoAnswerId,
                        principalTable: "VideoAiScore",
                        principalColumn: "MockVideoAnswerId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_EmotionScore_VideoAiScoreMockVideoAnswerId",
                table: "EmotionScore",
                column: "VideoAiScoreMockVideoAnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_VideoAiScore_MockVideoAnswers_MockVideoAnswerId",
                table: "VideoAiScore",
                column: "MockVideoAnswerId",
                principalTable: "MockVideoAnswers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_VideoAiScore_MockVideoAnswers_MockVideoAnswerId",
                table: "VideoAiScore");

            migrationBuilder.DropTable(
                name: "EmotionScore");

            migrationBuilder.DropColumn(
                name: "ComparisonScore",
                table: "VideoAiScore");

            migrationBuilder.DropColumn(
                name: "QuestionText",
                table: "VideoAiScore");

            migrationBuilder.DropColumn(
                name: "SentimentScore",
                table: "VideoAiScore");

            migrationBuilder.RenameColumn(
                name: "MockVideoAnswerId",
                table: "VideoAiScore",
                newName: "InterviewQuestionAnswerId");

            migrationBuilder.AlterColumn<decimal>(
                name: "AnswerSimilarityScore",
                table: "VideoAiScore",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,2)",
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AudioInfo",
                table: "VideoAiScore",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TextInfo",
                table: "VideoAiScore",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "VideoInfo",
                table: "VideoAiScore",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_VideoAiScore_MockVideoAnswers_InterviewQuestionAnswerId",
                table: "VideoAiScore",
                column: "InterviewQuestionAnswerId",
                principalTable: "MockVideoAnswers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
