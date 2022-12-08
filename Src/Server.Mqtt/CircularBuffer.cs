using System.Collections;
using System.Collections.Immutable;

namespace Server.Mqtt
{
    public class ConcurrentCircularBuffer<T> : IEnumerable<T> where T : IQueueItem
    {
        private readonly object _locker = new();
        private readonly int _capacity;
        private ImmutableQueue<T> _queue = ImmutableQueue<T>.Empty;
        private int _count = 0;
        private long _lastId = 0;

        public ConcurrentCircularBuffer(int capacity) => _capacity = capacity;

        public void Enqueue(T item)
        {
            lock (_locker)
            {
                item.Id = ++_lastId;
                _queue = _queue.Enqueue(item);
                if (_count < _capacity)
                    _count++;
                else
                    _queue = _queue.Dequeue();
            }
        }

        public void Clean()
        {
            lock (_locker)
            {
                _queue.Clear();
            }
        }

        public IEnumerator<T> GetEnumerator()
        {
            var enumerator = Volatile.Read(ref _queue).GetEnumerator();
            while (enumerator.MoveNext())
                yield return enumerator.Current;
        }

        IEnumerator IEnumerable.GetEnumerator() => GetEnumerator();
    }

    public abstract class QueueItem : IQueueItem
    {
        public string Uid = Guid.NewGuid().ToString();

        private long _id;

        public long Id
        {
            get => Volatile.Read(ref _id);
            set => Volatile.Write(ref _id, value);
        }

    }

    public interface IQueueItem
    {
        public long Id { get; set; }
    }
}