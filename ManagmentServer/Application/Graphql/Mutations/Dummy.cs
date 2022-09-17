
namespace Aplication.Graphql.Mutations
{

    [ExtendObjectType(OperationTypeNames.Mutation)]
    public class TestMutations
    {


        /// <summary>
        /// Returns always True
        /// </summary>
        /// <returns>True</returns>
        [GraphQLIgnore]
        public async Task<bool> True()
        {
            return true;
        }
    }
}