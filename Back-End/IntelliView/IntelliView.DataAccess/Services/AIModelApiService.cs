using IntelliView.DataAccess.Services.IService;
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

        public AIModelApiClient()
        {
            _httpClient = new HttpClient();

            // Configure JSON serializer options
            _jsonSerializerOptions = new JsonSerializerOptions
            {
                PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            };
        }

        public async Task<object> SendRequestAsync(object dataToSend,string url,string apiKey)
        {
            // Serialize the input object to JSON
            var jsonData = JsonSerializer.Serialize(dataToSend, _jsonSerializerOptions);

            // Add authorization header with your API key
            _httpClient.DefaultRequestHeaders.Add("Authorization", apiKey);

            // Create a StringContent object with the JSON data to send
            var content = new StringContent(jsonData, Encoding.UTF8, "application/json");

            // Send a POST request with the JSON data in the request body
            HttpResponseMessage response = await _httpClient.PostAsync(url, content);

            // Check if the request was successful
            if (response.IsSuccessStatusCode)
            {
                // Read and deserialize the response JSON object
                var responseContent = await response.Content.ReadAsStringAsync();
                return JsonSerializer.Deserialize<object>(responseContent, _jsonSerializerOptions);
            }
            else
            {
                // Handle error response
                return $"Error: {response.StatusCode}";
            }
        }
    }
}
