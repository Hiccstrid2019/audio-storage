namespace MusicProgress.Options;

public class JwtSettings
{
    public string SecretKey { get; set; }
    public int LifeSpan { get; set; }
    public int RefreshTokenLifeSpan { get; set; }
}
