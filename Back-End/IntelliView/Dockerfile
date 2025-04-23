# Build stage
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build
ARG BUILD_CONFIGURATION=Release
WORKDIR /src

# Copy solution and project files
COPY ["IntelliView.sln", "./"]
COPY ["IntelliView.API/IntelliView.API.csproj", "IntelliView.API/"]
COPY ["IntelliView.DataAccess/IntelliView.DataAccess.csproj", "IntelliView.DataAccess/"]
COPY ["IntelliView.Models/IntelliView.Models.csproj", "IntelliView.Models/"]
COPY ["IntelliView.Utility/IntelliView.Utility.csproj", "IntelliView.Utility/"]

# Restore dependencies
RUN dotnet restore

# Copy the rest of the source code
COPY . .

# Build and publish
WORKDIR "/src/IntelliView.API"
RUN dotnet build "IntelliView.API.csproj" -c $BUILD_CONFIGURATION -o /app/build
RUN dotnet publish "IntelliView.API.csproj" -c $BUILD_CONFIGURATION -o /app/publish /p:UseAppHost=false

# Runtime stage
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS final

# Update and install security patches, then cleanup
RUN apt-get update && \
    apt-get upgrade -y && \
    apt-get install -y --no-install-recommends \
    ca-certificates \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/* \
    && rm -rf /tmp/* /var/tmp/*

# Create non-root user and set permissions
WORKDIR /app
RUN adduser --disabled-password --gecos "" appuser && \
    chown -R appuser:appuser /app

# Copy published files from build stage
COPY --from=build /app/publish .

# Copy configuration files
COPY --from=build /src/IntelliView.API/appsettings.json .
COPY --from=build /src/IntelliView.API/.env .

# Set environment variables
ENV ASPNETCORE_ENVIRONMENT=Development
ENV ASPNETCORE_URLS="http://+:8080;https://+:8081"

# Expose ports
EXPOSE 8080
EXPOSE 8081

# Set user for running the application
USER appuser

# Set the entry point
ENTRYPOINT ["dotnet", "IntelliView.API.dll"]