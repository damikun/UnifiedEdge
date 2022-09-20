﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Persistence;

#nullable disable

namespace Persistence.Migrations
{
    [DbContext(typeof(ManagmentDbCtx))]
    partial class ManagmentDbCtxModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder.HasAnnotation("ProductVersion", "6.0.6");

            modelBuilder.Entity("Domain.Edge", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("INTEGER");

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
                            Guid = "ffcd2b1c-5a78-46ae-9168-a84b3c877fed",
                            Name = "Undefined"
                        });
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

                    b.HasIndex("IpAddress")
                        .IsUnique();

                    b.HasIndex("Port")
                        .IsUnique();

                    b.HasIndex("ServerBaseID", "ServerBaseUID");

                    b.ToTable("Endpoints");
                });

            modelBuilder.Entity("Domain.Server.MqttServer", b =>
                {
                    b.HasBaseType("Domain.Server.ServerBase");

                    b.Property<int>("Port")
                        .HasColumnType("INTEGER");

                    b.ToTable("MqttServer", (string)null);
                });

            modelBuilder.Entity("Domain.Server.MqttServerCfg", b =>
                {
                    b.HasBaseType("Domain.Server.ServerCfgBase");

                    b.Property<int?>("port")
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
                        .HasForeignKey("ServerBaseID", "ServerBaseUID");
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
#pragma warning restore 612, 618
        }
    }
}
