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
                name: "ServerCfg",
                columns: table => new
                {
                    ServerUID = table.Column<string>(type: "TEXT", nullable: false),
                    IsEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    TimeStamp = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServerCfg", x => x.ServerUID);
                });

            migrationBuilder.CreateTable(
                name: "MqttServerCfg",
                columns: table => new
                {
                    ServerUID = table.Column<string>(type: "TEXT", nullable: false),
                    port = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MqttServerCfg", x => x.ServerUID);
                    table.ForeignKey(
                        name: "FK_MqttServerCfg_ServerCfg_ServerUID",
                        column: x => x.ServerUID,
                        principalTable: "ServerCfg",
                        principalColumn: "ServerUID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OpcServerCfg",
                columns: table => new
                {
                    ServerUID = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpcServerCfg", x => x.ServerUID);
                    table.ForeignKey(
                        name: "FK_OpcServerCfg_ServerCfg_ServerUID",
                        column: x => x.ServerUID,
                        principalTable: "ServerCfg",
                        principalColumn: "ServerUID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Servers",
                columns: table => new
                {
                    ID = table.Column<long>(type: "INTEGER", nullable: false),
                    UID = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    IsEnabled = table.Column<bool>(type: "INTEGER", nullable: false),
                    Location = table.Column<string>(type: "TEXT", nullable: true),
                    Created = table.Column<DateTime>(type: "TEXT", nullable: false),
                    Updated = table.Column<DateTime>(type: "TEXT", nullable: false),
                    CfgServerUID = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Servers", x => new { x.ID, x.UID });
                    table.ForeignKey(
                        name: "FK_Servers_ServerCfg_CfgServerUID",
                        column: x => x.CfgServerUID,
                        principalTable: "ServerCfg",
                        principalColumn: "ServerUID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MqttServer",
                columns: table => new
                {
                    ID = table.Column<long>(type: "INTEGER", nullable: false),
                    UID = table.Column<string>(type: "TEXT", nullable: false),
                    Port = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_MqttServer", x => new { x.ID, x.UID });
                    table.ForeignKey(
                        name: "FK_MqttServer_Servers_ID_UID",
                        columns: x => new { x.ID, x.UID },
                        principalTable: "Servers",
                        principalColumns: new[] { "ID", "UID" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "OpcServer",
                columns: table => new
                {
                    ID = table.Column<long>(type: "INTEGER", nullable: false),
                    UID = table.Column<string>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_OpcServer", x => new { x.ID, x.UID });
                    table.ForeignKey(
                        name: "FK_OpcServer_Servers_ID_UID",
                        columns: x => new { x.ID, x.UID },
                        principalTable: "Servers",
                        principalColumns: new[] { "ID", "UID" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Edge",
                columns: new[] { "Id", "Description", "Guid", "Location1", "Location2", "Location3", "Name" },
                values: new object[] { 1, null, "39b04b8e-312f-4c0a-95e6-a56885540940", null, null, null, "Undefined" });

            migrationBuilder.CreateIndex(
                name: "IX_Servers_CfgServerUID",
                table: "Servers",
                column: "CfgServerUID",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Edge");

            migrationBuilder.DropTable(
                name: "MqttServer");

            migrationBuilder.DropTable(
                name: "MqttServerCfg");

            migrationBuilder.DropTable(
                name: "OpcServer");

            migrationBuilder.DropTable(
                name: "OpcServerCfg");

            migrationBuilder.DropTable(
                name: "Servers");

            migrationBuilder.DropTable(
                name: "ServerCfg");
        }
    }
}
