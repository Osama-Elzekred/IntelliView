using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace IntelliView.DataAccess.Migrations
{
    /// <inheritdoc />
    public partial class AddJopToDB : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "InterviewApplication");

            migrationBuilder.DropTable(
                name: "InterviewQuestion");

            migrationBuilder.DropTable(
                name: "InterviewSession");

            migrationBuilder.CreateTable(
                name: "jops",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    JobType = table.Column<int>(type: "int", nullable: true),
                    JobTime = table.Column<int>(type: "int", nullable: true),
                    Location = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    MinimumExperience = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Requirements = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Responsibilities = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Benefits = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Salary = table.Column<double>(type: "float", nullable: true),
                    IsActive = table.Column<bool>(type: "bit", nullable: false),
                    IsDeleted = table.Column<bool>(type: "bit", nullable: false),
                    CompanyUserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_jops", x => x.Id);
                    table.ForeignKey(
                        name: "FK_jops_AspNetUsers_CompanyUserId",
                        column: x => x.CompanyUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_jops_CompanyUserId",
                table: "jops",
                column: "CompanyUserId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "jops");

            migrationBuilder.CreateTable(
                name: "InterviewSession",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CompanyUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Date = table.Column<DateOnly>(type: "date", nullable: false),
                    Position = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Topic = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterviewSession", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InterviewSession_AspNetUsers_CompanyUserId",
                        column: x => x.CompanyUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "InterviewApplication",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InterviewSessionId = table.Column<int>(type: "int", nullable: false),
                    CompanyUserId = table.Column<string>(type: "nvarchar(450)", nullable: true),
                    Feedback = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterviewApplication", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InterviewApplication_AspNetUsers_CompanyUserId",
                        column: x => x.CompanyUserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_InterviewApplication_InterviewSession_InterviewSessionId",
                        column: x => x.InterviewSessionId,
                        principalTable: "InterviewSession",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "InterviewQuestion",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    InterviewSessionId = table.Column<int>(type: "int", nullable: false),
                    IsAnswerValid = table.Column<int>(type: "int", nullable: false),
                    ModelAnswer = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Question = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UserAnswer = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_InterviewQuestion", x => x.Id);
                    table.ForeignKey(
                        name: "FK_InterviewQuestion_InterviewSession_InterviewSessionId",
                        column: x => x.InterviewSessionId,
                        principalTable: "InterviewSession",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_InterviewApplication_CompanyUserId",
                table: "InterviewApplication",
                column: "CompanyUserId");

            migrationBuilder.CreateIndex(
                name: "IX_InterviewApplication_InterviewSessionId",
                table: "InterviewApplication",
                column: "InterviewSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_InterviewQuestion_InterviewSessionId",
                table: "InterviewQuestion",
                column: "InterviewSessionId");

            migrationBuilder.CreateIndex(
                name: "IX_InterviewSession_CompanyUserId",
                table: "InterviewSession",
                column: "CompanyUserId");
        }
    }
}
