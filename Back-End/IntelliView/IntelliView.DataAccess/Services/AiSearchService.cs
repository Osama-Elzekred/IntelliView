using IntelliView.DataAccess.Services.IService;
using OpenAI_API;
using OpenAI_API.Completions;
namespace IntelliView.DataAccess.Services
{
    public class AiSearchService : IAiSearchService
    {
        public AiSearchService() { }
        public async Task<string> GetAiBasedResult(string searchText)
        {
            string APIkey = "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";
            string result = "";
            var openai = new OpenAIAPI(APIkey);

            CompletionRequest req = new CompletionRequest();
            req.Prompt = searchText;
            req.MaxTokens = 200;
            req.Model = OpenAI_API.Models.Model.Davinci;
            var completions = openai.Completions.CreateCompletionAsync(req);
            foreach (var item in completions.Result.Completions)
            {
                result = item.Text;
            }
            return result;

        }
    }
}
