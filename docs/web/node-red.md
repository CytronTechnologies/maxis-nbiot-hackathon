# IoT Web Application using Node Red

## Running Node Red on local
1. Node Red requires NodeJS installation. Refer [here](https://nodejs.org/en/) to install latest NodeJS package.

2. In local terminal window, install Node Red.
    ```c
    npm install node-red --unsafe-perm
    ```
3. Run command `node-red` to start Node Red.

4. If the output shows **Server now running at http://127.0.0.1:1880/**, navigate to 127.0.0.1:1880 in your web browser. You should be able to see Node Red webview.

5. Press `Ctrl+C` in terminal window to close Node Red.

## Design your Node Red Application

In this application, we are going to learn to:
- Run an application which reads telemetry of the device using Azure Node Red Library.
- Send an email when alert is triggered.
- Create a web UI view to display telemetry of the device.

### Backend
1.  Run command below to install azure-iot-hub module.
    ```c
    npm install -g node-red-contrib-azure-iot-hub
    ```
2. Start Node Red, usually: http://127.0.0.1:1880

3.

### Frontend
1.
2.
3.

### Challenges

1. Store telemetry of the device to database.
2. Create a web UI which shows the analytics.

## Running on Microsoft Azure

### Create base image

1. Log in to the [Azure console](https://portal.azure.com/)

2. Select **Virtual Machines** option under Favourite List.

3. In the list of Virtual Machines, select Ubuntu Server, then click ‘Create’

4. Give your machine a name, the username you want to use and the authentication details you want to use to access the instance

4. Choose the Size of your instance. Remember that node.js is single-threaded so there’s no benefit to picking a size with multiple cores for a simple node-red instance. A1 Basic is a good starting point

5. On the ‘Settings’ step, click on the ‘Network security group’ option. Add a new ‘Inbound rule’ with the options set as:
    ```c
    - Name: node-red-editor
    - Priority: 1010
    - Protocol: TCP
    - Destination port range: 1880
    ```
6. Click ‘Ok’ on the Settings page, check the Summary then click ‘Ok’ to deploy the new instance

After a couple of minutes your instance will be running. In the console you can find your instance’s IP address.

### Setup Node Red

1. The next task is to log into the instance then install node.js and Node-RED.

2. Log into your instance using the authentication details you specified in the previous stage.

3. Once logged in you need to install node.js and Node-RED.

    ```c
    curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
    sudo apt-get install -y nodejs build-essential
    sudo npm install -g node-red
    ```

4. At this point you can test your instance by running command below.
    ```c
    node-red
    ```

    > Note: you may get some errors regarding the Serial node - that’s to be expected and can be ignored.

5. Once started, you can access the editor at `http://<your-instance-ip>:1880/`.

6. To get Node-RED to start automatically whenever your instance is restarted, you can use pm2:

    ```c
    sudo npm install -g pm2
    pm2 start `which node-red` -- -v
    pm2 save
    pm2 startup
    ```

> For more information, please visit [https://nodered.org/docs/getting-started/azure](https://nodered.org/docs/getting-started/azure)
