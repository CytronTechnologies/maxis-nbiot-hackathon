#!/bin/sh

while true; do

        ping -I ppp0 -c 1 8.8.8.8 -s 0

        if [ $? -eq 0 ]; then
                echo "Connection up, reconnect not required..."
        else
                echo "Connection down, reconnecting..."
                sudo pon
                sudo ifconfig wwan0 down
        fi

        sleep 10
done