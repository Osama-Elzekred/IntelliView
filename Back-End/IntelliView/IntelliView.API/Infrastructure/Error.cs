using IdentityModel.Client;

namespace IntelliView.API.Infrastructure
{
    public record Error
    {
        public static readonly Error None = new(string.Empty, string.Empty,ErrorType.Failure);
        public static readonly Error NullValue= new("Null Value", "Null Value was provided", ErrorType.ValidationError);
        private Error(string message, string code, ErrorType errorType)
        {
            Message = message;
            Code = code;
            Type = (ResponseErrorType)errorType;
        }
        public string Code { get;}
        public string Message { get; }
        public ResponseErrorType Type { get; }
        public static Error NotFound(string message, string code) => 
            new(message, code, ErrorType.NotFound);
        public static Error ValidationError(string message, string code) =>
            new(message, code, ErrorType.ValidationError);
        public static Error Conflict(string message, string code) =>
            new(message, code, ErrorType.Conflict);
        public static Error Failure(string message, string code) =>
            new(message, code, ErrorType.Failure);
    }
    public enum ErrorType
    {
        ValidationError=1,
        NotFound=2,
        Conflict=3,
        Failure=0
    }
}
