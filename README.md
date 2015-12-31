# RemoteSocketControl
A web based, yet simple controller for 433 MHz remote sockets using an Arduino Uno and a Raspberry Pi

## Prerequisites

You'll need a Raspberry Pi and an Arduino Uno (others should work as well, but currently the code is only tested against a Uno). Of course you will also need a 433 MHz sender (and most likely a receiver).

The Pi has to be connected to a network in some way to access the web application. Furthermore an USB cable is needed to connect the Arduino to the Pi.

## Basics

The 433 MHz sender is connected to the Arduino which itself is connected to the Pi (via the USB serial connection). The Pi runs an MQTT broker and a server which is connected to the broker. The server is subscribed to the socket topics and will send commands to the arduino.
The Pi also runs a webserver which is serving the web application. The web app connects to the broker as well and publishes the commands.
 
In the future I might consider to cut out the Arduino and connect the 433 MHz sender directly to the GPIO pins of the Pi.
 
## Get started

To get started, you'll have to set up the three components. Directions can be found in the corresponding dirs.

1. Set up the Arduino
2. Set up the Pi
3. Set up the web interface on the Pi

## Final words

This project is currently more a proof of a concept rather than a production-ready solution. It has some flaws regarding security, especially since the connections to the broker are currently unencrypted. This has been the first time I used Mosquitto - hopefully I will find the time to get deeper into it and its configuration options in order to use encryption in the future.
A whole different story is the power consumption which is obviously far from optimal...