
namespace IntelliView.API.Infrastructure
{
    public static class ResultExtension
    {
        public static IResult ToProblemDetails(this Result result)
        {
            if (result.IsSuccess)
            {
                throw new InvalidOperationException("the Request is already Successful");
            }
            return Results.Problem(
                statusCode: GetStatusCode(result.Error.Type),
                title: GetTitle(result.Error.Type),
                type: GetType(result.Error.Type),
                extensions: new Dictionary<string, object?> {
                    {"error",new[]{result.Error} }
                });

            static string? GetTitle(ErrorType errortype) => errortype switch
            {
                ErrorType.ValidationError => "Bad Request",
                ErrorType.NotFound => "Not Found",
                ErrorType.Conflict => "Conflict",
                _ => "Server Failure"
            };

            static int? GetStatusCode(ErrorType errortype) => errortype switch
            {
                ErrorType.ValidationError => StatusCodes.Status400BadRequest,
                ErrorType.NotFound => StatusCodes.Status404NotFound,
                ErrorType.Conflict => StatusCodes.Status409Conflict,
                _ => StatusCodes.Status500InternalServerError
            };
            static string? GetType(ErrorType errortype) => errortype switch
            {
                ErrorType.ValidationError => "https://tools.ietf.org/html/rfc7231#section-6.5.1",
                ErrorType.NotFound => "https://tools.ietf.org/html/rfc7231#section-6.5.4",
                ErrorType.Conflict => "https://tools.ietf.org/html/rfc7231#section-6.5.8",
                _ => "https://tools.ietf.org/html/rfc7231#section-6.6.1"
            };
        }
    }
    public class Result
    {
        public Result(bool IsSuccess, Error error)
        {
            if (IsSuccess && error != Error.None || !IsSuccess && error == Error.None)
            {
                throw new InvalidOperationException();
            }
            this.IsSuccess = IsSuccess;
            Error = error;
        }
        public Error Error { get; }
        public bool IsSuccess { get; }
        public bool IsFailure => !IsSuccess;
        public static Result Success() => new(true, Error.None);
        public static Result Failure(Error error) => new(false, error);
        public static Result<T> Success<T>(T value) => new(true, value, Error.None);
    }
    public class Result<T> : Result
    {
        public Result(bool IsSuccess, T? value, Error error) : base(IsSuccess, error)
        {
            _Value = value;
        }
        private T? _Value { get; }
        public T Value => IsSuccess ? _Value! : throw new InvalidOperationException("The value of a failure result can not be accessed");
        public new static Result<T> Failure(Error error) => new(false, default!, error);

        public static Result<T> Success(T value) => new(true, value, Error.None);
        public static implicit operator Result<T>(T value) => Success(value);
    }
}
