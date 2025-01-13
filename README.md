# Node.js template

This project is a simple node.js template built with typescript. Its extremally simple and includes only the most necessary packages to make your work faster. This template uses ESM. Keep this in mind while working on this project. For some reason, people do not know what esm is.

> [!WARNING].
> This package uses extremely strict eslint, which I modified to my needs. Please take a look and modify it however you like. My style of writing code might not be for you.

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

- Install dependencies

```bash
npm install / yarn
```

- start 

```bash
npm run start:dev / yarn start:dev
```

Above scripts will let you start this application. You can find more detailed guide in `/docs/HowToStart.md`

## 2. How to build

```bash
npm run build / yarn build
```

> [!IMPORTANT]
> If you even encounter strange build behavior, tsconfig is set to create build with cache. Set option `incremental` in tsConfig to false

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
```bash
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

echo "Checking package version"
if ! git diff --cached --name-only | grep -q 'package.json'; then
    echo "Package.json is not in the staged changes. Make sure to update version in package.json to mir
ror applied changes."
    exit 1
fi

if git diff --cached --name-only | grep -q 'package.json'; then
    if ! git diff --cached -- package.json | grep -q '"version"'; then
        echo "Package.json has been modified but version has not been updated. Make sure to update vers
ion in package.json to mirror applied changes."
        exit 1

    fi
fi
```

Above code will:
- Lint your staged code
- Validate if it can be built
- Test it
- Audit it
- Check if you updated version in package.json

Most of people that I've meet, do not care about auditing their code. If you do not care if packages includes in your app have known vulnerabilities, you can remove last 2 lines from this code. Keep in mind, that github pipelines also run the same commands.

Updating version in package.json is subject to change. The amount of developers == the amount of ways t o use versioning system. If you don't feel like updating version in package.json, remove last 2 commands

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

MyAddress is address, that will be used to host this application.

CorsOrigin is list of website that will use this application. If you do not care about it, set ["*"]

## 4. Docs

### 4.1 Environments

This application utilizes `NODE_ENV` env, which is set in package.json. `start` command does not include NODE_ENV. This is prepared for docker or any external tools, to manipulate environment.

- Production - prod env. This is the env you want, if you are planning on running production env. This mode disables debug logs.
- Development - development settings. If you are working on this application, thats the mode you want 
- TestDev - custom env, which will utilize another config file. This is prepared for your app to be started on dev/test env in docker/k8s. This mode will use debug logs, unlike production mode
- Test - test env, set while running tests. This env will prevent express router from starting. That way you can run supertest tests, without any interruptions.

### 4.2 Api docs

This project is using swagger docs for api documentation. You can access them by route [http://localhost:{port}/docs](http://localhost:8080/docs)

Instead of adding json/yaml configs, this template is built on swagger-jsdoc package, which utilizes jsdoc comments. If you prefer to remove comments from compiled code in tsconfig, make sure to rewrite docs to other tool.

### 4.3 Logging

This project utilizes winston for logging. Logging tool is my custom package, which I host on github ( I assume, I should deploy it on npm some day... ). It provides:

- Log - default logs that you can create.
- Warn - warnings
- Error - errors
- Debug - debug logs, which are disabled if production env is set. More in #4.1

### 4.4 Probes

This application is ready for probing in k8s / other systems. You can find liveness probe in `/src/tools/liveness`. readiness probe should be utilized based on `/health` route. This route will send status 500, if server is dead and status 200 if server is still ok. This status will change from 200 to 500, only if there is a heavy problem with database connection or application is unable to start, due to problems with some services. You can always add customm code, which will modify this state, so k8s will restart your app. K8s configs are not included in this repo.

### 4.5 Connections and access

When I write my apps, I prefer to have some kind of global state, which allows my app to have access to every external connection from any point in code. You can find this "state" in `/src/tools/state`. This state is used to keep external connections and to manage them. For example, instead of dependency injecting each connection to each route, I prefer to just access them from that global state 

### 4.6 Sigterm, Sigint

This application uses handlers for sigint and sigterm. What are those ? Application is listening for "kill process" system received by operating system or user. In short term, its listening for `ctr + c` and makes sure to close all connections after it dies. 

### 4.7 Tests

This application has multiple tests written in jest. 

[How to write good tests](./docs/WriteGoodTests.md)

### 4.8 Additional docs

[Dataflow in application](./docs/diagrams/dataflow.md)
[Pipelines](./docs/Pipelines.md)

Additional docs can be found in `docs` folder 

## 5. Style

This application uses my personal eslint settings. They are EXTREMELY strict and will force you to write specific type of code with unified style across whole project. This is `MY` config. You may not like it so please, modify it to your heart desire.

## 6. Issues 

> [!TIP]
> This category will try to explain basic issues, that you might encounter with this app. This will not include every possible issues, that was created on github, rather basic problems, that you might not expect

- `Start:dev` throws `Cannot find module`

There are 3 reason, why this might happen.

> [!NOTE]
> You started this app for the first time

1. Due to limitations with libraries, this command will throw an error, if you run it first time. Simply rerun it.

> [!NOTE]
> You've been working on this app for a while

2. Something got cached in the background, after you've been working on this app for a while. This can happen, but its rare. There is a note related to it in tip under point #2. All you need to do is to remove cache. If your terminal supports make ( linux, macos, windows bash terminal and others ), simply run:

```bash
make clean
```

If you are unable to run make command, remove build folder

3. There is an error with imported code. Because this app is written in ESM, it might crash if imported ts file does not have `file.js` ( .js ) extension. This is a limitation of ESM and you might not get any errors. There should be error related to it in log files, because logger catches most of issues. If you won't find any related info in logs folder ( explained in #3.1 ) and you won't be able to fix it, please create an issue for it on github.
