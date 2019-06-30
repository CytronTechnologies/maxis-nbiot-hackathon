# Example Web Application with ExpressJS + Ionic

## Prerequisite:
1. Install nodejs. Can be installed from [official nodejs website](https://nodejs.org/en/)
2. Install Ionic. Run `npm install -g ionic`

## Steps:

### Server
1. The example project can be found on `<downloaded GIT repo>/WebApplication/NodeJS`.
2. Go to the root folder of example project.
3. Run command `npm install` to install dependencies.
4. Finally, run command `npm start` to start the server.

### Frontend
1. At root folder of project, go to folder named `frontend`.
2. Run command `npm install` to install dependencies.
3. Run `ionic serve`. Open browser at `http://localhost:8010` to see the result.
4. Run `ionic build --prod` to build production files, which can be served at root directory of server, e.g. `/var/www/html/`.