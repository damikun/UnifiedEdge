﻿
using Domain.Server;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace Persistence.Identity
{

    public class PortalIdentityDbContext : IdentityDbContext<ApplicationUser>
    {
        public PortalIdentityDbContext(DbContextOptions<PortalIdentityDbContext> options)
            : base(options)
        {
        }
        protected PortalIdentityDbContext(DbContextOptions options)
         : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            // Customize the ASP.NET Identity model and override the defaults if needed.
            // For example, you can rename the ASP.NET Identity table names and more.
            // Add your customizations after calling base.OnModelCreating(builder);
        }
    }

}