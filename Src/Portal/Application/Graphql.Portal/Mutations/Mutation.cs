using Aplication.Services.ServerFascade;

namespace Aplication.Graphql.Mutations
{
    /// <summary>
    /// Mutation
    /// </summary>
    public class Mutation
    {
        public async Task<bool> Test([Service] IEndpointProvider provider)
        {

            return true;
        }
    }
}
