using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Persistence.Portal.Migrations
{
    public partial class Init : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AdapterEvents",
                columns: table => new
                {
                    ID = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    AdapterId = table.Column<string>(type: "TEXT", nullable: false),
                    State = table.Column<int>(type: "INTEGER", nullable: false),
                    TimeStamp = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AdapterEvents", x => x.ID);
                });

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
                    Location3 = table.Column<string>(type: "TEXT", nullable: true),
                    DefaultAdapterId = table.Column<string>(type: "TEXT", nullable: true)
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
                name: "ServerEvents",
                columns: table => new
                {
                    ID = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    ServerUid = table.Column<string>(type: "TEXT", nullable: false),
                    Discriminator = table.Column<string>(type: "TEXT", nullable: false),
                    ServerClientConnectedEvent_ClientId = table.Column<string>(type: "TEXT", nullable: true),
                    ClientId = table.Column<string>(type: "TEXT", nullable: true),
                    IsMatch = table.Column<bool>(type: "INTEGER", nullable: true),
                    OfflineJson = table.Column<string>(type: "TEXT", nullable: true),
                    OnlineJson = table.Column<string>(type: "TEXT", nullable: true),
                    State = table.Column<string>(type: "TEXT", nullable: true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    TimeStamp = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ServerEvents", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "SystemEvents",
                columns: table => new
                {
                    ID = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Json = table.Column<string>(type: "TEXT", nullable: true),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Description = table.Column<string>(type: "TEXT", nullable: true),
                    Type = table.Column<int>(type: "INTEGER", nullable: false),
                    TimeStamp = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SystemEvents", x => x.ID);
                });

            migrationBuilder.CreateTable(
                name: "WebHooks",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Uid = table.Column<string>(type: "TEXT", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    WebHookUrl = table.Column<string>(type: "TEXT", nullable: false),
                    ServerUid = table.Column<string>(type: "TEXT", nullable: true),
                    Secret = table.Column<string>(type: "TEXT", nullable: true),
                    ContentType = table.Column<string>(type: "TEXT", nullable: true),
                    IsActive = table.Column<bool>(type: "INTEGER", nullable: false),
                    EventGroup = table.Column<string>(type: "TEXT", nullable: true),
                    LastTrigger = table.Column<DateTime>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WebHooks", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "MqttServerCfg",
                columns: table => new
                {
                    ServerUID = table.Column<string>(type: "TEXT", nullable: false),
                    CommunicationTimeout = table.Column<TimeSpan>(type: "TEXT", nullable: false),
                    PresistentSession = table.Column<bool>(type: "INTEGER", nullable: false),
                    MaxPendingMessagesPerClient = table.Column<int>(type: "INTEGER", nullable: false)
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
                name: "WebHookHeader",
                columns: table => new
                {
                    ID = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    WebHookID = table.Column<long>(type: "INTEGER", nullable: false),
                    Name = table.Column<string>(type: "TEXT", nullable: false),
                    Value = table.Column<string>(type: "TEXT", nullable: false),
                    CreatedTimestamp = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WebHookHeader", x => x.ID);
                    table.ForeignKey(
                        name: "FK_WebHookHeader_WebHooks_WebHookID",
                        column: x => x.WebHookID,
                        principalTable: "WebHooks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "WebHooksHistory",
                columns: table => new
                {
                    Id = table.Column<long>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    WebHookID = table.Column<long>(type: "INTEGER", nullable: false),
                    HookEventGroup = table.Column<int>(type: "INTEGER", nullable: false),
                    Guid = table.Column<string>(type: "TEXT", nullable: false),
                    Result = table.Column<int>(type: "INTEGER", nullable: false),
                    StatusCode = table.Column<int>(type: "INTEGER", nullable: false),
                    ResponseBody = table.Column<string>(type: "TEXT", nullable: true),
                    ResponseContentType = table.Column<string>(type: "TEXT", nullable: true),
                    isJsonResponse = table.Column<bool>(type: "INTEGER", nullable: true),
                    isTextHtmlResponse = table.Column<bool>(type: "INTEGER", nullable: true),
                    RequestBody = table.Column<string>(type: "TEXT", nullable: false),
                    RequestHeaders = table.Column<string>(type: "TEXT", nullable: false),
                    Exception = table.Column<string>(type: "TEXT", nullable: true),
                    Timestamp = table.Column<DateTime>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_WebHooksHistory", x => x.Id);
                    table.ForeignKey(
                        name: "FK_WebHooksHistory_WebHooks_WebHookID",
                        column: x => x.WebHookID,
                        principalTable: "WebHooks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "Endpoints",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Port = table.Column<int>(type: "INTEGER", nullable: false),
                    IpAddress = table.Column<string>(type: "TEXT", nullable: false),
                    ServerBaseID = table.Column<long>(type: "INTEGER", nullable: true),
                    ServerBaseUID = table.Column<string>(type: "TEXT", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Endpoints", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Endpoints_Servers_ServerBaseID_ServerBaseUID",
                        columns: x => new { x.ServerBaseID, x.ServerBaseUID },
                        principalTable: "Servers",
                        principalColumns: new[] { "ID", "UID" },
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "MqttServer",
                columns: table => new
                {
                    ID = table.Column<long>(type: "INTEGER", nullable: false),
                    UID = table.Column<string>(type: "TEXT", nullable: false)
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
                columns: new[] { "Id", "DefaultAdapterId", "Description", "Guid", "Location1", "Location2", "Location3", "Name" },
                values: new object[] { 1, null, null, "90e045b7-eb8f-4f8e-bcea-6eb2b640a5e3", null, null, null, "Undefined" });

            migrationBuilder.CreateIndex(
                name: "IX_AdapterEvents_AdapterId",
                table: "AdapterEvents",
                column: "AdapterId");

            migrationBuilder.CreateIndex(
                name: "IX_Endpoints_IpAddress",
                table: "Endpoints",
                column: "IpAddress");

            migrationBuilder.CreateIndex(
                name: "IX_Endpoints_Port",
                table: "Endpoints",
                column: "Port");

            migrationBuilder.CreateIndex(
                name: "IX_Endpoints_ServerBaseID_ServerBaseUID",
                table: "Endpoints",
                columns: new[] { "ServerBaseID", "ServerBaseUID" });

            migrationBuilder.CreateIndex(
                name: "IX_ServerEvents_ServerUid",
                table: "ServerEvents",
                column: "ServerUid");

            migrationBuilder.CreateIndex(
                name: "IX_Servers_CfgServerUID",
                table: "Servers",
                column: "CfgServerUID",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_WebHookHeader_WebHookID",
                table: "WebHookHeader",
                column: "WebHookID");

            migrationBuilder.CreateIndex(
                name: "IX_WebHooks_Uid",
                table: "WebHooks",
                column: "Uid");

            migrationBuilder.CreateIndex(
                name: "IX_WebHooksHistory_WebHookID",
                table: "WebHooksHistory",
                column: "WebHookID");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AdapterEvents");

            migrationBuilder.DropTable(
                name: "Edge");

            migrationBuilder.DropTable(
                name: "Endpoints");

            migrationBuilder.DropTable(
                name: "MqttServer");

            migrationBuilder.DropTable(
                name: "MqttServerCfg");

            migrationBuilder.DropTable(
                name: "OpcServer");

            migrationBuilder.DropTable(
                name: "OpcServerCfg");

            migrationBuilder.DropTable(
                name: "ServerEvents");

            migrationBuilder.DropTable(
                name: "SystemEvents");

            migrationBuilder.DropTable(
                name: "WebHookHeader");

            migrationBuilder.DropTable(
                name: "WebHooksHistory");

            migrationBuilder.DropTable(
                name: "Servers");

            migrationBuilder.DropTable(
                name: "WebHooks");

            migrationBuilder.DropTable(
                name: "ServerCfg");
        }
    }
}
