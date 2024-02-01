using IntelliView.API.Infrastructure;

namespace IntelliView.API.Errors
{
    public static class TestErrors
    {
        public static readonly Error AlreadyRegistered = Error.Conflict("Already Registered", "400");
        public static readonly Error NotFound = Error.NotFound("Not Found", "404");
        public static readonly Error NullValue = Error.Failure("Null Value", "400");
        public static readonly Error Failure = Error.Failure("Failure", "500");

    }
}
