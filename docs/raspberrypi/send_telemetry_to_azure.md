# Send simulated telemetry using Raspberry Pi

We will be using Raspberry Pi to send simulated temperature and humidity telemetry for testing purpose. In this workshop, we will be using **Python** as main language.

## Steps 

1. Check if Python is installed. You can verify the current version of Python on your development machine using one of the following commands:
    
    Python2:
    
    ```
    python --version
    ```
    
    Python3:
    
    ```
    python3 --version
    ```

2. You can download Python by running below commands.

    Python2:

    ```
    sudo apt-get install python
    ```
    
    Python3:

    ```
    sudo apt-get install python3
    ```

3. Download the sample Python project from https://github.com/Azure-Samples/azure-iot-samples-python/archive/master.zip and extract the ZIP archive.

4. Make sure Boost Library is installed.
    
    ```
    sudo apt-get install libboost-python-dev
    ```

5. Navigate to the root folder of the downloaded sample Python project. Then navigate to the **iot-hub\Quickstarts\simulated-device** folder.

6. Open the **SimulatedDevice.py** file in a text editor of your choice.

    Replace the value of the `CONNECTION_STRING` variable with the device connection string you made a note of previously. Then save your changes to **SimulatedDevice.py** file.

7. In the local terminal window, run the following commands to install the required libraries for the simulated device application:

    ```
    sudo pip install azure-iothub-device-client
    ```

7. In the local terminal window, run the following commands to run the simulated device application:

    ```
    sudo python SimulatedDevice.py
    ```

    !!! warning "Troubleshoot"
        **To avoid the import iothub_client error**
        The current version of the Azure IoT SDK for Python is a wrapper over [our C SDK](https://github.com/azure/azure-iot-sdk-c). It is generated using the [Boost](https://www.boost.org/) library. Because of that, it comes with several significant limitations. See more details [here](https://github.com/Azure/azure-iot-sdk-python#important-installation-notes---dealing-with-importerror-issues)

        1. Check that you have the right version of [Python](https://github.com/Azure/azure-iot-sdk-python#important-installation-notes---dealing-with-importerror-issues). Be aware that only certain versions works fine for this sample. 
        2. Check that you have the right version of C++ runtime  [Microsoft Visual C++ Redistributable for Visual Studio 2019](https://support.microsoft.com/en-us/help/2977003/the-latest-supported-visual-c-downloads). (We recommend the latest).
        3. Verify that you have installed the iothub client: 
        ```
        sudo pip install azure-iothub-device-client
        ```