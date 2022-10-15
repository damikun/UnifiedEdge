
public static class UidHelper
{
    public static string GetNormalisedUid()
    {
        // Todo Rewrite to use ToString(format)
        return Guid.NewGuid().ToString().Replace("-", "").Replace(".", "");
    }
}