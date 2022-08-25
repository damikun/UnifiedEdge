using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class Addmoretypes : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Edge",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Guid = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: true),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Location1 = table.Column<string>(type: "TEXT", nullable: true),
                    Location2 = table.Column<string>(type: "TEXT", nullable: true),
                    Location3 = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Edge", x => x.Id);
                });

            migrationBuilder.InsertData(
                table: "Edge",
                columns: new[] { "Id", "Description", "Guid", "Location1", "Location2", "Location3", "Name" },
                values: new object[] { 1, null, "b19c0fcb-f055-4547-9957-330d76353954", null, null, null, "Undefined" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Edge");
        }
    }
}
