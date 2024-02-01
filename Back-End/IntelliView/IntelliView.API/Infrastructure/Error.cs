namespace IntelliView.API.Infrastructure
{
    public sealed record Error
    {
        public static readonly Error None = new(string.Empty, string.Empty, ErrorType.Failure);
        public static readonly Error NullValue = new("Null Value", "Null Value was provided", ErrorType.ValidationError);
        private Error(string description, string code, ErrorType errorType)
        {
            Description = description;
            Code = code;
            Type = errorType;

        }
        public string Code { get; }
        public string Description { get; }
        public ErrorType Type { get; }
        public static Error NotFound(string description, string code) =>
            new(description, code, ErrorType.NotFound);
        public static Error Validation(string description, string code) =>
            new(description, code, ErrorType.ValidationError);
        public static Error Conflict(string description, string code) =>
            new(description, code, ErrorType.Conflict);
        public static Error Failure(string description, string code) =>
            new(description, code, ErrorType.Failure);
        public static Error FromException(Exception exception) =>
            new(exception.Message, exception.GetType().Name, ErrorType.Failure);
        public static implicit operator Result(Error error) =>
            Result.Failure(error);
    }
    public enum ErrorType
    {
        ValidationError = 1,
        NotFound = 2,
        Conflict = 3,
        Failure = 0
    }

}
