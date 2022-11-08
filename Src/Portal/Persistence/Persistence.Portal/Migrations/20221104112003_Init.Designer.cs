﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence.Portal;

#nullable disable

namespace Persistence.Portal.Migrations
{
    [DbContext(typeof(ManagmentDbCtx))]
    [Migration("20221104112003_Init")]
    partial class Init
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "7.0.0");

            modelBuilder.Entity("Domain.Edge", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
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
                            Guid = "90e045b7-eb8f-4f8e-bcea-6eb2b640a5e3",
                            Name = "Undefined"
                        });
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
                });

            modelBuilder.Entity("Domain.Server.ServerBase", b =>
                {
                    b.Property<long>("ID")
                        .HasColumnType("INTEGER");

                    b.Property<string>("UID")
                        .HasColumnType("TEXT");

                    b.Property<string>("CfgServerUID")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Created")
                        .HasColumnType("TEXT");

                    b.Property<string>("Description")
                        .HasColumnType("TEXT");

                    b.Property<bool>("IsEnabled")
                        .HasColumnType("INTEGER");

                    b.Property<string>("Location")
                        .HasColumnType("TEXT");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.Property<DateTime>("Updated")
                        .HasColumnType("TEXT");

                    b.HasKey("ID", "UID");

                    b.HasIndex("CfgServerUID")
                        .IsUnique();

                    b.ToTable("Servers");
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

                    b.Property<string>("ServerBaseUID")
                        .HasColumnType("TEXT");

                    b.HasKey("Id");

                    b.HasIndex("IpAddress");

                    b.HasIndex("Port");

                    b.HasIndex("ServerBaseID", "ServerBaseUID");

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

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasColumnType("TEXT")
                        .HasColumnName("ServerClientConnectedEvent_ClientId");

                    b.HasDiscriminator().HasValue("ServerClientConnectedEvent");
                });

            modelBuilder.Entity("Domain.Server.Events.ServerClientDisconnectedEvent", b =>
                {
                    b.HasBaseType("Domain.Server.Events.ServerEventBase");

                    b.Property<string>("ClientId")
                        .IsRequired()
                        .HasColumnType("TEXT");

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

                    b.HasDiscriminator().HasValue("ServerConfigDiffEvent");
                });

            modelBuilder.Entity("Domain.Server.Events.ServerStateChangedEvent", b =>
                {
                    b.HasBaseType("Domain.Server.Events.ServerEventBase");

                    b.Property<string>("State")
                        .IsRequired()
                        .HasColumnType("TEXT");

                    b.HasDiscriminator().HasValue("ServerStateChangedEvent");
                });

            modelBuilder.Entity("Domain.Server.MqttServer", b =>
                {
                    b.HasBaseType("Domain.Server.ServerBase");

                    b.ToTable("MqttServer", (string)null);
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

            modelBuilder.Entity("Domain.Server.OpcServer", b =>
                {
                    b.HasBaseType("Domain.Server.ServerBase");

                    b.ToTable("OpcServer", (string)null);
                });

            modelBuilder.Entity("Domain.Server.OpcServerCfg", b =>
                {
                    b.HasBaseType("Domain.Server.ServerCfgBase");

                    b.ToTable("OpcServerCfg", (string)null);
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
                        .HasForeignKey("ServerBaseID", "ServerBaseUID")
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
                        .HasForeignKey("Domain.Server.MqttServer", "ID", "UID")
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

            modelBuilder.Entity("Domain.Server.OpcServer", b =>
                {
                    b.HasOne("Domain.Server.ServerBase", null)
                        .WithOne()
                        .HasForeignKey("Domain.Server.OpcServer", "ID", "UID")
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
#pragma warning restore 612, 618
        }
    }
}
