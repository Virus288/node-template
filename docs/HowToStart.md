# How to start - docs

Last update: 10.01.2025

This file will try to explain, how to start this project by setting up configs.

TLDR;
1. [Configs](#1-configs)

## 1. Configs

This application uses 3 config files:
- devConfig.json
- prodConfig.json
- testConfig.json

DevConfig will be used, if you run your application with NODE_ENV=development. This config should be used while working on this application

ProdConfig will be used, if you run your application with NODE_ENV=production. This should be used in production env

TestConfig will be used, if you run your application on dev servers. This config only differs from production, that in code it will log debug logs and should connect to dev database.

Each config includes few elements:
```json
{
  "myAddress": "http://localhost",
  "corsOrigin": ["http://localhost"]
  "port": 80,
}
```

HttpPort is port, that application will use

MyAddress is address, that will be used to host this application. Make sure to include port, if default won't be used

CorsOrigin is list of website that will use this application. If you do not care about it, set ["*"]

