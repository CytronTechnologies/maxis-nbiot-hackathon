#!/bin/bash

apt-get update
apt-get install ppp -y
cp $(pwd)/grps /etc/chatscripts/
cp $(pwd)/provider /etc/ppp/peers/