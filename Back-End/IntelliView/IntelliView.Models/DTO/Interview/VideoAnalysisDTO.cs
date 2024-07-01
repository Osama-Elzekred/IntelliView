using Newtonsoft.Json;

public class VideoAnalysisDTO
{
    [JsonProperty("status")]
    public string Status { get; set; }

    [JsonProperty("text")]
    public string Text { get; set; }

    [JsonProperty("text_analysis")]
    public double TextAnalysis { get; set; }

    [JsonProperty("video_analysis")]
    public Dictionary<string, Dictionary<string, double>> VideoAnalysis { get; set; }
}
