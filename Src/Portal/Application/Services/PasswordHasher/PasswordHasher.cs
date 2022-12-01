using Microsoft.Extensions.Options;
using System.Security.Cryptography;

namespace Aplication.Services
{
    public sealed class PasswordHasher : IPasswordHasher
    {

        /// <summary>
        /// Hash salt is random character to protect using hash tables to break password
        /// </summary>
        private const int SaltSize = 16; // 128 bit (128/8)
        private const int KeySize = 32; // 256 bit (256/8)

        public PasswordHasher(IOptions<HashingOptions> options) => Options = options.Value;

        /// <summary>
        /// Hashing options defined in service configure on app Startup class
        /// </summary>
        private HashingOptions Options { get; }

        /// <summary>
        /// Calculate and generate hase for concrete password passed in parameter
        /// </summary>
        public string Hash(string password)
        {
            using (var algorithm = new Rfc2898DeriveBytes(
            password,
            SaltSize,
            Options.Iterations,
            HashAlgorithmName.SHA512))
            {
                var key = Convert.ToBase64String(algorithm.GetBytes(KeySize));
                var salt = Convert.ToBase64String(algorithm.Salt);

                // Hash will have 3 parts:
                return $"{Options.Iterations}.{salt}.{key}";
            }
        }

        /// <summary>
        /// Compare and Verify if two hashes equals (used for user login)
        /// </summary>
        public (bool Verified, bool NeedsUpgrade) Check(string hash, string password)
        {
            var parts = hash.Split('.', 3);

            if (parts.Length != 3)
                throw new FormatException("Unexpected hash format");

            var iterations = Convert.ToInt32(parts[0]);
            var salt = Convert.FromBase64String(parts[1]);
            var key = Convert.FromBase64String(parts[2]);

            var needsUpgrade = iterations != Options.Iterations;

            using (var algorithm = new Rfc2898DeriveBytes(
            password,
            salt,
            iterations,
            HashAlgorithmName.SHA512))
            {
                var keyToCheck = algorithm.GetBytes(KeySize);

                var verified = keyToCheck.SequenceEqual(key);

                return (verified, needsUpgrade);
            }
        }
    }

    /// <summary>
    /// Option number of iteration for password hashing
    /// </summary>
    public sealed class HashingOptions
    {
        public int Iterations { get; set; } = 10000;
    }

}