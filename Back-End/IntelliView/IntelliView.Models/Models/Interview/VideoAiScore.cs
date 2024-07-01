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
    //[Column(TypeName = "decimal(8, 2)")]
    public double? AnswerSimilarityScore { get; set; }

    // Question text
    public string? AnswerText { get; set; }

    // Sentiment score
    //[Column(TypeName = "decimal(8, 2)")]
    public double? SentimentScore { get; set; }

    // Emotion scores data in JSON format
    public List<EmotionScore>? EmotionScores { get; set; }

    // Video information (e.g., metadata)
    //public string VideoInfo { get; set; }

    public string? RecommendationText { get; set; }
    //[NotMapped]
    public double? TotalScore { get; set; }

    private double CalculateTotalScore()
    {
        // Define weights for different components
        const double similarityWeight = 0.8f;
        const double sentimentWeight = 0.2f;
        //const double emotionWeight = 0.1f;

        // Calculate weighted components
        double similarityComponent = (double)(AnswerSimilarityScore ?? 0) * similarityWeight;
        double sentimentComponent = (double)(SentimentScore ?? 0) * sentimentWeight;

        // Calculate emotion component as average score weighted
        //double emotionComponent = 0;
        //if (EmotionScores != null && EmotionScores.Any())
        //{
        //    double totalEmotionScore = EmotionScores.Average(e => e.Scores?.Values.Average() ?? 0);
        //    emotionComponent = totalEmotionScore * emotionWeight;
        //}

        // Sum up the components to get the total score
        return similarityComponent + sentimentComponent;
    }

    // Method to update the total score
    public void UpdateTotalScore()
    {
        TotalScore = CalculateTotalScore();
    }
}

public class EmotionScore
{
    [Key]
    public int Id { get; set; }

    [Column(TypeName = "decimal(8, 2)")]
    public decimal Time { get; set; }

    [NotMapped]
    public Dictionary<string, double>? Scores { get; set; }

    // Serialized Scores for database storage
    public string SerializedScores
    {
        get => JsonSerializer.Serialize(Scores);
        set => Scores = JsonSerializer.Deserialize<Dictionary<string, double>>(value);
    }
}
