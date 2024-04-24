using IntelliView.DataAccess.Services.IService;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;

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

        public async Task<string> SendRequestAsync(object dataToSend,string url,string apiKey)
        {
            // Serialize the input object to JSON
            var jsonData = JsonSerializer.Serialize(dataToSend, _jsonSerializerOptions);

            // Add authorization header with your API key
            _httpClient.DefaultRequestHeaders.Add("Authorization",$"Bearer {apiKey}");

            // Create a StringContent object with the JSON data to send
            var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

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
        public async Task<string> GetCVmatch(string resumePath, string jd)
        {
            // get api key from appsettings
            var apiKey = _configuration.GetSection("cvMatchAPIKey").Value;
            var content = new
            {
                resumePath,
                jd
            };
            var result = await SendRequestAsync(content,
                "https://inteliview.pythonanywhere.com/cvmatch", apiKey!);
            return result;
        }
    }
}
