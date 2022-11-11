# Unified Edge

![Backend-Compile](https://github.com/damikun/UnifiedEdge/actions/workflows/Clean-Restore-Compile.yml/badge.svg)
[![Electron](https://github.com/damikun/UnifiedEdge/actions/workflows/Build-Electron-Artefact.yml/badge.svg)](https://github.com/damikun/UnifiedEdge/actions/workflows/Build-Electron-Artefact.yml)

## This is early BETA!
- App is in BETA with known bugs and is not ready for production or ussage
- Many parts will get optimized and changed in time...
- Online to validate build process and pipeline

## Local run

- Go to folder `/src/Portal/API`
- Run `dotnet watch run` from cmd

## Installers
Code is not currently signed!

[Win64 Installer](https://www.dropbox.com/s/73r18os0vu5tsyv/UnifiedEdge%20Setup%201.0.1.exe?dl=0)
[Mirror Win64 Installer](https://ulozto.cz/file/dtetZ3cpNWr5/unifiededge-setup-1-0-1-exe#!ZGVlZmR2ATWvAwVmATVmZGtmMJV3BQIlI05YqTkMAR5dBQx0AD==)

## Credentials

Login: Admin
Password: Admin
## Description

Edge Brooker allows you to communicate using different protocols with field devices and bridge between them...

**API**
- Graphql
- Rest
  
**Protocols**
- MQTT (Currently)
- OpcUA (InProgress)
- S7Comm (Planned)

**Environment:**
- Electron multiplatform app
- Self-hosted webApp


**Screens:**
![Monitor screen](./Doc/Readme/Monitor_Screen.png)
![Mqtt Server Screen](./Doc/Readme/Server_Screen.png)
![WebHook Screen](./Doc/Readme/Hook_Screen.png)
![Users Screen](./Doc/Readme/User_Screen.png)
![User Profile Screen](./Doc/Readme/Profile_Screen.png)