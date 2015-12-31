#!/usr/bin/python

import paho.mqtt.client as mqtt
import re
import serial

SERIAL_PORT = '/dev/ttyUSB0'

BROKER_HOST = 'localhost'
BROKER_PORT = 1883
USERNAME = 'username'
PASSWORD = 'password'

topicPattern = re.compile('/home/sockets/group(\d+)/socket(\d+)')
ser = serial.Serial(SERIAL_PORT)

def on_connect(client, obj, flags, rc):
    client.subscribe('/home/sockets/#', 0)

def on_message(client, obj, msg):

    m = topicPattern.findall(msg.topic)

    message = str(msg.payload)

    if (m != None and len(m) == 1 and (message == 'ON' or message == 'OFF')):

        group = int(m[0][0])
        socket = int(m[0][1])
        state = 0

        if(message == 'ON'):
            state = 1

        pmsg = group << 4
        pmsg = pmsg | (socket << 1)
        pmsg = pmsg | state

        ser.write(chr(pmsg))
        resp = ser.read(1)

        if(ord(resp[0]) == 0):
            client.publish('/home/socket/response/group'+str(group)+'/socket'+str(socket), 'OK '+message)
        else:
            client.publish('/home/socket/response/group'+str(group)+'/socket'+str(socket), 'ERR '+message+' '+str(ord(resp[0])))

client = mqtt.Client()
client.on_message = on_message
client.on_connect = on_connect
client.username_pw_set(USERNAME, PASSWORD)

client.connect(BROKER_HOST, BROKER_PORT)

client.loop_forever()