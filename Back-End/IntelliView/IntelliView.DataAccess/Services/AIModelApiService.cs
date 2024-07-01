using IntelliView.DataAccess.Services.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Text.Json;

namespace IntelliView.DataAccess.Services
{
    public class AIModelApiClient : IAIModelApiService
    {
        private readonly HttpClient _httpClient;
        private readonly JsonSerializerOptions _jsonSerializerOptions;
        private readonly IConfiguration _configuration;
        private readonly IAiSearchService _aiBasedSearchService;

        public AIModelApiClient(IConfiguration configuration, IAiSearchService aiBasedSearchService, HttpClient httpClient)
        {
            _configuration = configuration;
            _httpClient = httpClient;

            // Configure JSON serializer options
            _jsonSerializerOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };
            _aiBasedSearchService = aiBasedSearchService;
        }


        public async Task<string> SendRequestAsync(HttpClient httpClient, MultipartFormDataContent content, string url, string apiKey)
        {
            using var requestMessage = new HttpRequestMessage(HttpMethod.Post, url)
            {
                Content = content
            };

            // Add authorization header with your API key
            requestMessage.Headers.Add("Authorization", $"Bearer {apiKey}");

            // Send the request
            HttpResponseMessage response = await httpClient.SendAsync(requestMessage);

            // Check if the request was successful
            if (response.IsSuccessStatusCode)
            {
                // Read and deserialize the response JSON object
                var responseContent = await response.Content.ReadAsStringAsync();
                return responseContent;
            }
            else
            {
                // Handle error response
                return $"Error: {response.StatusCode}";
            }
        }

        public async Task<string> GetCVmatch(IFormFile? rawCV, string jd)
        {
            // get api key from appsettings
            var apiKey = _configuration.GetSection("cvMatchAPIKey").Value;

            using (var memoryStream = new MemoryStream())
            {
                await rawCV!.CopyToAsync(memoryStream);

                // Reset the position of the MemoryStream to the beginning
                memoryStream.Position = 0;

                // Now you can use 'memoryStream' as the content of the uploaded file
                // Perform further processing here
                var content = new MultipartFormDataContent();
                content.Add(new StreamContent(memoryStream), "rawCV", rawCV.FileName);
                content.Add(new StringContent(jd), "jd");

                var result = await SendRequestAsync(_httpClient, content, "https://inteliview.pythonanywhere.com/cvmatch", apiKey!);
                return result;
            }
        }

        public async Task<string> GetFaceDetectionInfo(string videoLink)
        {
            // get api key from appsettings
            var apiKey = _configuration.GetSection("cvMatchAPIKey").Value;

            var content = new MultipartFormDataContent();
            content.Add(new StringContent(videoLink), "videolink");

            var result = await SendRequestAsync(_httpClient, content, "https://inteliview.pythonanywhere.com/faceDetection", apiKey!);
            return result;
        }

        public async Task<string> FetchVideoAnalysisData(string videoLink)
        {
            // get api key from appsettings
            var apiKey = _configuration.GetSection("cvMatchAPIKey").Value;

            // Create a new HttpClient instance with a specific timeout for this request
            using var httpClient = new HttpClient
            {
                Timeout = TimeSpan.FromSeconds(300)
            };

            var content = new MultipartFormDataContent();
            content.Add(new StringContent(videoLink), "videolink");

            var result = await SendRequestAsync(httpClient, content, "https://inteliview2.pythonanywhere.com/api/analyse", apiKey!);

            return result;
        }
        public async Task<double?> FetchModelAnswerSimilarityFromGemeini(string answerVideotext, string modelAnswer)
        {
            // Construct the prompt for the Gemini AI model
            string prompt = $"Compare the following answer with the model answer and provide a similarity score between -1 and 1. " +
                            $"The output should be a single number \n\n" +
                            $"Answer: {answerVideotext}\n\n" +
                            $"Model Answer: {modelAnswer}";

            // Call the AI search service to get the similarity score
            var result = await _aiBasedSearchService.GeminiAiApi(prompt);

            // Assuming the result is a JSON string containing the similarity score
            double similarityScore;
            try
            {
                similarityScore = JsonSerializer.Deserialize<double>(result);
            }
            catch (Exception)
            {
                similarityScore = 0; // or handle the error as needed
            }


            // Ensure the score is within the range [-1, 1]
            if (similarityScore < -1 || similarityScore > 1)
            {
                return null;
            }

            return similarityScore;
        }
        public async Task<string?> FetchRecommendationFromGemeini(string answerVideotext, string modelAnswer, string Question = "Unavailable")
        {
            // Construct the prompt for the Gemini AI model
            string prompt = $"Analyze the following answer and provide a recommendation or tip to improve it. " +
                $"The output should be a single text string without any prefixes like 'Recommendation:'.\n\n" +
                $"Question: {Question}\n\n" +
                $"Answer: {answerVideotext}\n\n" +
                $"Model Answer: {modelAnswer}";

            // Call the AI search service to get the recommendation or tip
            var result = await _aiBasedSearchService.GeminiAiApi(prompt);

            // Assuming the result is a JSON string containing the recommendation or tip
            //var recommendation = JsonSerializer.Deserialize<string>(result);

            return result;
        }



    }
}
