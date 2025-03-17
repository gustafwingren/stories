FROM stories-base AS build

WORKDIR /src
COPY ["src/Web/Web.csproj", "Web/"]
COPY ["src/Web/packages.lock.json", "Web/"]
RUN --mount=type=cache,id=nuget,target=/root/.nuget/packages \
    dotnet restore "Web/Web.csproj" --locked-mode

COPY ["src/Web/", "Web/"]

RUN --mount=type=cache,id=nuget,target=/root/.nuget/packages \
    dotnet build "Web/Web.csproj" -c Release --no-restore

FROM build AS publish
RUN --mount=type=cache,id=nuget,target=/root/.nuget/packages \
    dotnet publish "Web/Web.csproj" -c Release -o /app/publish --no-restore

FROM mcr.microsoft.com/dotnet/aspnet:9.0
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "Web.dll"]