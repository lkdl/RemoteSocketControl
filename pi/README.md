# Setting up the Pi

## MQTT Broker

The Pi runs the MQTT broker and a webserver. My broker of chose is Mosquitto since it has built-in websocket support (>= 1.4).

It is assumed and strongly advised that you password protect the broker! Furthermore you'll have to enable websocket support with
the following configuration options:


```
listener 8080
protocol websockets

listener 1883
protocol mqtt

```

## Setting up the server

The server is the connection between the Arduino and the broker. It uses the `paho-mqtt` to communicate with the broker and the `pyserial`library for communcation with the Arduino.
Both libraries can be installed via `pip install paho-mqtt` and `pip install pyserial`