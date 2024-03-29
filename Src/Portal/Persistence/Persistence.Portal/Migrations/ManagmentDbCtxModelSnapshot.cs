﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence.Portal;

#nullable disable

namespace Persistence.Portal.Migrations
{
    [DbContext(typeof(ManagmentDbCtx))]
    partial class ManagmentDbCtxModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.0");

            modelBuilder.Entity("Domain.Edge", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("ApiGraphql")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("ApiRest")
                        .HasColumnType("INTEGER");

                    b.Property<string>("DefaultAdapterId")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Guid")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Location1")
                        .HasColumnType("TEXT");

                    b.Property<string>("Location2")
                        .HasColumnType("TEXT");

                    b.Property<string>("Location3")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("Edge");

                    b.HasData(
                        new
                        {
                            Id = 1,
                            ApiGraphql = false,
                            ApiRest = false,
                            Guid = "eed20810-3109-4624-b625-0b187bad99dc",
                            Name = "Undefined"
                        });
                });

            modelBuilder.Entity("Domain.Note", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Content")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Created")
                        .HasColumnType("TEXT");

                    b.Property<string>("CreatedBy")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Updated")
                        .HasColumnType("TEXT");

                    b.Property<string>("Updatedby")
                        .HasColumnType("TEXT");

                    b.Property<bool>("isDraft")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("isHighlighted")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("isPrivate")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.ToTable("Notes");
                });

            modelBuilder.Entity("Domain.Server.AdapterEvent", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("AdapterId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("State")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("TimeStamp")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.HasIndex("AdapterId");

                    b.ToTable("AdapterEvents");
                });

            modelBuilder.Entity("Domain.Server.Events.ServerEventBase", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ServerUid")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("TimeStamp")
                        .HasColumnType("TEXT");

                    b.Property<int>("Type")
                        .HasColumnType("INTEGER");

                    b.HasKey("ID");

                    b.HasIndex("ServerUid");

                    b.ToTable("ServerEvents");

                    b.HasDiscriminator<string>("Discriminator").HasValue("ServerEventBase");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("Domain.Server.MqttAuthClient", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("DisplayName")
                        .HasColumnType("TEXT");

                    b.Property<bool>("Enabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("LastAuthenticate")
                        .HasColumnType("TEXT");

                    b.Property<long?>("ServerId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("System")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ServerId");

                    b.ToTable("MqttAuthClients");
                });

            modelBuilder.Entity("Domain.Server.MqttAuthConfig", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("ClientAuthEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<long>("ServerId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("UserAuthEnabled")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("ServerId")
                        .IsUnique();

                    b.ToTable("MqttAuthConfig");
                });

            modelBuilder.Entity("Domain.Server.MqttAuthLog", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<long?>("AuthClientId")
                        .HasColumnType("INTEGER");

                    b.Property<long?>("AuthUserId")
                        .HasColumnType("INTEGER");

                    b.Property<int>("Code")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("ErrorMessage")
                        .HasColumnType("TEXT");

                    b.Property<string>("JsonMetadata")
                        .HasColumnType("TEXT");

                    b.Property<long>("ServerId")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("TimeStamp")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ServerId");

                    b.ToTable("MqttAuthLogs");
                });

            modelBuilder.Entity("Domain.Server.MqttAuthRule", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("AuthAction")
                        .HasColumnType("INTEGER");

                    b.Property<int>("MqttAction")
                        .HasColumnType("INTEGER");

                    b.Property<long?>("MqttAuthClientId")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Topic")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("MqttAuthClientId");

                    b.ToTable("MqttAuthRules");
                });

            modelBuilder.Entity("Domain.Server.MqttAuthUser", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Enabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("LastAuthenticate")
                        .HasColumnType("TEXT");

                    b.Property<string>("Password")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<long?>("ServerId")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("System")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("ServerId");

                    b.ToTable("MqttAuthUsers");
                });

            modelBuilder.Entity("Domain.Server.MqttExplorerSub", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int?>("Alias")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Color")
                        .HasColumnType("TEXT");

                    b.Property<bool>("NoLocal")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ServerUid")
                        .HasColumnType("TEXT");

                    b.Property<string>("Topic")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserUid")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("MqttExplorerSubs");
                });

            modelBuilder.Entity("Domain.Server.MqttMessageTemplate", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<int>("ContentType")
                        .HasColumnType("INTEGER");

                    b.Property<int?>("ExpireInterval")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Name")
                        .HasColumnType("TEXT");

                    b.Property<string>("Payload")
                        .HasColumnType("TEXT");

                    b.Property<int>("QoS")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("Retain")
                        .HasColumnType("INTEGER");

                    b.Property<string>("ServerUid")
                        .HasColumnType("TEXT");

                    b.Property<string>("Topic")
                        .HasColumnType("TEXT");

                    b.Property<string>("UserUid")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.ToTable("MqttMessageTemplates");
                });

            modelBuilder.Entity("Domain.Server.ServerBase", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("CfgServerUID")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Created")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<bool>("EnableLogging")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("IsEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Location")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("UID")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Updated")
                        .HasColumnType("TEXT");

                    b.HasKey("ID");

                    b.HasIndex("CfgServerUID")
                        .IsUnique();

                    b.HasIndex("UID");

                    b.ToTable("Servers");

                    b.UseTptMappingStrategy();
                });

            modelBuilder.Entity("Domain.Server.ServerCfgBase", b =>
                {
                    b.Property<string>("ServerUID")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("TimeStamp")
                        .HasColumnType("TEXT");

                    b.HasKey("ServerUID");

                    b.ToTable("ServerCfg");

                    b.UseTptMappingStrategy();
                });

            modelBuilder.Entity("Domain.Server.ServerIPv4Endpoint", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("IpAddress")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("Port")
                        .HasColumnType("INTEGER");

                    b.Property<long?>("ServerBaseID")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("IpAddress");

                    b.HasIndex("Port");

                    b.HasIndex("ServerBaseID");

                    b.ToTable("Endpoints");
                });

            modelBuilder.Entity("Domain.Server.WebHook", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("ContentType")
                        .HasColumnType("TEXT");

                    b.Property<string>("EventGroup")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsActive")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime?>("LastTrigger")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Secret")
                        .HasColumnType("TEXT");

                    b.Property<string>("ServerUid")
                        .HasColumnType("TEXT");

                    b.Property<string>("Uid")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("WebHookUrl")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("Uid");

                    b.ToTable("WebHooks");
                });

            modelBuilder.Entity("Domain.Server.WebHookHeader", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("CreatedTimestamp")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("Value")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<long>("WebHookID")
                        .HasColumnType("INTEGER");

                    b.HasKey("ID");

                    b.HasIndex("WebHookID");

                    b.ToTable("WebHookHeader");
                });

            modelBuilder.Entity("Domain.Server.WebHookRecord", b =>
                {
                    b.Property<long>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Exception")
                        .HasColumnType("TEXT");

                    b.Property<string>("Guid")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<int>("HookEventGroup")
                        .HasColumnType("INTEGER");

                    b.Property<string>("RequestBody")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("RequestHeaders")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<string>("ResponseBody")
                        .HasColumnType("TEXT");

                    b.Property<string>("ResponseContentType")
                        .HasColumnType("TEXT");

                    b.Property<int>("Result")
                        .HasColumnType("INTEGER");

                    b.Property<int>("StatusCode")
                        .HasColumnType("INTEGER");

                    b.Property<DateTime>("Timestamp")
                        .HasColumnType("TEXT");

                    b.Property<long>("WebHookID")
                        .HasColumnType("INTEGER");

                    b.Property<bool?>("isJsonResponse")
                        .HasColumnType("INTEGER");

                    b.Property<bool?>("isTextHtmlResponse")
                        .HasColumnType("INTEGER");

                    b.HasKey("Id");

                    b.HasIndex("WebHookID");

                    b.ToTable("WebHooksHistory");
                });

            modelBuilder.Entity("Domain.System.Events.SystemEvent", b =>
                {
                    b.Property<long>("ID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<string>("Json")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("TimeStamp")
                        .HasColumnType("TEXT");

                    b.Property<int>("Type")
                        .HasColumnType("INTEGER");

                    b.HasKey("ID");

                    b.ToTable("SystemEvents");
                });

            modelBuilder.Entity("Domain.Server.Events.ServerClientConnectedEvent", b =>
                {
                    b.HasBaseType("Domain.Server.Events.ServerEventBase");

                    b.Property<string>("ClientUid")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.ToTable("ServerEvents", null, t =>
                        {
                            t.Property("ClientUid")
                                .HasColumnName("ServerClientConnectedEvent_ClientUid");
                        });

                    b.HasDiscriminator().HasValue("ServerClientConnectedEvent");
                });

            modelBuilder.Entity("Domain.Server.Events.ServerClientDisconnectedEvent", b =>
                {
                    b.HasBaseType("Domain.Server.Events.ServerEventBase");

                    b.Property<string>("ClientUid")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.ToTable("ServerEvents", (string)null);

                    b.HasDiscriminator().HasValue("ServerClientDisconnectedEvent");
                });

            modelBuilder.Entity("Domain.Server.Events.ServerConfigDiffEvent", b =>
                {
                    b.HasBaseType("Domain.Server.Events.ServerEventBase");

                    b.Property<bool>("IsMatch")
                        .HasColumnType("INTEGER");

                    b.Property<string>("OfflineJson")
                        .HasColumnType("TEXT");

                    b.Property<string>("OnlineJson")
                        .HasColumnType("TEXT");

                    b.ToTable("ServerEvents", (string)null);

                    b.HasDiscriminator().HasValue("ServerConfigDiffEvent");
                });

            modelBuilder.Entity("Domain.Server.Events.ServerStateChangedEvent", b =>
                {
                    b.HasBaseType("Domain.Server.Events.ServerEventBase");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.ToTable("ServerEvents", (string)null);

                    b.HasDiscriminator().HasValue("ServerStateChangedEvent");
                });

            modelBuilder.Entity("Domain.Server.MqttServer", b =>
                {
                    b.HasBaseType("Domain.Server.ServerBase");

                    b.ToTable("MqttServer", (string)null);
                });

            modelBuilder.Entity("Domain.Server.OpcServer", b =>
                {
                    b.HasBaseType("Domain.Server.ServerBase");

                    b.ToTable("OpcServer", (string)null);
                });

            modelBuilder.Entity("Domain.Server.MqttServerCfg", b =>
                {
                    b.HasBaseType("Domain.Server.ServerCfgBase");

                    b.Property<TimeSpan>("CommunicationTimeout")
                        .HasColumnType("TEXT");

                    b.Property<int>("MaxPendingMessagesPerClient")
                        .HasColumnType("INTEGER");

                    b.Property<bool>("PresistentSession")
                        .HasColumnType("INTEGER");

                    b.ToTable("MqttServerCfg", (string)null);
                });

            modelBuilder.Entity("Domain.Server.OpcServerCfg", b =>
                {
                    b.HasBaseType("Domain.Server.ServerCfgBase");

                    b.ToTable("OpcServerCfg", (string)null);
                });

            modelBuilder.Entity("Domain.Server.MqttAuthClient", b =>
                {
                    b.HasOne("Domain.Server.MqttServer", "Server")
                        .WithMany("AuthClients")
                        .HasForeignKey("ServerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Server");
                });

            modelBuilder.Entity("Domain.Server.MqttAuthConfig", b =>
                {
                    b.HasOne("Domain.Server.MqttServer", "Server")
                        .WithOne("AuthConfig")
                        .HasForeignKey("Domain.Server.MqttAuthConfig", "ServerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Server");
                });

            modelBuilder.Entity("Domain.Server.MqttAuthLog", b =>
                {
                    b.HasOne("Domain.Server.MqttServer", null)
                        .WithMany("AuthLogs")
                        .HasForeignKey("ServerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Server.MqttAuthRule", b =>
                {
                    b.HasOne("Domain.Server.MqttAuthClient", null)
                        .WithMany("Rules")
                        .HasForeignKey("MqttAuthClientId");
                });

            modelBuilder.Entity("Domain.Server.MqttAuthUser", b =>
                {
                    b.HasOne("Domain.Server.MqttServer", "Server")
                        .WithMany("AuthUsers")
                        .HasForeignKey("ServerId")
                        .OnDelete(DeleteBehavior.Cascade);

                    b.Navigation("Server");
                });

            modelBuilder.Entity("Domain.Server.ServerBase", b =>
                {
                    b.HasOne("Domain.Server.ServerCfgBase", "Cfg")
                        .WithOne("Server")
                        .HasForeignKey("Domain.Server.ServerBase", "CfgServerUID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Cfg");
                });

            modelBuilder.Entity("Domain.Server.ServerIPv4Endpoint", b =>
                {
                    b.HasOne("Domain.Server.ServerBase", null)
                        .WithMany("Endpoints")
                        .HasForeignKey("ServerBaseID")
                        .OnDelete(DeleteBehavior.Cascade);
                });

            modelBuilder.Entity("Domain.Server.WebHookHeader", b =>
                {
                    b.HasOne("Domain.Server.WebHook", "WebHook")
                        .WithMany("Headers")
                        .HasForeignKey("WebHookID")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired();

                    b.Navigation("WebHook");
                });

            modelBuilder.Entity("Domain.Server.WebHookRecord", b =>
                {
                    b.HasOne("Domain.Server.WebHook", "WebHook")
                        .WithMany("Records")
                        .HasForeignKey("WebHookID")
                        .OnDelete(DeleteBehavior.ClientCascade)
                        .IsRequired();

                    b.Navigation("WebHook");
                });

            modelBuilder.Entity("Domain.Server.MqttServer", b =>
                {
                    b.HasOne("Domain.Server.ServerBase", null)
                        .WithOne()
                        .HasForeignKey("Domain.Server.MqttServer", "ID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Server.OpcServer", b =>
                {
                    b.HasOne("Domain.Server.ServerBase", null)
                        .WithOne()
                        .HasForeignKey("Domain.Server.OpcServer", "ID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Server.MqttServerCfg", b =>
                {
                    b.HasOne("Domain.Server.ServerCfgBase", null)
                        .WithOne()
                        .HasForeignKey("Domain.Server.MqttServerCfg", "ServerUID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Server.OpcServerCfg", b =>
                {
                    b.HasOne("Domain.Server.ServerCfgBase", null)
                        .WithOne()
                        .HasForeignKey("Domain.Server.OpcServerCfg", "ServerUID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Server.MqttAuthClient", b =>
                {
                    b.Navigation("Rules");
                });

            modelBuilder.Entity("Domain.Server.ServerBase", b =>
                {
                    b.Navigation("Endpoints");
                });

            modelBuilder.Entity("Domain.Server.ServerCfgBase", b =>
                {
                    b.Navigation("Server")
                        .IsRequired();
                });

            modelBuilder.Entity("Domain.Server.WebHook", b =>
                {
                    b.Navigation("Headers");

                    b.Navigation("Records");
                });

            modelBuilder.Entity("Domain.Server.MqttServer", b =>
                {
                    b.Navigation("AuthClients");

                    b.Navigation("AuthConfig")
                        .IsRequired();

                    b.Navigation("AuthLogs");

                    b.Navigation("AuthUsers");
                });
#pragma warning restore 612, 618
        }
    }
}
