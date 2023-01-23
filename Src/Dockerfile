
FROM mcr.microsoft.com/dotnet/aspnet:7.0 AS base
WORKDIR /app

FROM mcr.microsoft.com/dotnet/sdk:7.0 AS build
WORKDIR /src
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs


COPY ["./Portal/API/API.csproj", "Portal/API/"]
COPY ["./Portal/Application/Application.csproj", "Portal/Application/"]
COPY ["./Portal/Domain/Domain.csproj", "Portal/Domain/"]
COPY ["./Portal/Persistence/Persistence.Identity/Persistence.Identity.csproj", "Portal/Persistence/Persistence.Identity/"]
COPY ["./Portal/Persistence/Persistence.Portal/Persistence.Portal.csproj", "Portal/Persistence/Persistence.Portal/"]
COPY ["./Server.Abstraction/Server.csproj", "Server.Abstraction/"]
COPY ["./Server.Mqtt/Server.Mqtt.csproj", "Server.Mqtt/"]
COPY ["./Portal/API/DevCerts/c.pfx", "Portal/API/DevCerts/"]

RUN dotnet restore "Portal/API/API.csproj"

COPY . .

RUN ls -l
RUN npm cache clean –force

# run build over the API project
WORKDIR "/src/Portal/API/"
RUN dotnet build -c Release -o /app/build

RUN ls -l

# use arg for node options... Args are only for buildtime
ARG MAX_OLD_SPACE=16384
ENV NODE_OPTIONS=--max_old_space_size=${MAX_OLD_SPACE}

# run publish over the API project
FROM build AS publish
RUN apt-get update
RUN apt-get install -y curl
RUN apt-get install -y libpng-dev libjpeg-dev curl libxi6 build-essential libgl1-mesa-glx
RUN curl -sL https://deb.nodesource.com/setup_16.x | bash -
RUN apt-get install -y nodejs
RUN dotnet restore
RUN dotnet publish -c Release -o /app/publish --self-contained false --no-restore
# RUN dotnet publish -c Release -o /app/publish --verbosity quiet

WORKDIR /

FROM base AS runtime
WORKDIR /app
COPY --from=publish /app/publish .
RUN ls -l

EXPOSE 8080 443 5000 5001

ENV DOTNET_RUNNING_IN_CONTAINER=true

ENTRYPOINT [ "dotnet", "API.dll" ]