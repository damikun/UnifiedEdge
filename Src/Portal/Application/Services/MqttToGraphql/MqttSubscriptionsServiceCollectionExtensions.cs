using Aplication.Extensions.Mqtt;
using HotChocolate.Execution.Configuration;
using HotChocolate.Subscriptions.Diagnostics;
using Microsoft.Extensions.DependencyInjection.Extensions;

namespace Microsoft.Extensions.DependencyInjection;

public static class RedisSubscriptionsServiceCollectionExtensions
{
    public static IServiceCollection AddMqttSubscriptions(
        this IServiceCollection services)
    {
        if (services is null)
        {
            throw new ArgumentNullException(nameof(services));
        }

        services.AddSingleton<IMqttSubscriptionManager, MqttSubscriptionManager>();

        services.AddSingleton(sp => new MqttPubSub(
            sp.GetRequiredService<IMqttSubscriptionManager>(),
            sp.GetRequiredService<ISubscriptionDiagnosticEvents>()
        ));

        // services.TryAddSingleton<IMqttTopicEventSender>(sp =>
        //     sp.GetRequiredService<MqttPubSub>());
        services.TryAddSingleton<IMqttTopicEventReceiver>(sp =>
            sp.GetRequiredService<MqttPubSub>());

        return services;
    }

    public static IRequestExecutorBuilder AddMqttSubscriptions(
        this IRequestExecutorBuilder builder,
        Func<IServiceProvider, IMqttSubscriptionManager> manager)
    {
        if (builder is null)
        {
            throw new ArgumentNullException(nameof(builder));
        }

        if (manager is null)
        {
            throw new ArgumentNullException(nameof(manager));
        }

        AddMqttSubscriptions(builder.Services);

        return builder;
    }

    public static IRequestExecutorBuilder AddMqttSubscriptions(
        this IRequestExecutorBuilder builder)
    {
        if (builder is null)
        {
            throw new ArgumentNullException(nameof(builder));
        }

        return builder.AddMqttSubscriptions(
            sp => sp.GetRequiredService<IMqttSubscriptionManager>());
    }
}
