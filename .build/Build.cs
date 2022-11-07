using System;
using System.Linq;
using Nuke.Common;
using Nuke.Common.CI;
using Nuke.Common.CI.GitHubActions;
using Nuke.Common.Execution;
using Nuke.Common.IO;
using Nuke.Common.ProjectModel;
using Nuke.Common.Tooling;
using Nuke.Common.Tools.DotNet;
using Nuke.Common.Utilities.Collections;
using static Nuke.Common.EnvironmentInfo;
using static Nuke.Common.IO.FileSystemTasks;
using static Nuke.Common.IO.PathConstruction;

[GitHubActions(
    "Clean-Restore-Compile",
    GitHubActionsImage.WindowsLatest,
    GitHubActionsImage.MacOsLatest,
    InvokedTargets = new[] {
        nameof(Compile),
        nameof(Print_Net_SDK),
    },
    OnPushIncludePaths = new[] {
        "Src/**",
        ".build/**"
    },
    OnPushBranches = new[] { "main" },
    AutoGenerate = false)]
partial class Build : NukeBuild
{
    /// Support plugins are available for:
    ///   - JetBrains ReSharper        https://nuke.build/resharper
    ///   - JetBrains Rider            https://nuke.build/rider
    ///   - Microsoft VisualStudio     https://nuke.build/visualstudio
    ///   - Microsoft VSCode           https://nuke.build/vscode

    public static int Main() => Execute<Build>(x => x.Compile);

    [Parameter("Configuration to build - Default is 'Debug' (local) or 'Release' (server)")]
    readonly Configuration Configuration = true ? Configuration.Debug : Configuration.Release;

    AbsolutePath SourceDirectory => RootDirectory / "Src";

    string Copyright = $"Copyright © Dalibor-Kundrat {DateTime.Now.Year}";

    //---------------
    // Build process
    //---------------

    protected override void OnBuildInitialized()
    {
        Serilog.Log.Information("🚀 Build process started");

        base.OnBuildInitialized();
    }


    //----------------------------
    //----------------------------

    Target Print_Net_SDK => _ => _
        .Before(Clean)
        .Executes(() =>
        {
            DotNetTasks.DotNet("--list-sdks");
        });

    Target Clean => _ => _
        .Before(Compile)
        .DependsOn(Server_Clean);

    Target Compile => _ => _
        .DependsOn(
            Clean,
            ServerMqtt_Compile,
            Portal_Compile
        );

    Target Server_Clean => _ => _
        .DependsOn(ServerCore_Clean, ServerMqtt_Clean)
        .Before(ServerCore_Restore, ServerMqtt_Restore)
        .Executes(() =>
        {
            SourceDirectory.GlobDirectories("**/bin", "**/obj")
            .Where(e => !e.ToString().Contains(
                "node_modules",
                StringComparison.OrdinalIgnoreCase))
            .Where(e => !e.ToString().Contains(
                "ClientApp",
                StringComparison.OrdinalIgnoreCase))
            .ForEach(DeleteDirectory);
        });

    Target Server_Compile => _ => _
        .DependsOn(
            Server_Clean,
            ServerCore_Compile,
            ServerMqtt_Compile
        );

}
