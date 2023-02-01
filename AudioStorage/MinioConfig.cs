namespace AudioStorage;

public class MinioConfig
{
    public string BucketName { get; set; }
    public string ContentType { get; set; }
    public string ServerHost { get; set; }
    public int ServerPort { get; set; }
    public string Scheme { get; set; }
}