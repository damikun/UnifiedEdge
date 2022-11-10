using System;
using System.Linq;
using Nuke.Common;
using Nuke.Common.Tooling;
using Nuke.Common.Tools.DotNet;



partial class Build : NukeBuild
{
    public static void DotnetGlobalToolEnsureInstalled(string packageName)
    {
        var hasPackageInstalled = DotNetTasks.DotNet("tool list --global", logOutput: false)
            .Any(output => output.Text.Contains(packageName));

        if (!hasPackageInstalled)
            return;

        DotNetTasks.DotNetToolInstall(s => s
            .EnableGlobal()
            .SetPackageName(packageName));
    }

    public static Tool GetTool(string name) =>
    ToolResolver.TryGetEnvironmentTool(name) ??
    ToolResolver.GetPathTool(name);



    public static void CustomLogger(OutputType type, string output)
    {
        switch (type)
        {
            case OutputType.Std:
                Serilog.Log.Information(output);
                break;
            case OutputType.Err:
                {
                    if (
                        output.Contains(
                            "npmWARN",
                            StringComparison.OrdinalIgnoreCase
                        ) ||

                        output.Contains(
                            "npm WARN",
                            StringComparison.OrdinalIgnoreCase
                        ))

                        Serilog.Log.Warning(output);

                    else

                        Serilog.Log.Error(output);
                    break;
                }
        }
    }

}