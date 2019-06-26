# PPP Installation on Raspberry Pi

## Steps

### 1. Plug the NB-IOT HAT into Raspberry Pi Board using USB

### 2. Run the command below on Raspberry Pi to check availability of HAT. It will show /dev/ttyUSB2 if it exists.
`ls /dev/ttyUSB2`

### 3. Go to directory where you have downloaded the GIT respository. E.g. /home/pi/maxis-nbiot-hackathon
`cd /home/pi/maxis-nbiot-hackathon`

### 4. Run the commands below to install PPP on Raspberry Pi as root. You will need to enter password after command `sudo su`
```
- sudo su
- cd "Raspberry Pi/PPP Installer"
- chmod +x install-ppp.sh
- ./install-ppp.sh
```
### 5. Run command below to start the connection. 
`pon` 

### 6. Run command below to check if interface ppp0 exists.
`ifconfig` 

### 7. If it is successful, you should see IP exists in interface ppp0 from `ifconfig` command.

### 8. Run command below to stop the connection. 
`poff` 

### 9. Automate the connection during Raspberry Pi boot-up.
- Run command `nano /etc/rc.local`
- Insert 2 lines before line `exit 0` in file
```
...
sleep 5
sudo pon &

exit 0
```
- Final script will be similiar as below:
```
#!/bin/sh -e
#
# rc.local
#
# This script is executed at the end of each multiuser runlevel.
# Make sure that the script will "exit 0" on success or any other
# value on error.
#
# In order to enable or disable this script just change the execution
# bits.
#
# By default this script does nothing.

# Print the IP address
_IP=$(hostname -I) || true
if [ "$_IP" ]; then
  printf "My IP address is %s\n" "$_IP"
fi

sleep 5
sudo pon &

exit 0
```

### 10. Reboot Rapsberry Pi for step 9 to take effect.

## References
https://www.rhydolabz.com/wiki/?p=16325