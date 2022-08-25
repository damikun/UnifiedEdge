
namespace Aplication.Services.Historian
{

    public interface IHistorian
    {
        void Record(string key, int value, DateTime? dt = null);

        void Record(string key, long value, DateTime? dt = null);

        void Record(string key, double value, DateTime? dt = null);

        void Record(string key, float value, DateTime? dt = null);

        void Record(string key, short value, DateTime? dt = null);

        void Record(string key, byte value, DateTime? dt = null);

        void Record(string key, bool value, DateTime? dt = null);

        void Record(string key, IConvertible value, DateTime? dt = null);

        IEnumerable<HistorianRecord> Get<T>(string key) where T : IConvertible;

        void Clear(string key);
    }
}