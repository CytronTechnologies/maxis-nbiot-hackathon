# Getting Started with Raspberry Pi

In this course, we will be using Raspberry Pi in headless mode (a.k.a no keyboard, mouse or monitor attached to Raspberry Pi). We will use our personal computer to remote access to Raspberry Pi instead. The Raspberry Pi in this workshop has prebuild image which has VNC and SSH capability.

## Getting IP address 
First of all, we will need IP address of Raspberry Pi. Power up your Raspberry Pi with NB-IoT Hat attached. Then access to <website> to get your Raspberry Pi Information by referring IMEI from NB-IoT HAT. 

## VNC
- Download VNC Viewer from [here](https://www.realvnc.com/en/connect/download/viewer/)
- Access to Raspberry Pi using `<yourip>:5901`

## SSH
- Windows
    - Download putty software from [here](https://www.putty.org/).
- Mac OS, Linux
    - Run command `ssh pi@<yourip>` in local terminal.