FROM mcr.microsoft.com/dotnet/aspnet:6.0 AS base
WORKDIR /app
EXPOSE 80
EXPOSE 443

FROM mcr.microsoft.com/dotnet/sdk:6.0 AS build
WORKDIR /src
COPY ["MusicProgress/MusicProgress.csproj", "MusicProgress/"]
RUN dotnet restore "MusicProgress/MusicProgress.csproj"
COPY . .
WORKDIR "/src/MusicProgress"
RUN dotnet build "MusicProgress.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "MusicProgress.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "MusicProgress.dll"]
