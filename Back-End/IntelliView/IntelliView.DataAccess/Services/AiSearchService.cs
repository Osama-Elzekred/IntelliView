using IntelliView.DataAccess.Services.IService;
using Microsoft.Extensions.Configuration;
using OpenAI_API;
using OpenAI_API.Completions;
namespace IntelliView.DataAccess.Services
{
    public class AiSearchService : IAiSearchService
    {
        private readonly IConfiguration Configuration;
        public AiSearchService(IConfiguration configuration)
        {
            Configuration = configuration;
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
