# Example Web Application with ExpressJS + Ionic

## Prerequisite
1. Install nodejs. Can be installed from [official nodejs website](https://nodejs.org/en/)
2. Install Ionic. Run `npm install -g ionic cordova`

## Steps

### Setup Backend
1. Go the Github repo that you have downloaded, e.g. `<your/path/to/maxis-nbiot-hackathon>`.
1. The example project can be found on folder `WebApplication/NodeJS`.
2. Go to the root folder of example project.
3. Run command `npm install` to install dependencies.
4. Create a file call .env at root folder of this project and write following content to the file.
    ```c
    AZURE_CONNECTION_STRING=<your azure iot hub connection string>
    ```
5. Finally, run command `npm start` to start the server.

### Setup Frontend
1. At the same folder `WebApplication/NodeJS`, go to folder named `frontend`.
2. Run command `npm install` to install dependencies.
3. Run `ionic serve`. Open browser at `http://localhost:8010` to see the result.
4. Run `ionic build --prod` to build production files, which can be served by express server itself. If server is running, you can browse `http://localhost:3000`
