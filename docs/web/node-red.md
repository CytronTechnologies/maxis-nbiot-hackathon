# IoT Web Application using Node Red

## Running Node Red on your Local Machine
1. Node Red requires NodeJS installation. Refer [here](https://nodejs.org/en/) to install latest NodeJS package.

2. In local terminal window, install Node Red.
    
    ```
    npm install node-red --unsafe-perm
    ```

3. Run command `node-red` to start Node Red.

4. If the output shows **Server now running at http://127.0.0.1:1880/**, navigate to 127.0.0.1:1880 in your web browser. You should be able to see Node Red webview.

5. Press `Ctrl+C` in terminal window to close Node Red.

6. (Optional) By default, the Node-RED editor is not secured - anyone who can access its IP address can access the editor and deploy changes. This is only suitable if you are running on a trusted network. See [this](https://nodered.org/docs/user-guide/runtime/securing-node-red) guide to secure your Node-RED application.

## Design your Node Red Application

In this application, we are going to learn to:
- Run an application which reads telemetry of the device using Azure Node Red Library.
- Create a web UI view to display telemetry of the device.
- Send an email when alert is triggered.

### Read Telemetry from Azure IoT Hub
1.  Run command below to install azure-iot-hub module.
    
    ```
    npm install -g node-red-contrib-azure-iot-hub
    ```

2. Start Node Red, and browse to [http://127.0.0.1:1880](http://127.0.0.1:1880)

3. From left pane of the browser window, scroll and search for **Azure IoT Hub Receiver** node under **Cloud** category, then drag it into the center of dashboard.
    
    ![](media/azureiot-hub-receiver-node.png)

4. From the same left pane under **output** category, drag **debug** node to the dashboard. (It will be renamed as msg.payload once it is placed at dashboard)
    
    ![](media/debug.png)

5. Link it to **Azure IoT Hub Receiver** node.
    
    ![](media/azure-hub-receiver+debug.png)

6. Double-click on the Azure IoT Hub Receiver node and enter your Iot Hub connectionString for your Azure IoT Hub and click Done.
    
    ![](media/azureiot-hub-receiver-node.png)

    ![](media/azureiot-hub-receiver-input.png)


7. Click Deploy.
    ![](media/deploy.png)

8. You should see the below messages on your command line from where you are running NodeRED. The Azure IoT Hub Receiver node should now say 'Connected'.
    
    ![](media/azureiot-hub-receiver-cmd_logs.png)

    ![](media/azureiot-hub-receiver-node-connected.png)


9. Once you have messages coming into your Azure IoT Hub, you should see them in the debug pane. The Azure IoT Hub Receiver node should now say 'Received'.
    
    ![](media/azureiot-hub-receiver-node-received.png)
    
    ![](media/azureiot-hub-receiver-output.png)

### Create a Web UI to display device telemetry

We are going to create 2 widgets which show temperature and humidity of the sensor.

### Send an email when alert is triggered

N/A

### Challenges
You can implement other features in this application.

1. Store telemetry of the device to database.
2. Create a web UI which shows the analytics.
3. .. and many more.

You can look into [https://github.com/Azure/node-red-contrib-azure](https://github.com/Azure/node-red-contrib-azure) for more libraries and modules for Azure. It is up to your creativity.
- [Azure Blob Storage](https://github.com/Azure/node-red-contrib-azure/tree/master/blob-storage)

- [Azure CosmosDB (formerly DocumentDB)]("https://github.com/Azure/node-red-contrib-azure/tree/master/documentdb)

- [Azure Event Hub](https://github.com/Azure/node-red-contrib-azure/tree/master/event-hub)

- [Azure IoT Hub](https://github.com/Azure/node-red-contrib-azure/tree/master/iot-hub)

- [Azure SQL](https://github.com/Azure/node-red-contrib-azure/tree/master/sql)

- [Azure Table Storage](https://github.com/Azure/node-red-contrib-azure/tree/master/table-storage)

## Deploy on Microsoft Azure

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

    ```
    $ curl -sL https://deb.nodesource.com/setup_10.x | sudo -E bash -
    $ sudo apt-get install -y nodejs build-essential
    $ sudo npm install -g node-red
    ```

4. At this point you can test your instance by running command below.
    
    ```
    node-red
    ```

    !!! info "Note"
        You may get some errors regarding the Serial node - that’s to be expected and can be ignored.

5. Once started, you can access the editor at `http://<your-instance-ip>:1880/`.

6. To get Node-RED to start automatically whenever your instance is restarted, you can use pm2:

    ```
    sudo npm install -g pm2
    pm2 start `which node-red` -- -v
    pm2 save
    pm2 startup
    ```
    
### References
For more information, please visit [https://nodered.org/docs/getting-started/azure](https://nodered.org/docs/getting-started/azure)
