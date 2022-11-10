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

    AbsolutePath Electron_Directory => RootDirectory / "Src" / "Electron" / "ElectronNET.CLI";

    //---------------
    // Build process
    //---------------

    Target Electron_Clean => _ => _
        .After(Clean)
        .Before(Electron_Restore)
        .Executes(() =>
        {
            Electron_Directory.GlobDirectories("**/bin", "**/obj")
                .ForEach(DeleteDirectory);
        });

    Target Electron_Restore => _ => _
        .Executes(() =>
        {
            DotNetRestore(s => s
                .SetProjectFile(Electron_Directory)
            );
        });

    Target Electron_Compile => _ => _
        .DependsOn(Electron_Restore, ServerCore_Compile)
        .Executes(() =>
        {
            DotNetBuild(s => s
                .SetProjectFile(Electron_Directory)
                .SetConfiguration(Configuration)
                .EnableNoRestore()
                .SetCopyright(Copyright)
            );
        });

}
