using MediatR;
using AutoMapper;
using Persistence;
using Domain.Server;
using Aplication.DTO;
using Aplication.Core;
using MediatR.Pipeline;
using FluentValidation;
using Microsoft.EntityFrameworkCore;


namespace Aplication.CQRS.Commands
{

    /// <summary>
    /// Command for updating webhook Uri
    /// </summary>
    public class UpdateWebHookUri : CommandBase<DTO_WebHook>
    {

        /// <summary>WebHook Id </summary>
        public long WebHookId { get; set; }

        /// <summary> Url </summary>
        public string WebHookUrl { get; set; }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>
    /// UpdateWebHookUri Validator
    /// </summary>
    public class UpdateWebHookUriValidator
        : AbstractValidator<UpdateWebHookUri>
    {

        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        public UpdateWebHookUriValidator(IDbContextFactory<ManagmentDbCtx> factory)
        {
            _factory = factory;

            RuleFor(e => e.WebHookId)
            .GreaterThan(0);

            RuleFor(e => e.WebHookUrl)
            .NotEmpty()
            .NotNull();

            RuleFor(e => e.WebHookUrl)
            .Matches(Common.URI_REGEX)
            .WithMessage("Does not match URI expression");

            RuleFor(e => e.WebHookUrl)
            .MaximumLength(1000);

            RuleFor(e => e.WebHookUrl)
            .MustAsync(BeUniqueByURL)
            .WithMessage("Hook endpoint allready exist");

            RuleFor(e => e.WebHookId)
            .MustAsync(HookExist)
            .WithMessage("Hook was not found");
        }

        public async Task<bool> HookExist(
            UpdateWebHookUri request,
            long id,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return await dbContext.WebHooks.AnyAsync(e => e.Id == request.WebHookId);
        }

        public async Task<bool> BeUniqueByURL(
            UpdateWebHookUri request,
            string title,
            CancellationToken cancellationToken
        )
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            return !await dbContext.WebHooks.AnyAsync(e => e.WebHookUrl == request.WebHookUrl);
        }
    }

    //---------------------------------------
    //---------------------------------------

    /// <summary>Handler for <c>UpdateWebHookUri</c> command </summary>
    public class UpdateWebHookUriHandler : IRequestHandler<UpdateWebHookUri, DTO_WebHook>
    {

        /// <summary>
        /// Injected <c>ManagmentDbCtx</c>
        /// </summary>
        private readonly IDbContextFactory<ManagmentDbCtx> _factory;

        /// <summary>
        /// Injected <c>IMapper</c>
        /// </summary>
        private readonly IMapper _mapper;

        /// <summary>
        /// Main constructor
        /// </summary>
        public UpdateWebHookUriHandler(
            IDbContextFactory<ManagmentDbCtx> factory,
            IMapper mapper)
        {
            _mapper = mapper;

            _factory = factory;
        }

        /// <summary>
        /// Command handler for <c>UpdateWebHookUri</c>
        /// </summary>
        public async Task<DTO_WebHook> Handle(UpdateWebHookUri request, CancellationToken cancellationToken)
        {
            await using ManagmentDbCtx dbContext =
                _factory.CreateDbContext();

            WebHook wh = await dbContext.WebHooks
            .TagWith(string.Format("UpdateWebHookUri Command - Query Hook"))
            .Where(e => e.Id == request.WebHookId)
            .FirstAsync(cancellationToken);

            wh.WebHookUrl = request.WebHookUrl;

            await dbContext.SaveChangesAsync(cancellationToken);

            return _mapper.Map<DTO_WebHook>(wh);
        }
    }

    //---------------------------------------
    //---------------------------------------

    public class UpdateWebHookUriPostProcessor
        : IRequestPostProcessor<UpdateWebHookUri, DTO_WebHook>
    {
        public UpdateWebHookUriPostProcessor()
        {

        }

        public async Task Process(
            UpdateWebHookUri request,
            DTO_WebHook response,
            CancellationToken cancellationToken)
        {
            await Task.CompletedTask;
        }
    }
}