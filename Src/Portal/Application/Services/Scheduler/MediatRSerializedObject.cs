
namespace Aplication.Services.Scheduler
{
    public class MediatorSerializedObject
    {
        public MediatorSerializedObject(
            string data,
            string description,
            string fullTypeName,
            string assemblyName = "Aplication.Commands"
        )
        {
            Data = data;
            Description = description;
            AssemblyName = assemblyName;
            FullTypeName = fullTypeName;
        }

        public string Data { get; private set; }
        public string FullTypeName { get; private set; }
        public string Description { get; private set; }
        public string AssemblyName { get; private set; }


        /// <summary>
        /// Override for Hangfire dashboard display.
        /// </summary>
        /// <returns></returns>
        public override string ToString()
        {
            var commandName = FullTypeName.Split('.').Last();
            return $"{commandName} {Description}";
        }
    }
}