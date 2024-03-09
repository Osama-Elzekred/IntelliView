namespace IntelliView.DataAccess.Services.IService
{
    public interface IAiSearchService
    {
        Task<string> GetAiBasedResult(string searchText);
        Task<string> GeminiAiApi(string text);
    }
}