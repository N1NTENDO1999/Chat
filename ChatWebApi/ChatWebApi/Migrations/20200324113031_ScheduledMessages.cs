using Microsoft.EntityFrameworkCore.Migrations;

namespace ChatWebApi.Migrations
{
    public partial class ScheduledMessages : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScheduledMessages_Chats_ChatId",
                table: "ScheduledMessages");

            migrationBuilder.RenameColumn(
                name: "ChatId",
                table: "ScheduledMessages",
                newName: "ReceiverId");

            migrationBuilder.RenameIndex(
                name: "IX_ScheduledMessages_ChatId",
                table: "ScheduledMessages",
                newName: "IX_ScheduledMessages_ReceiverId");

            migrationBuilder.AddColumn<bool>(
                name: "IsPersonal",
                table: "ScheduledMessages",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduledMessages_Chats_ReceiverId",
                table: "ScheduledMessages",
                column: "ReceiverId",
                principalTable: "Chats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ScheduledMessages_Chats_ReceiverId",
                table: "ScheduledMessages");

            migrationBuilder.DropColumn(
                name: "IsPersonal",
                table: "ScheduledMessages");

            migrationBuilder.RenameColumn(
                name: "ReceiverId",
                table: "ScheduledMessages",
                newName: "ChatId");

            migrationBuilder.RenameIndex(
                name: "IX_ScheduledMessages_ReceiverId",
                table: "ScheduledMessages",
                newName: "IX_ScheduledMessages_ChatId");

            migrationBuilder.AddForeignKey(
                name: "FK_ScheduledMessages_Chats_ChatId",
                table: "ScheduledMessages",
                column: "ChatId",
                principalTable: "Chats",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
