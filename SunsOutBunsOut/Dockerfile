FROM mcr.microsoft.com/dotnet/sdk:8.0
WORKDIR /SunsOutBunsOut
COPY ["SunsOutBunsOut.csproj", "SunsOutBunsOut/"]
RUN dotnet restore "SunsOutBunsOut/SunsOutBunsOut.csproj"
COPY . .
WORKDIR "/SunsOutBunsOut"
RUN dotnet build "SunsOutBunsOut.csproj" -c Release -o /app
RUN dotnet publish "SunsOutBunsOut.csproj" -c Release -o /app
EXPOSE 80
WORKDIR /app
ENTRYPOINT ["dotnet", "SunsOutBunsOut.dll"]