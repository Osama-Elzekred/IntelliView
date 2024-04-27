using IntelliView.DataAccess.Services.IService;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using System.Text;
using System.Text.Json;

namespace IntelliView.DataAccess.Services
{
    public class AIModelApiClient : IAIModelApiService
    {
        private readonly HttpClient _httpClient;
        private readonly JsonSerializerOptions _jsonSerializerOptions;
        private readonly IConfiguration _configuration;

        public AIModelApiClient(IConfiguration configuration)
        {
            _configuration = configuration;
            _httpClient = new HttpClient();

            // Configure JSON serializer options
            _jsonSerializerOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };
        }

        public async Task<string> SendRequestAsync(MultipartFormDataContent content, string url, string apiKey)
        {
            // Serialize the input object to JSON
            // Add authorization header with your API key
            _httpClient.DefaultRequestHeaders.Add("Authorization", $"Bearer {apiKey}");

            // Send a POST request with the JSON data in the request body
            HttpResponseMessage response = await _httpClient.PostAsync(url, content);

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

                var result = await SendRequestAsync(content, "https://inteliview.pythonanywhere.com/cvmatch", apiKey!);
                return result;
            }
        }
    }
}
