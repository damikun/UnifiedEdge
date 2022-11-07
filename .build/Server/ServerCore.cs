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

    AbsolutePath ServerCore_Directory => RootDirectory / "Src" / "Server.Abstraction";

    //---------------
    // Build process
    //---------------

    Target ServerCore_Clean => _ => _
        .Before(ServerCore_Restore)
        .Executes(() =>
        {
            ServerCore_Directory.GlobDirectories("**/bin", "**/obj")
                .ForEach(DeleteDirectory);
        });

    Target ServerCore_Restore => _ => _
        .Executes(() =>
        {
            DotNetRestore(s => s
                .SetProjectFile(ServerCore_Directory)
            );
        });

    Target ServerCore_Compile => _ => _
        .DependsOn(ServerCore_Restore)
        .Executes(() =>
        {
            DotNetBuild(s => s
                .SetProjectFile(ServerCore_Directory)
                .SetConfiguration(Configuration)
                .EnableNoRestore()
                .SetCopyright(Copyright)
            // .SetOutputDirectory(OutputDirectory)
            );
        });

}
