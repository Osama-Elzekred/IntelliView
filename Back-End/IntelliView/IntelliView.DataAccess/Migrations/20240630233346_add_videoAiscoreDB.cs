using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntelliView.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class add_videoAiscoreDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmotionScore_VideoAiScore_VideoAiScoreMockVideoAnswerId",
                table: "EmotionScore");

            migrationBuilder.DropForeignKey(
                name: "FK_VideoAiScore_MockVideoAnswers_MockVideoAnswerId",
                table: "VideoAiScore");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VideoAiScore",
                table: "VideoAiScore");

            migrationBuilder.RenameTable(
                name: "VideoAiScore",
                newName: "VideoAiScores");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VideoAiScores",
                table: "VideoAiScores",
                column: "MockVideoAnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmotionScore_VideoAiScores_VideoAiScoreMockVideoAnswerId",
                table: "EmotionScore",
                column: "VideoAiScoreMockVideoAnswerId",
                principalTable: "VideoAiScores",
                principalColumn: "MockVideoAnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_VideoAiScores_MockVideoAnswers_MockVideoAnswerId",
                table: "VideoAiScores",
                column: "MockVideoAnswerId",
                principalTable: "MockVideoAnswers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_EmotionScore_VideoAiScores_VideoAiScoreMockVideoAnswerId",
                table: "EmotionScore");

            migrationBuilder.DropForeignKey(
                name: "FK_VideoAiScores_MockVideoAnswers_MockVideoAnswerId",
                table: "VideoAiScores");

            migrationBuilder.DropPrimaryKey(
                name: "PK_VideoAiScores",
                table: "VideoAiScores");

            migrationBuilder.RenameTable(
                name: "VideoAiScores",
                newName: "VideoAiScore");

            migrationBuilder.AddPrimaryKey(
                name: "PK_VideoAiScore",
                table: "VideoAiScore",
                column: "MockVideoAnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_EmotionScore_VideoAiScore_VideoAiScoreMockVideoAnswerId",
                table: "EmotionScore",
                column: "VideoAiScoreMockVideoAnswerId",
                principalTable: "VideoAiScore",
                principalColumn: "MockVideoAnswerId");

            migrationBuilder.AddForeignKey(
                name: "FK_VideoAiScore_MockVideoAnswers_MockVideoAnswerId",
                table: "VideoAiScore",
                column: "MockVideoAnswerId",
                principalTable: "MockVideoAnswers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
