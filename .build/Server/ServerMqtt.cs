using Nuke.Common;
using Nuke.Common.IO;
using Nuke.Common.Tools.NuGet;
using Nuke.Common.Tools.DotNet;
using Nuke.Common.Tools.EntityFramework;
using Nuke.Common.Utilities.Collections;
using static Nuke.Common.IO.FileSystemTasks;
using static Nuke.Common.IO.PathConstruction;
using static Nuke.Common.Tools.DotNet.DotNetTasks;

partial class Build : NukeBuild
{

    //---------------
    // Enviroment
    //---------------

    AbsolutePath ServerMqtt_Directory => RootDirectory / "Src" / "Server.Mqtt";

    //---------------
    // Build process
    //---------------

    Target ServerMqtt_Clean => _ => _
        .Before(ServerMqtt_Restore)
        .Executes(() =>
        {
            ServerMqtt_Directory.GlobDirectories("**/bin", "**/obj")
                .ForEach(DeleteDirectory);
        });

    Target ServerMqtt_Restore => _ => _
        .Executes(() =>
        {
            DotNetRestore(s => s
                .SetProjectFile(ServerMqtt_Directory)
            );
        });

    Target ServerMqtt_Compile => _ => _
        .DependsOn(ServerMqtt_Restore, ServerCore_Compile)
        .Executes(() =>
        {
            DotNetBuild(s => s
                .SetProjectFile(ServerMqtt_Directory)
                .SetConfiguration(Configuration)
                .EnableNoRestore()
                .SetCopyright(Copyright)
            // .SetOutputDirectory(OutputDirectory)
            );
        });

}
