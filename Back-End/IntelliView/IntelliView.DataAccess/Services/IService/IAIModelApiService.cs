namespace IntelliView.DataAccess.Services.IService
{
    public interface IAIModelApiService
    {
        Task<string> SendRequestAsync(object dataToSend, string url, string apiKey);
        Task<string> GetCVmatch(string resumePath, string jd);
    }
}
