using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntelliView.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddImageURlColumn : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_InterviewMocks_MockId",
                table: "Jobs");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_MockId",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "Score",
                table: "JobApplication");

            migrationBuilder.AddColumn<string>(
                name: "ImageURl",
                table: "Jobs",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<decimal>(
                name: "CVScore",
                table: "JobApplication",
                type: "decimal(18,2)",
                nullable: false,
                defaultValue: 0m);

            migrationBuilder.CreateTable(
                name: "InterviewQuestionAnswer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserApplicationId = table.Column<int>(type: "int", nullable: false),
                    JobId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    InterviewQuestionId = table.Column<int>(type: "int", nullable: false),
                    AnswerVideoURL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AnswerText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AnswerSimilarityScore = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AnsweredAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterviewQuestionAnswer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InterviewQuestionAnswer_InterviewQuestions_InterviewQuestionId",
                        column: x => x.InterviewQuestionId,
                        principalTable: "InterviewQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_InterviewQuestionAnswer_JobApplication_JobId_UserId",
                        columns: x => new { x.JobId, x.UserId },
                        principalTable: "JobApplication",
                        principalColumns: new[] { "JobId", "UserId" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_MockId",
                table: "Jobs",
                column: "MockId");

            migrationBuilder.CreateIndex(
                name: "IX_InterviewQuestionAnswer_InterviewQuestionId",
                table: "InterviewQuestionAnswer",
                column: "InterviewQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_InterviewQuestionAnswer_JobId_UserId",
                table: "InterviewQuestionAnswer",
                columns: new[] { "JobId", "UserId" });

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_InterviewMocks_MockId",
                table: "Jobs",
                column: "MockId",
                principalTable: "InterviewMocks",
                principalColumn: "Id",
                onDelete: ReferentialAction.SetNull);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Jobs_InterviewMocks_MockId",
                table: "Jobs");

            migrationBuilder.DropTable(
                name: "InterviewQuestionAnswer");

            migrationBuilder.DropIndex(
                name: "IX_Jobs_MockId",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "ImageURl",
                table: "Jobs");

            migrationBuilder.DropColumn(
                name: "CVScore",
                table: "JobApplication");

            migrationBuilder.AddColumn<int>(
                name: "Score",
                table: "JobApplication",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Jobs_MockId",
                table: "Jobs",
                column: "MockId",
                unique: true,
                filter: "[MockId] IS NOT NULL");

            migrationBuilder.AddForeignKey(
                name: "FK_Jobs_InterviewMocks_MockId",
                table: "Jobs",
                column: "MockId",
                principalTable: "InterviewMocks",
                principalColumn: "Id");
        }
    }
}
