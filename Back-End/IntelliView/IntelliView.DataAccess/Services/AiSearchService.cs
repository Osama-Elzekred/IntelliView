using IntelliView.DataAccess.Services.IService;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json.Linq;
using OpenAI_API;
using OpenAI_API.Completions;
using System.Text;
namespace IntelliView.DataAccess.Services
{
    public class AiSearchService : IAiSearchService
    {
        private readonly IConfiguration _configuration;
        private readonly HttpClient _httpClient;
        private readonly ILogger<AiSearchService> _logger;

        public AiSearchService(IConfiguration configuration, HttpClient httpClient, ILogger<AiSearchService> logger)
        {
            _configuration = configuration;
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
            _logger = logger;
        }

        public async Task<string> GeminiAiApi(string text)
        {
            var apiKey = _configuration["GeminiApiKey"];
            var apiUrl = $"https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={apiKey}";

            var payload = new
            {
                contents = new[]
                {
                new
                {
                    parts = new[]
                    {
                        new
                        {
                            text = text
                        }
                    }
                }
            }
            };

            var jsonPayload = Newtonsoft.Json.JsonConvert.SerializeObject(payload);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            try
            {
                _logger.LogInformation("Sending request to Gemini AI API with payload: {Payload}", jsonPayload);

                var response = await _httpClient.PostAsync(apiUrl, content);
                var jsonResponse = await response.Content.ReadAsStringAsync();

                if (!response.IsSuccessStatusCode)
                {
                    _logger.LogError("API call failed with status code {StatusCode}. Response: {ResponseContent}", response.StatusCode, jsonResponse);
                    throw new Exception($"API call failed with status code {response.StatusCode}");
                }

                _logger.LogInformation("Received response from Gemini AI API: {ResponseContent}", jsonResponse);

                var responseObject = JObject.Parse(jsonResponse);
                var generatedText = responseObject?.SelectToken("candidates[0].content.parts[0].text")?.Value<string>();

                return generatedText ?? "NO Output";
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error calling Gemini AI API with payload: {Payload}", jsonPayload);
                throw;
            }
        }

        public async Task<string> AimLapAiApi(string text, string system = "you are an Interview expert")
        {
            var apiKey = _configuration["AIMLApiKey"];
            var apiUrl = "https://api.aimlapi.com/v1/chat/completions";

            var payload = new
            {
                model = "mistralai/Mistral-7B-Instruct-v0.2",
                messages = new[]
                {
            new { role = "system", content = system },
            new { role = "user", content = text }
        },
                temperature = 0.7,
                max_tokens = 128
            };

            var jsonPayload = Newtonsoft.Json.JsonConvert.SerializeObject(payload);
            var content = new StringContent(jsonPayload, Encoding.UTF8, "application/json");

            // Clear existing headers to avoid adding the Authorization header multiple times
            _httpClient.DefaultRequestHeaders.Clear();
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

            int maxRetries = 3;
            int delay = 2000; // Initial delay in milliseconds

            for (int retry = 0; retry < maxRetries; retry++)
            {
                try
                {
                    _logger.LogInformation("Sending request to AI/ML API with payload: {Payload}", jsonPayload);

                    var response = await _httpClient.PostAsync(apiUrl, content);
                    var jsonResponse = await response.Content.ReadAsStringAsync();

                    if (response.StatusCode == System.Net.HttpStatusCode.TooManyRequests)
                    {
                        _logger.LogWarning("Rate limit exceeded. Retrying in {Delay}ms...", delay);
                        await Task.Delay(delay);
                        delay *= 2; // Exponential backoff
                        continue;
                    }

                    if (!response.IsSuccessStatusCode)
                    {
                        _logger.LogError("API call failed with status code {StatusCode}. Response: {ResponseContent}", response.StatusCode, jsonResponse);
                        throw new Exception($"API call failed with status code {response.StatusCode}");
                    }

                    _logger.LogInformation("Received response from AI/ML API: {ResponseContent}", jsonResponse);

                    var responseObject = JObject.Parse(jsonResponse);
                    var generatedText = responseObject?.SelectToken("choices[0].message.content")?.Value<string>();

                    return generatedText ?? "NO Output";
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Error calling AI/ML API with payload: {Payload}", jsonPayload);
                    if (retry == maxRetries - 1)
                    {
                        throw;
                    }
                }
            }

            throw new Exception("Max retry attempts exceeded.");
        }



        public async Task<string> GetAiBasedResult(string searchText)
        {
            string apiKey = _configuration["OPENAI_API_KEY"]!;

            var openai = new OpenAIAPI(apiKey);

            var completions = await openai.Completions.CreateCompletionAsync(
                new CompletionRequest
                {
                    Prompt = searchText,
                    MaxTokens = Convert.ToInt32(_configuration["MAX_LEN_INPUT_OPENAI"]!),
                    Model = OpenAI_API.Models.Model.Davinci
                }
            );

            return completions.Completions[0].Text;

        }

    }
}
