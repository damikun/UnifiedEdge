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

    AbsolutePath Portal_Directory => RootDirectory / "Src" / "Portal" / "API";

    //---------------
    // Build process
    //---------------

    Target Portal_Clean => _ => _
        .Before(Portal_Restore)
        .Executes(() =>
        {
            Portal_Directory.GlobDirectories("**/bin", "**/obj")
                .ForEach(DeleteDirectory);
        });

    Target Portal_Restore => _ => _
        .Executes(() =>
        {
            DotNetRestore(s => s
                .SetProjectFile(Portal_Directory)
            );
        });

    Target Portal_Compile => _ => _
        .DependsOn(Portal_Restore, ServerCore_Compile)
        .Executes(() =>
        {
            DotNetBuild(s => s
                .SetProjectFile(Portal_Directory)
                .SetConfiguration(Configuration)
                .EnableNoRestore()
                .SetCopyright(Copyright)
            // .SetOutputDirectory(OutputDirectory)
            );
        });

}
