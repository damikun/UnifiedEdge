using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Migrations
{
    public partial class Init : Migration
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

            migrationBuilder.CreateTable(
                name: "Servers",
                columns: table => new
                {
                    ID = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Guid = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    IsEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    Location = table.Column<string>(type: "TEXT", nullable: true),
                    Created = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Updated = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Servers", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "MqttServer",
                columns: table => new
                {
                    ID = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Port = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MqttServer", x => x.ID);
                    table.ForeignKey(
                        name: "FK_MqttServer_Servers_ID",
                        column: x => x.ID,
                        principalTable: "Servers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OpcServer",
                columns: table => new
                {
                    ID = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpcServer", x => x.ID);
                    table.ForeignKey(
                        name: "FK_OpcServer_Servers_ID",
                        column: x => x.ID,
                        principalTable: "Servers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ServerData",
                columns: table => new
                {
                    ServerID = table.Column<long>(type: "INTEGER", nullable: false),
                    LastStarted = table.Column<DateTime>(type: "TEXT", nullable: false),
                    LastStopped = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServerData", x => x.ServerID);
                    table.ForeignKey(
                        name: "FK_ServerData_Servers_ServerID",
                        column: x => x.ServerID,
                        principalTable: "Servers",
                        principalColumn: "ID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MqttServerData",
                columns: table => new
                {
                    ServerID = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MqttServerData", x => x.ServerID);
                    table.ForeignKey(
                        name: "FK_MqttServerData_ServerData_ServerID",
                        column: x => x.ServerID,
                        principalTable: "ServerData",
                        principalColumn: "ServerID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OpcServerData",
                columns: table => new
                {
                    ServerID = table.Column<long>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpcServerData", x => x.ServerID);
                    table.ForeignKey(
                        name: "FK_OpcServerData_ServerData_ServerID",
                        column: x => x.ServerID,
                        principalTable: "ServerData",
                        principalColumn: "ServerID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Edge",
                columns: new[] { "Id", "Description", "Guid", "Location1", "Location2", "Location3", "Name" },
                values: new object[] { 1, null, "e62d200a-869f-47fc-a38d-31355247342b", null, null, null, "Undefined" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Edge");

            migrationBuilder.DropTable(
                name: "MqttServer");

            migrationBuilder.DropTable(
                name: "MqttServerData");

            migrationBuilder.DropTable(
                name: "OpcServer");

            migrationBuilder.DropTable(
                name: "OpcServerData");

            migrationBuilder.DropTable(
                name: "ServerData");

            migrationBuilder.DropTable(
                name: "Servers");
        }
    }
}
