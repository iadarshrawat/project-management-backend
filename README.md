## URL MONITOR (Backend) 

[![CircleCI](https://img.shields.io/circleci/project/github/contentful/the-example-app.nodejs.svg)](https://circleci.com/gh/contentful/the-example-app.nodejs)

URL Monitor is a backend service that periodically checks the availability of specified HTTPS URLs and provides status reports.

## Features

- Monitors URLs by sending periodic HTTP requests.
- Logs response times and status codes.
- Notifies users if a URL becomes unreachable.

Provides a dashboard for viewing the health of monitored URLs.
The app demonstrates how decoupling content from its presentation enables greater flexibility and facilitates shipping higher quality software more quickly.


## Requirements

* Node 14
* Git
* MongoDB (for storing URL monitoring data)
* Postman (optional, for API testing)


## Common setup

Clone the repo and install the dependencies.

```bash
git clone git@github.com:your-repo/url-monitor.git
cd url-monitor
```

```bash
npm install
```

## Steps for read-only access

To start the express server, run the following

```bash
npm run watch
```

Open [http://localhost:3001](http://localhost:3001) and take a look around.


### `npm run build`

Builds the app for production to the `dist` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!
