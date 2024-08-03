# Use the official .NET SDK image as the base image for building
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory
WORKDIR /app

# Copy the project file and restore dependencies
COPY ["SunsOutBunsOut.csproj", "./"]
RUN dotnet restore

# Copy the rest of the application source code
COPY . .

# Build the application
RUN dotnet build -c Release -o /app/build

# Publish the application
RUN dotnet publish -c Release -o /app/publish

# Use the official .NET runtime image as the base image for the final image
FROM mcr.microsoft.com/dotnet/aspnet:8.0 AS runtime

# Set the working directory
WORKDIR /app

# Copy the published output from the build stage
COPY --from=build /app/publish .

# Set the environment to Development
ENV ASPNETCORE_ENVIRONMENT=Development

# Expose the port on which the app will run
EXPOSE 80

# Specify the entry point for the container
ENTRYPOINT ["dotnet", "SunsOutBunsOut.dll"]
