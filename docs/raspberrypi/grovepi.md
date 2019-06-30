# Grove Pi with Raspberry Pi

This course explains how to use Grove Pi HAT with Rasbperry Pi to interface, control and get data from sensors. 

The GrovePi can be programmed in **Python**, **C**, **C#**, **Go**, and **NodeJS** on the Raspberry Pi. We will be using **Python** as main language for the course.


## Install Grove Pi Python
```c
$ sudo curl -kL dexterindustries.com/update_grovepi | bash
$ sudo pip install grovepi
$ sudo reboot
```

## Getting started with Example DHT Temperature & Humidity Sensor

Sounds familiar? Temperature and humidity are the values that are being sent to Azure Cloud if you are following previous course. 
Right now we can send those values from actual hardware DHT11 Temperature & Humidity Sensor.

### Steps

1. Plug the Grove Pi HAT onto Raspberry Pi.
2. Plug the DHT11 Sensor (Blue color) to port D4 on GrovePi.
3. Create a python script called dht.py.
4. Copy the following content into dht.py.
    ```python
    #!/usr/bin/env python

    import grovepi
    import math
    # Connect the Grove Temperature & Humidity Sensor Pro to digital port D4
    # This example uses the blue colored sensor.
    # SIG,NC,VCC,GND
    sensor = 4  # The Sensor goes on digital port 4.

    # temp_humidity_sensor_type
    # Grove Base Kit comes with the blue sensor.
    blue = 0    # The Blue colored sensor.
    white = 1   # The White colored sensor.

    while True:
        try:
            # This example uses the blue colored sensor. 
            # The first parameter is the port, the second parameter is the type of sensor.
            [temp,humidity] = grovepi.dht(sensor,blue)  
            if math.isnan(temp) == False and math.isnan(humidity) == False:
                print("temp = %.02f C humidity =%.02f%%"%(temp, humidity))

        except IOError:
            print ("Error")
    ```

5. Run command `python dht.py` to run the program.
6. If the setup is correct, we will see temperature and humidity values are showing up.

> For more examples, you can visit [https://github.com/DexterInd/GrovePi/tree/master/Software/Python](https://github.com/DexterInd/GrovePi/tree/master/Software/Python)

> For other programming language, you can refer to here [https://github.com/DexterInd/GrovePi/tree/master/Software](https://github.com/DexterInd/GrovePi/tree/master/Software)

