namespace MusicProgress.Data;

public class Audio
{
    public int AudioId { get; set; }
    public int UserId { get; set; }
    public User User { get; set; }
}