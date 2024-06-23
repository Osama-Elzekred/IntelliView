using IntelliView.Models.Models.Interview;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json;
using System.Text.Json.Serialization;

public class VideoAiScore
{
    [Key]
    public int MockVideoAnswerId { get; set; }

    [JsonIgnore]
    [ForeignKey("MockVideoAnswerId")]
    public virtual MockVideoAnswer MockVideoAnswer { get; set; }

    // Overall similarity score of the answer
    [Column(TypeName = "decimal(18, 2)")]
    public decimal? AnswerSimilarityScore { get; set; }

    // Question text
    public string? AnswerText { get; set; }

    // Sentiment score
    [Column(TypeName = "decimal(18, 2)")]
    public decimal? SentimentScore { get; set; }

    // Emotion scores data in JSON format
    public List<EmotionScore>? EmotionScores { get; set; }

    // Comparison score
    [Column(TypeName = "decimal(18, 2)")]
    public decimal? ComparisonScore { get; set; }

    // Video information (e.g., metadata)
    //public string VideoInfo { get; set; }

    //public string TextInfo { get; set; }
}

public class EmotionScore
{
    [Key]
    public int Id { get; set; }
    public DateTime Timestamp { get; set; }

    [NotMapped]
    public Dictionary<string, double>? Scores { get; set; }

    // Serialized Scores for database storage
    public string SerializedScores
    {
        get => JsonSerializer.Serialize(Scores);
        set => Scores = JsonSerializer.Deserialize<Dictionary<string, double>>(value);
    }
}
