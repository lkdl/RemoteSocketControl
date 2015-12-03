# RemoteSocketControl
A web based, yet simple controller for 433 MHz remote sockets using an Arduino Uno and a Raspberry Pi

## Protocol used between the Raspberry and the Arduino

The following, very simple protocol is being used for the communcation between the Arduino and the Raspberry. Each message has the size of a byte (8 bit):
```
 0 1 2 3 4 5 6 7  
+-+-+-+-+-+-+-+-+
|O| Sk. | Group |
+-+-+-+-+-+-+-+-+
```

The first bit (O) (LSB) represents the desired state, `0` meaning off and `1` on. The next three bits (Sk.) are the number of switch in its group (usually 0-3).
The remaining 4 bits represent the group. Sockets are typically organized in groups of four, meaning with one remote control you are able to control four remote sockets at the same time.
Therefore sockets in a group share the same options for the transmitter which can be set groupwise during initialization.

Please note that groups are only a way to organize the sockets and their option in this program, the group has nothing to do with the actual protocol the sockets use (except for the point mentioned above).
