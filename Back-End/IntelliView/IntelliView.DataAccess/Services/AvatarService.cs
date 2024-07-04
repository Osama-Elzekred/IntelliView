namespace IntelliView.DataAccess.Services
{
    using IntelliView.DataAccess.Services.IService;
    using IntelliView.Models.Models;
    using Microsoft.Extensions.Logging;
    using Newtonsoft.Json;
    using Newtonsoft.Json.Linq;
    using System;
    using System.Net.Http;
    using System.Text;
    using System.Threading.Tasks;


    public class AvatarService : IAvatarService
    {
        private static readonly HttpClient client = new HttpClient();
        private const string SubscriptionKey = "306a1f1015aa4cf6b54d6ab9c8032559";
        private const string ServiceRegion = "westeurope";
        private const string ServiceHost = "customvoice.api.speech.microsoft.com";

        private readonly ILogger<AvatarService> _logger; // Added logger field

        public AvatarService(ILogger<AvatarService> logger) // Added logger parameter in constructor
        {
            _logger = logger;
        }

        public async Task<((string downloadUrl, dynamic VideoId)? video, string message)> SubmitSynthesis(
          string displayName = "Simple avatar synthesis",
          string description = "Simple avatar synthesis description",
          string textType = "PlainText",
          string voice = "en-US-JennyNeural",
          string inputText = "Hi, This is intelliview Ai service and I will be with you for the Rest of this interview",
          bool customized = false,
          string talkingAvatarCharacter = "lisa",
          string talkingAvatarStyle = "graceful-sitting",
          string videoFormat = "webm",
          string videoCodec = "vp9",
          string subtitleType = "soft_embedded",
          string backgroundColor = "transparent")
        {
            var url = $"https://{ServiceRegion}.{ServiceHost}/api/texttospeech/3.1-preview1/batchsynthesis/talkingavatar";
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", SubscriptionKey);

            var payload = new
            {
                displayName,
                description,
                textType,
                synthesisConfig = new { voice },
                customVoices = new { },
                inputs = new[] { new { text = inputText } },
                properties = new
                {
                    customized,
                    talkingAvatarCharacter,
                    talkingAvatarStyle,
                    videoFormat,
                    videoCodec,
                    subtitleType,
                    backgroundColor
                }
            };

            var content = new StringContent(JsonConvert.SerializeObject(payload), Encoding.UTF8, "application/json");

            var response = await client.PostAsync(url, content);
            try
            {
                if (response.IsSuccessStatusCode)
                {
                    var responseJson = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    var jobId = responseJson?.id.ToString();
                    int timer = 0;
                    string downloadUrl;
                    do
                    {
                        await Task.Delay(5000); // wait for 5 seconds before checking the status
                        downloadUrl = await GetSynthesis(jobId);
                        timer++;
                        if (timer == 15) break;
                    }
                    while (downloadUrl == null);

                    return timer == 15 ? (null, "Generating Video took too long") : ((downloadUrl, jobId!), "successful");
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to submit batch avatar synthesis job"); // Added logger error message

                return (null, message: $"Failed to submit batch avatar synthesis job: {response.StatusCode}, \n error: {e.Message}");
            }

            _logger.LogError("Failed to get batch synthesis job"); // Added logger error message
            return (null, $"Failed to get batch synthesis job: {response.StatusCode}");
        }

        public async Task<string?> GetSynthesis(string jobId)
        {
            var url = $"https://{ServiceRegion}.{ServiceHost}/api/texttospeech/3.1-preview1/batchsynthesis/talkingavatar/{jobId}";
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", SubscriptionKey);

            var response = await client.GetAsync(url);
            try
            {
                if (response.IsSuccessStatusCode)
                {
                    var responseJson = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                    if (responseJson?.status == "Succeeded")
                    {
                        _logger.LogInformation("Successfully retrieved batch synthesis job"); // Added logger information message
                        return responseJson.outputs.result;
                    }
                    _logger.LogInformation("Batch synthesis job status is not 'Succeeded'"); // Added logger information message
                    return null;
                }
            }
            catch (Exception e)
            {
                _logger.LogError(e, "Failed to get batch synthesis job"); // Added logger error message

                throw new Exception($"Failed to get batch synthesis job: {response.StatusCode}, \n error: {e.Message} ");
            }

            throw new Exception($"Failed to get batch synthesis job: {response.StatusCode}");
        }

        public async Task<List<dynamic>> ListSynthesisJobs(int skip = 0, int top = 100)
        {
            var url = $"https://{ServiceRegion}.{ServiceHost}/api/texttospeech/3.1-preview1/batchsynthesis/talkingavatar?skip={skip}&top={top}";
            client.DefaultRequestHeaders.Add("Ocp-Apim-Subscription-Key", SubscriptionKey);

            var response = await client.GetAsync(url);

            if (response.IsSuccessStatusCode)
            {
                var responseJson = JsonConvert.DeserializeObject<dynamic>(await response.Content.ReadAsStringAsync());
                _logger.LogInformation($"List batch synthesis jobs successfully, got {responseJson?.values.Count} jobs");
                return ((JArray)responseJson.values).ToObject<List<dynamic>>();
            }
            else
            {
                _logger.LogError($"Failed to list batch synthesis jobs: {response.StatusCode}"); // Added logger error message
                throw new Exception($"Failed to list batch synthesis jobs: {response.StatusCode}");
            }
        }

        // voices https://learn.microsoft.com/en-us/azure/ai-services/speech-service/language-support?tabs=tts
        public string getAvatarVoice(MockLang lang)
        {
            switch (lang)
            {
                case MockLang.English:
                    return "en-GB-SoniaNeural";
                case MockLang.Arabic:
                    return "ar-YE-MaryamNeural";
                default:
                    return "en-IE-EmilyNeural";
            }
        }
    }
}
