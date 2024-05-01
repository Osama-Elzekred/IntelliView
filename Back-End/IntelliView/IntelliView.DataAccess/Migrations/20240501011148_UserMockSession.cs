using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntelliView.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class UserMockSession : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InterviewQuestionAnswer");

            migrationBuilder.CreateTable(
                name: "UserMockSessions",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MockId = table.Column<int>(type: "int", nullable: false),
                    JobId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserMockSessions", x => new { x.UserId, x.MockId });
                    table.ForeignKey(
                        name: "FK_UserMockSessions_InterviewMocks_MockId",
                        column: x => x.MockId,
                        principalTable: "InterviewMocks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserMockSessions_JobApplication_JobId_UserId",
                        columns: x => new { x.JobId, x.UserId },
                        principalTable: "JobApplication",
                        principalColumns: new[] { "JobId", "UserId" });
                });

            migrationBuilder.CreateTable(
                name: "MockVideoAnswer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    MockId = table.Column<int>(type: "int", nullable: false),
                    InterviewQuestionId = table.Column<int>(type: "int", nullable: false),
                    AnswerVideoURL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AnswerText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AnsweredAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MockVideoAnswer", x => x.Id);
                    table.ForeignKey(
                        name: "FK_MockVideoAnswer_InterviewQuestions_InterviewQuestionId",
                        column: x => x.InterviewQuestionId,
                        principalTable: "InterviewQuestions",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_MockVideoAnswer_UserMockSessions_UserId_MockId",
                        columns: x => new { x.UserId, x.MockId },
                        principalTable: "UserMockSessions",
                        principalColumns: new[] { "UserId", "MockId" },
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateTable(
                name: "VideoAiScore",
                columns: table => new
                {
                    InterviewQuestionAnswerId = table.Column<int>(type: "int", nullable: false),
                    AnswerSimilarityScore = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    VideoInfo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AudioInfo = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TextInfo = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_VideoAiScore", x => x.InterviewQuestionAnswerId);
                    table.ForeignKey(
                        name: "FK_VideoAiScore_MockVideoAnswer_InterviewQuestionAnswerId",
                        column: x => x.InterviewQuestionAnswerId,
                        principalTable: "MockVideoAnswer",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_MockVideoAnswer_InterviewQuestionId",
                table: "MockVideoAnswer",
                column: "InterviewQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_MockVideoAnswer_UserId_MockId",
                table: "MockVideoAnswer",
                columns: new[] { "UserId", "MockId" });

            migrationBuilder.CreateIndex(
                name: "IX_UserMockSessions_JobId_UserId",
                table: "UserMockSessions",
                columns: new[] { "JobId", "UserId" },
                unique: true,
                filter: "[JobId] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_UserMockSessions_MockId",
                table: "UserMockSessions",
                column: "MockId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "VideoAiScore");

            migrationBuilder.DropTable(
                name: "MockVideoAnswer");

            migrationBuilder.DropTable(
                name: "UserMockSessions");

            migrationBuilder.CreateTable(
                name: "InterviewQuestionAnswer",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InterviewQuestionId = table.Column<int>(type: "int", nullable: false),
                    JobId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    AnswerSimilarityScore = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    AnswerText = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AnswerVideoURL = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    AnsweredAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UserApplicationId = table.Column<int>(type: "int", nullable: false)
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
                name: "IX_InterviewQuestionAnswer_InterviewQuestionId",
                table: "InterviewQuestionAnswer",
                column: "InterviewQuestionId");

            migrationBuilder.CreateIndex(
                name: "IX_InterviewQuestionAnswer_JobId_UserId",
                table: "InterviewQuestionAnswer",
                columns: new[] { "JobId", "UserId" });
        }
    }
}
