FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app
EXPOSE 8000

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS server_build
WORKDIR /src
COPY ./server/server.csproj .
RUN dotnet restore ./server.csproj
COPY ./server .
RUN dotnet build ./server.csproj -c Release -o /app/build

FROM node:18 AS client_build
WORKDIR /src
COPY ./client/package.json ./client/yarn.lock ./
RUN yarn install
COPY ./client .
RUN yarn build

FROM server_build AS publish
RUN dotnet publish ./server.csproj -c Release -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
COPY --from=client_build /src/dist ./wwwroot
ENTRYPOINT ["dotnet", "server.dll"]
