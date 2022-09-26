using Aplication.Core;
using MediatR;

namespace Aplication.Services.Scheduler
{
    public interface IScheduler
    {
        string Enqueue(
            IRequest request,
            string description = "");

        void Schedule(
            IRequest request,
            DateTimeOffset scheduleAt,
            string description = "");

        void Schedule(
            IRequest request,
            TimeSpan delay,
            string description = "");

        void Schedule(
            MediatorSerializedObject mediatorSerializedObject,
            TimeSpan delay,
            string description = "");

        void ScheduleRecurring(
            IRequest request,
            string name,
            string cronExpression,
            string description = "",
            string queue = "default");

        void ScheduleRecurring<T>(
            string cronExpression,
            string name = default!,
            string queue = "default") where T : CommandCore;

        void ScheduleRecurring(
            MediatorSerializedObject mediatorSerializedObject,
            string name,
            string cronExpression,
            string description = "",
            string queue = "default");

        public void RemoveJob(string job_id);
    }
}