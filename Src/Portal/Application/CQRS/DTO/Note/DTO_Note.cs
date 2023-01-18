using Domain;
using Aplication.Mapping;

namespace Aplication.DTO
{

    public class DTO_Note : IMapFrom<Note>
    {
        public long Id { get; set; }

        public bool isPrivate { get; set; }

#nullable disable
        public string Name { get; set; }
#nullable enable

        public bool isDraft { get; set; }

        public bool isHighlighted { get; set; }

        public DateTime Created { get; set; }

        public DateTime Updated { get; set; }

#nullable disable
        public string Content { get; set; }

        public string CreatedBy { get; set; }

        public string Updatedby { get; set; }
#nullable enable
    }
}