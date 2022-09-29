using MediatR;
using System.Diagnostics;
using Microsoft.Extensions.Logging;

namespace Aplication.Services
{

    public class Publisher : Aplication.Services.IPublisher
    {
        private readonly ServiceFactory _serviceFactory;
        public IDictionary<PublishStrategy, IMediator> PublishStrategies = new Dictionary<PublishStrategy, IMediator>();
        public PublishStrategy DefaultStrategy { get; set; } = PublishStrategy.SyncContinueOnException;

        /// <summary>
        /// Injected <c>ITelemetry</c>
        /// </summary>
        private readonly ITelemetry _telemetry;

        /// <summary>
        /// Injected <c>ILogger</c>
        /// </summary>
        private readonly ILogger _loger;

        public Publisher(ServiceFactory serviceFactory)
        {
            _serviceFactory = serviceFactory;

            _telemetry = serviceFactory.GetInstance<ITelemetry>();

            _loger = serviceFactory.GetInstance<ILogger>();

            PublishStrategies[PublishStrategy.Async] = new AppMediator(_serviceFactory, AsyncContinueOnException);
            PublishStrategies[PublishStrategy.ParallelNoWait] = new AppMediator(_serviceFactory, ParallelNoWait);
            PublishStrategies[PublishStrategy.ParallelWhenAll] = new AppMediator(_serviceFactory, ParallelWhenAll);
            PublishStrategies[PublishStrategy.ParallelWhenAny] = new AppMediator(_serviceFactory, ParallelWhenAny);
            PublishStrategies[PublishStrategy.SyncContinueOnException] = new AppMediator(_serviceFactory, SyncContinueOnException);
            PublishStrategies[PublishStrategy.SyncStopOnException] = new AppMediator(_serviceFactory, SyncStopOnException);
        }

        //-------------------------------------------------
        //-------------------------------------------------

        public Task<TResponse> Send<TResponse>(ICommandBase<TResponse> request, CancellationToken cancellationToken = default)
        {
            if (!PublishStrategies.TryGetValue(DefaultStrategy, out var mediator))
            {
                throw new ArgumentException($"Cannot get default strategy");
            }
            return mediator.Send<TResponse>(request, cancellationToken);
        }

#nullable enable
        public Task<object?> Send(ICommandBase request, CancellationToken cancellationToken = default)
        {
            if (!PublishStrategies.TryGetValue(DefaultStrategy, out var mediator))
            {
                throw new ArgumentException($"Cannot get default strategy");
            }
            return mediator.Send(request as object, cancellationToken);
        }
#nullable disable

        //-------------------------------------------------
        //-------------------------------------------------

        public Task Publish<TNotification>(TNotification notification)
        {
            return Publish(notification, DefaultStrategy, default(CancellationToken));
        }

        public Task Publish<TNotification>(TNotification notification, PublishStrategy strategy)
        {
            return Publish(notification, strategy, default(CancellationToken));
        }

        public Task Publish<TNotification>(TNotification notification, CancellationToken cancellationToken)
        {
            return Publish(notification, DefaultStrategy, cancellationToken);
        }

        public Task Publish<TNotification>(TNotification notification, PublishStrategy strategy, CancellationToken cancellationToken)
        {
            if (!PublishStrategies.TryGetValue(strategy, out var mediator))
            {
                throw new ArgumentException($"Unknown strategy: {strategy}");
            }

            return mediator.Publish(notification, cancellationToken);
        }

        private Activity GetActivity(string handler_name)
        {
            return _telemetry.AppSource.StartActivity(
                    String.Format(handler_name), ActivityKind.Consumer!
                );
        }

        private string GetTargetName(object target)
        {
            if (target == null)
                return null;

            var t_field = target.GetType().GetField("x");

            if (t_field == null)
                return null;

            var t_field_value = t_field.GetValue(target);

            if (t_field_value == null)
                return null;

            return t_field_value.GetType().Name;
        }

        private async Task WrappHandleByTracer(Func<INotification, CancellationToken, Task> handler, INotification notification, CancellationToken cancellationToken)
        {
            var activity = GetActivity(string.Format("{0}:{1}",
                notification.GetType().Name,
                GetTargetName(handler.Target))
            );

            try
            {
                activity?.Start();
                await handler(notification, cancellationToken);
            }
            catch (Exception ex)
            {
                _telemetry.SetOtelError(ex);

                _loger.LogError(ex.Message);

                throw ex;
            }
            finally
            {
                activity?.Stop();
                activity?.Dispose();
            }
        }

        private Task ParallelWhenAll(IEnumerable<Func<INotification, CancellationToken, Task>> handlers, INotification notification, CancellationToken cancellationToken)
        {
            var tasks = new List<Task>();

            foreach (var handler in handlers)
            {
                tasks.Add(Task.Run(() => WrappHandleByTracer(handler, notification, cancellationToken)));
            }

            return Task.WhenAll(tasks);
        }

        private Task ParallelWhenAny(IEnumerable<Func<INotification, CancellationToken, Task>> handlers, INotification notification, CancellationToken cancellationToken)
        {
            var tasks = new List<Task>();

            foreach (var handler in handlers)
            {
                tasks.Add(Task.Run(() => WrappHandleByTracer(handler, notification, cancellationToken)));
            }

            return Task.WhenAny(tasks);
        }

        private Task ParallelNoWait(IEnumerable<Func<INotification, CancellationToken, Task>> handlers, INotification notification, CancellationToken cancellationToken)
        {
            foreach (var handler in handlers)
            {
                Task.Run(() => WrappHandleByTracer(handler, notification, cancellationToken));
            }

            return Task.CompletedTask;
        }

        private async Task AsyncContinueOnException(IEnumerable<Func<INotification, CancellationToken, Task>> handlers, INotification notification, CancellationToken cancellationToken)
        {
            var tasks = new List<Task>();
            var exceptions = new List<Exception>();

            foreach (var handler in handlers)
            {
                try
                {
                    tasks.Add(WrappHandleByTracer(handler, notification, cancellationToken));
                }
                catch (Exception ex) when (!(ex is OutOfMemoryException || ex is StackOverflowException))
                {
                    exceptions.Add(ex);
                }
            }

            try
            {
                await Task.WhenAll(tasks).ConfigureAwait(false);
            }
            catch (AggregateException ex)
            {
                exceptions.AddRange(ex.Flatten().InnerExceptions);
            }
            catch (Exception ex) when (!(ex is OutOfMemoryException || ex is StackOverflowException))
            {
                exceptions.Add(ex);
            }

            if (exceptions.Any())
            {
                throw new AggregateException(exceptions);
            }
        }

        private async Task SyncStopOnException(IEnumerable<Func<INotification, CancellationToken, Task>> handlers, INotification notification, CancellationToken cancellationToken)
        {
            foreach (var handler in handlers)
            {
                await WrappHandleByTracer(handler, notification, cancellationToken).ConfigureAwait(false);
            }
        }

        private async Task SyncContinueOnException(IEnumerable<Func<INotification, CancellationToken, Task>> handlers, INotification notification, CancellationToken cancellationToken)
        {
            var exceptions = new List<Exception>();

            foreach (var handler in handlers)
            {
                try
                {
                    await WrappHandleByTracer(handler, notification, cancellationToken).ConfigureAwait(false);
                }
                catch (AggregateException ex)
                {
                    exceptions.AddRange(ex.Flatten().InnerExceptions);
                }
                catch (Exception ex) when (!(ex is OutOfMemoryException || ex is StackOverflowException))
                {
                    exceptions.Add(ex);
                }
            }

            if (exceptions.Any())
            {
                throw new AggregateException(exceptions);
            }
        }

        public Task Publish(object notification, PublishStrategy strategy, CancellationToken cancellationToken = default)
        {
            if (!PublishStrategies.TryGetValue(strategy, out var mediator))
            {
                throw new ArgumentException($"Unknown strategy: {strategy}");
            }

            return mediator.Publish(notification, cancellationToken);
        }
    }
}