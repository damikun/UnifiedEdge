

namespace Aplication.Services
{

    /// <summary>
    /// Handle Password hashinng and comparing to existing hash to verifi user
    /// </summary>
    public interface IPasswordHasher
    {
        /// <summary>
        /// Calculate and generate hase for concrete password passed in parameter
        /// </summary>
        string Hash(string password);

        /// <summary>
        /// Compare and Verify if two hashes equals (used for user login)
        /// </summary>
        (bool Verified, bool NeedsUpgrade) Check(string hash, string password);
    }
}