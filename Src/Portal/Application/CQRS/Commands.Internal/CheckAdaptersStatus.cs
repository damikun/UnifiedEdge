using MediatR;
using AutoMapper;
using Domain.Server;
using Aplication.Core;
using Persistence.Portal;
using System.Collections.Concurrent;
using Microsoft.EntityFrameworkCore;
using System.Net.NetworkInformation;
using Aplication.Services.ServerFascade;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// CheckAdaptersStatus
    /// </summary>
    public class CheckAdaptersStatus : CommandBase<Unit>
    {
        public CheckAdaptersStatus()
        {
            this.Flags.diable_tracing = true;
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>CheckAdaptersHandler</c> command </summary>
    public class CheckAdaptersHandler : IRequestHandler<CheckAdaptersStatus, Unit>
    {

        /// <summary>
        /// Injected <c>IMediator</c>
        /// </summary>
        private readonly IMediator _mediator;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Injected <c>IDbContextFactory</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IEndpointProvider</c>
        /// </summary>
        private readonly IEndpointProvider _endpoint_provider;

        /// <summary>
        /// Injected <c>ConcurentDictionary</c>
        /// </summary>
        private static readonly ConcurrentDictionary<string, bool> _adapter_state = new ConcurrentDictionary<string, bool>();

        /// <summary>
        /// Main constructor
        /// </summary>
        public CheckAdaptersHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper,
            IMediator mediator,
            IEndpointProvider endpoint_provider
        )
        {
            _factory = factory;

            _mapper = mapper;

            _mediator = mediator;

            _endpoint_provider = endpoint_provider;
        }

        /// <summary>
        /// Command handler for <c>CheckAdapters</c>
        /// </summary>
        public async Task<Unit> Handle(CheckAdaptersStatus request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            foreach (var adapter in _endpoint_provider.NetworkAdapters)
            {
                try
                {
                    if (_adapter_state.TryGetValue(adapter.Id, out bool value))
                    {
                        if (adapter.OperationalStatus == OperationalStatus.Up)
                        {
                            if (value == false)
                            {
                                _adapter_state.TryUpdate(adapter.Id, true, !value);

                                dbContext.AdapterEvents.Add(
                                    new AdapterEvent()
                                    {
                                        AdapterId = adapter.Id,
                                        State = AdapterState.UP,
                                    }
                                );
                            }
                        }
                        else
                        {
                            if (value == true)
                            {
                                _adapter_state.TryUpdate(adapter.Id, false, !value);

                                dbContext.AdapterEvents.Add(
                                    new AdapterEvent()
                                    {
                                        AdapterId = adapter.Id,
                                        State = AdapterState.Down,
                                    }
                                );
                            }
                        }
                    }
                    else
                    {
                        _adapter_state.TryAdd(
                            adapter.Id,
                            adapter.OperationalStatus == OperationalStatus.Up
                        );
                    }

                }
                catch
                {
                    // Nothing dont care
                }

                await dbContext.SaveChangesAsync();

            }

            return Unit.Value;
        }
    }
}