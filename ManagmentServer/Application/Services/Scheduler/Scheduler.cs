using MediatR;
using Hangfire;
using Newtonsoft.Json;
using System.Diagnostics;
using Aplication.Core;

namespace Aplication.Services.Scheduler
{
    public class Scheduler : IScheduler
    {

        private readonly ICommandHandler _handler;

        private readonly ITelemetry _telemetry;

        public Scheduler(
            ICommandHandler handler,
            ITelemetry telemetry)
        {
            _handler = handler;
            _telemetry = telemetry;
        }

        public string Enqueue(
            IRequest request,
            string description = "")
        {

            Activity activity = StartActivity(request);

            if (request is ISharedCommandBase i_request_base)
            {
                // This gets later in command scheduler executor overide by current activity ID.
                i_request_base.ActivityId = Activity.Current?.Id;

                // This sets Parent id as current activity Id relation
                i_request_base.SetActivityIdAsParrentId();

                // This sets helper Data tag (ParentId) in trace ctx.
                SetTraceCtxData_ParrentId();
            }

            try
            {
                // This sets helper Data tag (ActivityId) in trace ctx.
                SetTraceCtxData_ActivityId();

                activity?.Start();

                var mediatorSerializedObject = SerializeObject(request, description);

                var id = BackgroundJob.Enqueue(
                    () => _handler.ExecuteCommand(mediatorSerializedObject));

                SetTraceCtxData_ScheduledId(id);

                return id;

            }
            catch (Exception ex)
            {
                _telemetry.SetOtelError(ex);

                throw;
            }
            finally
            {
                activity?.Stop();
                activity?.Dispose();
            }
        }

        public void Enqueue<T>() where T : CommandCore
        {
            var name = typeof(T).Name;

            var instance = Activator.CreateInstance<T>();

            instance.Flags.scheduled = true;

            var fullname = instance.GetType().FullName;

            var mediatorSerializedObject = SerializeObject(instance, "");

            BackgroundJob.Enqueue(
                () => _handler.ExecuteCommand(mediatorSerializedObject)
            );
        }

        private string Enqueue(
            IRequest request,
            string parentJobId,
            JobContinuationOptions continuationOption,
            string description = "")
        {

            var mediatorSerializedObject = SerializeObject(request, description);

            return BackgroundJob.ContinueJobWith(
                parentJobId,
                () => _handler.ExecuteCommand(mediatorSerializedObject), continuationOption);
        }

        private string Enqueue(
            MediatorSerializedObject mediatorSerializedObject,
            string parentJobId,
            JobContinuationOptions continuationOption,
            string description = "")
        {

            return BackgroundJob.ContinueJobWith(
                parentJobId,
                () => _handler.ExecuteCommand(mediatorSerializedObject), continuationOption);
        }

        public void Schedule(
            IRequest request,
            DateTimeOffset scheduleAt,
            string description = "")
        {

            var mediatorSerializedObject = SerializeObject(request, description);

            BackgroundJob.Schedule(
                () => _handler.ExecuteCommand(mediatorSerializedObject), scheduleAt);
        }

        public void Schedule(
            MediatorSerializedObject mediatorSerializedObject,
            DateTimeOffset scheduleAt,
            string description = "")
        {

            BackgroundJob.Schedule(
                () => _handler.ExecuteCommand(mediatorSerializedObject), scheduleAt);
        }

        public void Schedule(
            IRequest request,
            TimeSpan delay,
            string description = "")
        {
            var mediatorSerializedObject = SerializeObject(request, description);
            var newTime = DateTime.Now + delay;

            BackgroundJob.Schedule(
                () => _handler.ExecuteCommand(mediatorSerializedObject), newTime);
        }
        public void Schedule(
            MediatorSerializedObject mediatorSerializedObject,
            TimeSpan delay,
            string description = "")
        {

            var newTime = DateTime.Now + delay;

            BackgroundJob.Schedule(
                () => _handler.ExecuteCommand(mediatorSerializedObject), newTime);
        }

        public void RemoveJob(string job_id)
        {
            BackgroundJob.Delete(job_id);
        }

        public void ScheduleRecurring<T>(
            string cronExpression,
            string name = default!,
            string queue = "default") where T : CommandCore
        {
            if (name == default)
            {
                name = typeof(T).Name;
            }

            var instance = Activator.CreateInstance<T>();

            var fullname = instance.GetType().FullName;

            var mediatorSerializedObject = SerializeObject(instance, "");

            RecurringJob.AddOrUpdate(
                name,
                // queue,
                () => _handler.ExecuteCommand(mediatorSerializedObject),
                cronExpression,
                new RecurringJobOptions()
                {
                    TimeZone = TimeZoneInfo.Local,
                }
            );
        }

        public void ScheduleRecurring(
            IRequest request,
            string name,
            string cronExpression,
            string description = "",
            string queue = "default")
        {

            var mediatorSerializedObject = SerializeObject(request, description);

            RecurringJob.AddOrUpdate(
                name,
                queue,
                () => _handler.ExecuteCommand(mediatorSerializedObject),
                cronExpression,
                new RecurringJobOptions()
                {
                    TimeZone = TimeZoneInfo.Local,
                }
            );
        }

        public void ScheduleRecurring(
            MediatorSerializedObject mediatorSerializedObject,
            string name,
            string cronExpression,
            string description = "",
            string queue = "default")
        {

            RecurringJob.AddOrUpdate(
                name,
                queue,
                () => _handler.ExecuteCommand(mediatorSerializedObject),
                cronExpression,
                new RecurringJobOptions()
                {
                    TimeZone = TimeZoneInfo.Local,
                }
            );
        }

        private MediatorSerializedObject SerializeObject(
            object mediatorObject,
            string description)
        {
            string fullTypeName = mediatorObject.GetType().FullName!;

            string data = JsonConvert.SerializeObject(mediatorObject, new JsonSerializerSettings
            {
                Formatting = Formatting.None,
                TypeNameHandling = TypeNameHandling.All
            });

            return new MediatorSerializedObject(data, description, fullTypeName);
        }

        private Activity StartActivity(IRequest request)
        {
            return _telemetry.AppSource.StartActivity(
                    String.Format(
                        "SchedulerEnqueue: Request<{0}>",
                        request.GetType().FullName),
                        ActivityKind.Producer)!;
        }

        private void SetTraceCtxData_ParrentId()
        {
            if (Activity.Current?.ParentId != null)
            {
                Activity.Current.AddTag("Parrent Id", Activity.Current.ParentId);
            }
        }

        private void SetTraceCtxData_ScheduledId(string id)
        {
            if (Activity.Current != null)
            {
                Activity.Current.AddTag("Scheduled Id", id);
            }
        }

        private void SetTraceCtxData_ActivityId() =>
            Activity.Current?.AddTag("Activity Id", Activity.Current.Id);

    }
}