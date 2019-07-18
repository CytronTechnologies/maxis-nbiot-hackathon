import serial, sys
from time import sleep
from micropyGPS import MicropyGPS

try:
    sys.stdout.write('Started gps reader\n')
    reader = MicropyGPS()
    while True:
        try:
            with serial.Serial('/dev/ttyUSB1', 115200, timeout=5, rtscts=True, dsrdtr=True) as ser:
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
    sys.stderr.write('Ctrl-C pressed, exiting gps reader\n')
