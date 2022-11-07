using System.Collections.Concurrent;
using Microsoft.Extensions.Caching.Memory;

namespace Aplication.Services.Historian
{
    public readonly record struct HistorianRecord(
        IConvertible Value,
        DateTime TimeStamp
    );

    public class InMemoryHistorian : IHistorian, IDisposable
    {
        private const short QUEUE_MAX_SIZE = 20;
        private const short HISTORIAN_SIZE = 100;
        private const short HIT_CACHE_INTERVAL_S = 2;
        private const short CACHE_SCAN_TIME_MS = 1200;


        private readonly ConcurrentDictionary<string, ConcurrentQueue<HistorianRecord>> _history =
            new ConcurrentDictionary<string, ConcurrentQueue<HistorianRecord>>();

        private static IReadOnlyList<HistorianRecord> _emptyList = new List<HistorianRecord>();

        private object _lock = new object();

        private readonly IMemoryCache _cache = new MemoryCache(
            new MemoryCacheOptions()
            {
                SizeLimit = HISTORIAN_SIZE,
                ExpirationScanFrequency = TimeSpan.FromMilliseconds(CACHE_SCAN_TIME_MS),
            }
        );

        public InMemoryHistorian(IMemoryCache cache)
        {
            _cache = cache;
        }

        public void Record(string key, int value, DateTime? dt = null) => Record<int>(key, value, dt);

        public void Record(string key, long value, DateTime? dt = null) => Record<long>(key, value, dt);

        public void Record(string key, double value, DateTime? dt = null) => Record<double>(key, value, dt);

        public void Record(string key, float value, DateTime? dt = null) => Record<float>(key, value, dt);

        public void Record(string key, short value, DateTime? dt = null) => Record<short>(key, value, dt);

        public void Record(string key, byte value, DateTime? dt = null) => Record<byte>(key, value, dt);

        public void Record(string key, bool value, DateTime? dt = null) => Record<bool>(key, value, dt);

        public void Record(string key, IConvertible value, DateTime? dt = null) => Record<IConvertible>(key, value, dt);

        private void Record<T>(string key, T o, DateTime? dt = null) where T : IConvertible
        {
            ValidateKey(key);

            var queue = GetOrCreate(key);

            lock (_lock)
            {
                var corner_value = queue.Count + 1;

                while (corner_value > QUEUE_MAX_SIZE)
                {
                    queue.TryDequeue(out HistorianRecord result);
                    corner_value = queue.Count + 1;
                }

                try
                {
                    queue.Enqueue(new HistorianRecord()
                    {
                        TimeStamp = dt ?? DateTime.Now,
                        Value = o
                    });

                    _cache.Remove(key);
                }
                catch
                {
                    // Shoud not happend validation is on top but to be sure no deadlock
                }

            }
        }

        public int GetSize(string key)
        {
            ValidateKey(key);

            var queue = _history.GetValueOrDefault(key);

            if (queue == null)
            {
                return 0;
            }
            else
            {
                return queue.Count;
            }
        }

        public ICollection<string> GetKeys() => _history.Keys;

        public IEnumerable<HistorianRecord> Get<T>(string key) where T : IConvertible
        {

            ValidateKey(key);

            if (_cache.TryGetValue<IEnumerable<HistorianRecord>>(key, out IEnumerable<HistorianRecord> value))
            {
                return value;
            }

            var queue = _history.GetValueOrDefault(key);

            if (queue == null)
            {
                return _emptyList;
            }
            else
            {
                var result = queue
                .OrderBy(e => e.TimeStamp)
                .ToList()
                .AsEnumerable();

                _cache.Set<IEnumerable<HistorianRecord>>(
                    key,
                    result,
                    GetDefaultEntryOptions()
                );

                return result;
            }
        }

        private MemoryCacheEntryOptions GetDefaultEntryOptions()
        {
            return new MemoryCacheEntryOptions()
            {
                AbsoluteExpirationRelativeToNow = TimeSpan.FromSeconds(HIT_CACHE_INTERVAL_S)
            };
        }

        private void ValidateKey(string key)
        {
            if (string.IsNullOrWhiteSpace(key))
            {
                throw new ArgumentNullException("Key");
            }
        }

        private ConcurrentQueue<HistorianRecord> GetOrCreate(string key)
        {
            return _history.GetOrAdd(key, new ConcurrentQueue<HistorianRecord>());
        }

        public void Clear(string key)
        {
            ValidateKey(key);

            lock (_lock)
            {
                try
                {
                    _history.Remove(key, out ConcurrentQueue<HistorianRecord>? value);
                }
                catch
                {
                    // Shoud not happend validation is on top but to be sure no deadlock
                }
            }
        }

        public void Dispose()
        {
            _cache.Dispose();
        }
    }
}