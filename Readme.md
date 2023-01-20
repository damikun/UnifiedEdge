# Unified Edge

![Backend-Compile](https://github.com/damikun/UnifiedEdge/actions/workflows/Clean-Restore-Compile.yml/badge.svg)
[![Electron](https://github.com/damikun/UnifiedEdge/actions/workflows/Build-Electron-Artefact.yml/badge.svg)](https://github.com/damikun/UnifiedEdge/actions/workflows/Build-Electron-Artefact.yml)
[![Docker](https://github.com/damikun/UnifiedEdge/actions/workflows/Build-Docker.yml/badge.svg)](https://github.com/damikun/UnifiedEdge/actions/workflows/Build-Docker.yml)

## ✨ Description

UnifiedEdge provides edge functionality and a future bridge between different industrial protocols. 

(Currently full functional MQTT servers).

## ⚠️ This is early BETA!
- App is in BETA and is not ready for production or ussage
- Many parts will get optimized and changed in time...


##  💾 Installers

Code is not currently signed! 

>The installers can be behind the current app.

[Win64 Installer](https://www.dropbox.com/s/73r18os0vu5tsyv/UnifiedEdge%20Setup%201.0.1.exe?dl=0)


## 🧑‍💻 Local run

- Go to folder `/src/Portal/API`
- Run `dotnet watch run` from cmd


>App require HTTPS! Default self-signed cert location is: `./DevCerts/c.pfx"`

Default url: `https://localhost:5001/`

## 🧑‍💻 Docker

Run:

QuickRun:
```
docker run --rm -it -p 5001:5001 -p 40000-40010:40000-40010 -e ASPNETCORE_URLS="https://+:5001;http://+" -e ASPNETCORE_HTTPS_PORT=5001 -e MIN_PORT=40000 -e MAX_PORT=40010 -i ghcr.io/damikun/unifiededge:main
```
This runs portal on `https://localhost:5001/` and opens 10 ports range (40000-40010) for mqtt servers... Make sure you update Adapter to not use loopback in portal App..

Compose:
`docker-compose up` from root folder.. (Make sure you have proper cert installed...) The default path and password is defined inside compose file.. 

Default env. confinguration is:

```yaml
- ASPNETCORE_Kestrel__Certificates__Default__Path=/https/aspnetapp.pfx
```

To generate proper certs use following cmd for Windows 
Windows Example
```cli
dotnet dev-certs https --clean
dotnet dev-certs https -ep %USERPROFILE%\.aspnet\https\aspnetapp.pfx
dotnet dev-certs https --trust
```

Linux Example
```cli
dotnet dev-certs https --clean
dotnet dev-certs https -ep ${HOME}/.aspnet/https/aspnetapp.pfx
dotnet dev-certs https --trust
```


For other platforms look on [Microsoft documentation.](https://learn.microsoft.com/en-us/aspnet/core/security/docker-https?view=aspnetcore-7.0).

Make sure the paths in config match with generated certs...

Default url: `https://localhost:5001/`

## 👤 Credentials

Login: Admin

Password: Admin

## 🛣 Roadmap
</br>

**API**
- Graphql ✅
- Rest ✅
  
**Protocols**
- MQTT ✅
- OpcUA (InProgress)
- S7Comm
- Socket

**Environment:**
- Electron multiplatform app ✅
- Self-hosted webApp ✅
- Docker ✅

**Features:**
- Multiple servers ✅
- MqttToGraphql ✅
- WebHooks ✅
- Auth / OpenId ✅
- OnSide Documents ✅
- Message intercepting
- Protocol bridge
- Telemetry exporter
- Grafana integration
- Backups, Config export
- Distributed operation
- External DB support

## 📺 Screenshots

<p align="center">
    <img src="./Doc/Screens/monitor_screen.png" alt="Mqtt server monitor page" />
    <img src="./Doc/Screens/server_screen.png" alt="Mqtt server dashboard" />
    <img src="./Doc/Screens/clinet_statistic.png" alt="Mqtt server client stats" />
    <img src="./Doc/Screens/server_auth.png" alt="Mqtt server authentication/authorization" />
    <img src="./Doc/Screens/server_explorer.png" alt="Mqtt explorer" />
    <img src="./Doc/Screens/mqtt_explorer.png" alt="Publish mqtt message from portal" />
    <img src="./Doc/Screens/server_users.png" alt="User managment" />
    <img src="./Doc/Screens/user_profile.png" alt="User profile page" />
    <img src="./Doc/Screens/document_notes.png" alt="Notes view" />
    <img src="./Doc/Screens/edit_note.png" alt="Update Note" />
    <img src="./Doc/Screens/api.png" alt="API options" />      
    <img src="./Doc/Screens/graphql.png" alt="API options" /> 
    <img src="./Doc/Screens/rest.png" alt="API options" />
    <img src="./Doc/Screens/system_scheduler.png" alt="System scheduler" />    
    <img src="./Doc/Screens/Hook_Screen.png" alt="WebHooks" />     
</p>

## Author
- Dalibor Kundrat