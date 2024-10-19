# Node.js template

This project is simple node.js template built with typescript. Its extremally simple and includes only most necessary prackages to make your work faster. This template uses ESM. Keep this in mind while working with this project. For some reason people do not know what esm is.

Warning!.
This package uses extremally strict eslint, which I modified to my needs. Please take a look and modify it however you like. My style of writing code might not be for you.

TLDR:
0. [Key packages](#0-key-packages)
1. [How to install](#1-how-to-install)
2. [How to build](#2-how-to-build)
3. [Useful information](#3-useful-information)
4. [Docs](#4-docs)

## 0. Key packages

- Express - server
- Chalk - coloring logs
- Helmet - security
- Swagger - docs

## 1. How to start

### Install dependencies

```shell
npm install / yarn
```

### Prepare environment

## 2. How to build

```shell
npm run build / yarn build
```

If you even encounter strange build behavior, tsconfig is set to create build with cache. Set option `incremental` in tsConfig to false

## 3. Useful information

### 3.1 Logs folder

#### Linux

```text
~/.cache/"package.json -> productName"/logs
```

#### Windows

```text
~/AppData/Roaming/"package.json -> productName"/logs
```

### 3.2 Testing

#### All test currently are written using jest. You can run all tests or just type specific tests

#### Available targets

```text
yarn tests:e2e = run 'end to end' tests
yarn tests:db = run 'database' tests
yarn tests:unit = run 'unit' tests
```

### 3.3 Hooks

Instead of adding additional packages like husky, its easier to add hooks manually. If you want your code to check its quality and test itself before committing code, you can add this code to `.git/hooks/pre-commit`
```sh
#!/bin/sh

set -e

echo "Running lint-staged"
npm run lintStaged

echo "Running tsc"
npm run listErrors

echo "Running unit tests"
npm run test:unit

echo "Running db tests"
npm run test:db

echo "Running e2e tests"
npm run test:e2e

echo "Auditing"
npm audit
```

Above code will:
- Lint your staged code
- Validate if it can be built
- Test it
- Audit it

Most of people that I've meet, do not care about auditing their code. If you do not care if packages includes in your app have known vulnerabilities, you can remove last 2 lines from this code. Keep in mind, that github pipelines also run the same commands.

### 3.4 Configs

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
  "port": 5003,
  "myAddress": "http://localhost",
  "corsOrigin": ["http://localhost"]
}
```

Port is port, that application will use

MyAddress is address, that will be used to host this application. Make sure to include port, if default won't be used

CorsOrigin is list of website that will use this application. If you do not care about it, set ["*"]

## 4. Docs

### 4.1 Environments

This application utilizes `NODE_ENV` env, which is set in package.json. `start` command does not include NODE_ENV. This is prepared for docker or any external tools, to manipulate environment.

- Production - prod env. This is the env you want, if you are planning on running production env. This mode disables debug logs.
- Development - development settings. If you are working on this application, thats the mode you want 
- TestDev - custom env, which will utilize another config file. This is prepared for your app to be started on dev/test env in docker/k8s. This mode will use debug logs, unlike production mode
- Test - test env, set while running tests. This env will prevent express router from starting. That way you can run supertest tests, without any interruptions.

### 4.2 Api docs

This project is using swagger docs for api documentation. You can access them by route http://localhost:{port}/docs

Instead of adding json/yaml configs, this template is built on swagger-jsdoc package, which utilizes jsdoc comments. If you prefer to remove comments from compiled code in tsconfig, make sure to rewrite docs to other tool.

### 4.3 Logging

This project utilizes winston for logging. Logging tool is included in `/src/tools`. It provides:

- Log - default logs that you can create.
- Warn - warnings
- Error - errors
- Debug - debug logs, which are disabled if production env is set. More in #4.1

### 4.4 Probes

This application is ready for probing in k8s / other systems. You can find liveness probe in `/src/tools/liveness`. readiness probe should be utilized based on `/health` route. This route will send status 500, if server is dead and status 200 if server is still ok. This status will change from 200 to 500, only if there is a heavy problem with database connection or application is unable to start, due to problems with some services. You can always add customm code, which will modify this state, so k8s will restart your app. K8s configs are not included in this repo.

### 4.5 Connections and access

When I write my apps, I prefer to have some kind of global state, which allows my app to have access to every external connection from any point in code. You can find this "state" in `/src/tools/state`. This state is used to keep external connections and to manage them. For example, instead of dependency injecting each connection to each route, I prefer to just access them from that global state 

