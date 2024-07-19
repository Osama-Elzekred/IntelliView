using IntelliView.DataAccess.Services.IService;
using IntelliView.Models.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System.Text.Json;
using System.Text.RegularExpressions;

namespace IntelliView.DataAccess.Services
{
    public class AIModelApiClient : IAIModelApiService
    {
        private readonly HttpClient _httpClient;
        private readonly JsonSerializerOptions _jsonSerializerOptions;
        private readonly IConfiguration _configuration;
        private readonly IAiSearchService _aiBasedSearchService;
        private readonly ILogger<AIModelApiClient> _logger;

        public AIModelApiClient(IConfiguration configuration, IAiSearchService aiBasedSearchService, HttpClient httpClient, ILogger<AIModelApiClient> logger)
        {
            _configuration = configuration;
            _httpClient = httpClient;
            _logger = logger;

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

        public async Task<string> FetchVideoAnalysisData(string videoLink, MockLang lang)
        {
            var Lang = lang switch
            {
                MockLang.English => "en-US",
                MockLang.Arabic => "ar-EG",
                _ => "en-US"
            };

            // get api key from appsettings
            var apiKey = _configuration.GetSection("cvMatchAPIKey").Value;

            // Create a new HttpClient instance with a specific timeout for this request
            using var httpClient = new HttpClient
            {
                Timeout = TimeSpan.FromSeconds(300)
            };

            var content = new MultipartFormDataContent();
            content.Add(new StringContent(videoLink), "videolink");
            content.Add(new StringContent(Lang), "Lang");

            var result = await SendRequestAsync(httpClient, content, "https://inteliview2.pythonanywhere.com/api/analyse", apiKey!);

            return result;
        }
        private string DecodeUnicodeEscapeSequences(string input)
        {
            return Regex.Unescape(input);
        }
        public async Task<double?> FetchModelAnswerSimilarityAI(string answerVideotext, string modelAnswer, string Question = "Unavailable")
        {
            //Construct the prompt for the Gemini AI model

            //string prompt = $"Compare the following answer with the model answer and provide a similarity score between 0 and 1. " +
            //                $"The output MUST be a single number \n\n" +
            //                $"Answer: {answerVideotext}\n\n" +
            //                $"Model Answer: {modelAnswer}";

            string prompt =
                    $"Compare the following interviewee's answer with the provided model answer and return a similarity score between 0 and 1. " +
                    $"Consider that the answer comes from an audio-to-text API and may contain errors in speech detection. " +
                    $"Please focus on the overall meaning and ignore minor transcription errors.\n\n" +
                    $"Question: {Question}\n\n" +
                    $"Interviewee Answer: {answerVideotext}\n\n" +
                    $"Model Answer: {modelAnswer}\n\n" +
                     "The output MUST be a single number.";



            // Call the AI search service to get the similarity CvScore
            var result = await _aiBasedSearchService.GeminiAiApi(prompt);
            double similarityScore = 0.01d;
            var match = Regex.Match(result, @"\d+(\.\d+)?");
            // Assuming the result is a JSON string containing the similarity CvScore

            try
            {
                if (match.Success)
                {
                    similarityScore = double.Parse(match.Value);
                }
                else
                {
                    similarityScore = JsonSerializer.Deserialize<double>(result);
                }
            }
            catch (Exception)
            {
                // error happened during deserialization should return null in the future 
                similarityScore = 0.01d; // or handle the error as needed
                _logger.LogError("Error deserializing the similarity score from the AI response: {Result}", result);
            }


            // Ensure the CvScore is within the range [-1, 1]
            if (similarityScore < 0 || similarityScore > 1)
            {
                _logger.LogError("Error deserializing the similarity score from the AI response: {Result}", result);
                return null;
            }

            return similarityScore;
        }
        public async Task<string?> FetchRecommendationAI(string answerVideotext, string modelAnswer, string Question = "Unavailable")
        {
            // Construct the prompt for the Gemini AI model
            string prompt = $"Analyze the following answer and provide a feedback or tip to improve it. " +
                $"The output MUST be a single text starting without any prefixes like 'feedback:'.\n\n" +
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
