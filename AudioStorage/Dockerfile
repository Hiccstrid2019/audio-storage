FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["AudioStorage/AudioStorage.csproj", "AudioStorage/"]
RUN dotnet restore "AudioStorage/AudioStorage.csproj"
COPY . .
WORKDIR "/src/AudioStorage"
RUN dotnet build "AudioStorage.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "AudioStorage.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "AudioStorage.dll"]
