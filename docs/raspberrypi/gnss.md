# Global Navigation Satellite Systems (GNSS)

Example Python application to extract GNSS data from NB-IoT HAT

## Prerequisite
Install Python Library **micropyGPS**

Python2:

```
sudo pip install git+https://github.com/inmcm/micropyGPS.git
```

Python3:

```
sudo pip3 install git+https://github.com/inmcm/micropyGPS.git
```

## Python Example Code

``` python
import serial, sys
from time import sleep
from micropyGPS import MicropyGPS

NMEA_PORT='/dev/ttyUSB1'
AT_PORT='/dev/ttyUSB2'

def initGNSS():
    sys.stdout.write('Init GNSS\n')
    with serial.Serial(AT_PORT, 115200, timeout=5, rtscts=True, dsrdtr=True) as ser:
        ser.write("AT+CGNSCFG=1\r\n".encode())
        sleep(1)
        ser.write("AT+CGNSPWR=1\r\n".encode())
        sleep(1)

try:
    sys.stdout.write('Started GNSS reader\n')
    reader = MicropyGPS()
    initGNSS()
    while True:
        try:
            with serial.Serial(NMEA_PORT, 115200, timeout=5, rtscts=True, dsrdtr=True) as ser:
                for i in range(10):
                    # ignore these sentences
                    ser.readline()
                # try to parse this line (will throw an exception if input is not valid NMEA)
                data = ser.readline().decode()
                for x in data:
                    reader.update(x)
                print("UTC_Time={}, lat={}, lng={}".format(reader.timestamp, reader.latitude_string(), reader.longitude_string()))
        except Exception as e:
            print("Error: {}".format(str(e)))
            sleep(1)
except KeyboardInterrupt:
    sys.stderr.write('Ctrl-C pressed, exiting GNSS reader\n')

        
```