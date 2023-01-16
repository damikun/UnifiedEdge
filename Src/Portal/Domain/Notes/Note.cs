
namespace Domain
{
    public class Note
    {
        public long Id { get; set; }

        public bool isPrivate { get; set; }

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