using IntelliView.DataAccess.Services.IService;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json.Linq;
using OpenAI_API;
using OpenAI_API.Completions;
using System.Text;
namespace IntelliView.DataAccess.Services
{
    public class AiSearchService : IAiSearchService
    {
        private readonly IConfiguration Configuration;

        private readonly HttpClient _httpClient;
        public AiSearchService(IConfiguration configuration, HttpClient httpClient)
        {
            Configuration = configuration;
            _httpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
        }
        public async Task<string> GeminiAiApi(string text)
        {
            var apiUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=AIzaSyCYa94tuK8BVfLDRUKxtd1hmClXJeCiKL8";

            // Replace YOUR_API_KEY with your actual API key obtained from the Google Cloud Console

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

            var response = await _httpClient.PostAsync(apiUrl, content);

            if (!response.IsSuccessStatusCode)
            {
                throw new Exception($"API call failed with status code {response.StatusCode}");
            }

            var jsonResponse = await response.Content.ReadAsStringAsync();

            // Deserialize the JSON response
            var responseObject = JObject.Parse(jsonResponse);

            // Extract the generated text
            var generatedText = responseObject?.SelectToken("candidates[0].content.parts[0].text")?.Value<string>();

            return generatedText ?? "NO Output";

        }

        public async Task<string> GetAiBasedResult(string searchText)
        {
            string apiKey = Configuration["OPENAI_API_KEY"]!;

            var openai = new OpenAIAPI(apiKey);

            var completions = await openai.Completions.CreateCompletionAsync(
                new CompletionRequest
                {
                    Prompt = searchText,
                    MaxTokens = Convert.ToInt32(Configuration["MAX_LEN_INPUT_OPENAI"]!),
                    Model = OpenAI_API.Models.Model.Davinci
                }
            );

            return completions.Completions[0].Text;

        }

    }
}
