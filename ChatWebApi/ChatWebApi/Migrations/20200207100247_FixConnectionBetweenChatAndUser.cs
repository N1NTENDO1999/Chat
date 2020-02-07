using Microsoft.EntityFrameworkCore.Migrations;

namespace ChatWebApi.Migrations
{
    public partial class FixConnectionBetweenChatAndUser : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserChat_Users_ChatId",
                table: "UserChat");

            migrationBuilder.AddForeignKey(
                name: "FK_UserChat_Users_UserId",
                table: "UserChat",
                column: "UserId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserChat_Users_UserId",
                table: "UserChat");

            migrationBuilder.AddForeignKey(
                name: "FK_UserChat_Users_ChatId",
                table: "UserChat",
                column: "ChatId",
                principalTable: "Users",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
