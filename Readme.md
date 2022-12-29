# Unified Edge

![Backend-Compile](https://github.com/damikun/UnifiedEdge/actions/workflows/Clean-Restore-Compile.yml/badge.svg)
[![Electron](https://github.com/damikun/UnifiedEdge/actions/workflows/Build-Electron-Artefact.yml/badge.svg)](https://github.com/damikun/UnifiedEdge/actions/workflows/Build-Electron-Artefact.yml)

## ✨ Description

Edge Brooker provides server functionality and a future bridge between different industrial protocols. 

(Currently full functional MQTT servers).

## ⚠️ This is early BETA!
- App is in BETA and is not ready for production or ussage
- Many parts will get optimized and changed in time...

## 🧑‍💻 Local run

- Go to folder `/src/Portal/API`
- Run `dotnet watch run` from cmd

##  💾 Installers

Code is not currently signed! 

>The installers can be behind the current app.

[Win64 Installer](https://www.dropbox.com/s/73r18os0vu5tsyv/UnifiedEdge%20Setup%201.0.1.exe?dl=0)

[(Mirror) Win64 Installer](https://ulozto.cz/tamhle/6dYPMRsfZU7M#!ZJD5LmR2ZGp0AQLmMwIvMwEyLJR0Z003IIcgn1ILD2ghM2HlMN==)

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
- Docker deployment

**Features:**
- Multiple servers ✅
- GraphqlToMqtt ✅
- WebHooks ✅
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
    <img src="./Doc/Screens/server_publish_message.png" alt="Publish mqtt message from portal" />
    <img src="./Doc/Screens/server_users.png" alt="User managment" />
    <img src="./Doc/Screens/server_profile.png" alt="User profile page" />
    <img src="./Doc/Screens/api.png" alt="API options" />      
    <img src="./Doc/Screens/graphql.png" alt="API options" /> 
    <img src="./Doc/Screens/rest.png" alt="API options" />
    <img src="./Doc/Screens/system_scheduler.png" alt="System scheduler" />    
    <img src="./Doc/Screens/Hook_Screen.png" alt="WebHooks" />     
</p>

## Author
- Dalibor Kundrat