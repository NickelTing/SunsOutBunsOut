# Use the official .NET SDK image as the base image
FROM mcr.microsoft.com/dotnet/sdk:8.0 AS build

# Set the working directory
WORKDIR /SunsOutBunsOut

# Copy the project file and restore dependencies
COPY ["SunsOutBunsOut.csproj", "./"]
RUN dotnet restore

# Copy the rest of the application source code
COPY . .

# Build the application
RUN dotnet build -c Release -o /app

# Publish the application
RUN dotnet publish -c Release -o /app

# Set the working directory to the published output
WORKDIR /app

# Expose the port on which the app will run
EXPOSE 80

# Specify the entry point for the container
ENTRYPOINT ["dotnet", "SunsOutBunsOut.dll"]
