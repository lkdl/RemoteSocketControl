# RemoteSocketControl
A web based, yet simple controller for 433 MHz remote sockets using an Arduino Uno and a Raspberry Pi

## Prerequisites

You'll need a Raspberry Pi and an Arduino Uno (others should work as well, but currently the code is only tested against a Uno). Of course you will also need a 433 MHz sender (and most likely a receiver).

## Protocol used between the Raspberry and the Arduino

The following, very simple protocol is being used for the communcation between the Arduino and the Raspberry. Each message has the size of a byte (8 bit).

### Request

```
 0 1 2 3 4 5 6 7  
+-+-+-+-+-+-+-+-+
|O| Sk. | Group |
+-+-+-+-+-+-+-+-+
```

The first bit (O) (LSB) represents the desired state, `0` meaning off and `1` on. The next three bits (Sk.) are the number of socket in its group (usually 0-3).
The remaining 4 bits represent the group. Sockets are typically organized in groups of four, meaning with one remote control you are able to control four remote sockets at the same time.
Therefore sockets in a group share the same options for the transmitter which can be set groupwise during initialization.

Please note that groups are only a way to organize the sockets and their option in this program, the group has nothing to do with the actual protocol the sockets use (except for the point mentioned above).

### Responses

The common rule of thumb "zero means success, everything else indiciates a failure" applies here.

__Attention:__ A zero response does not mean that the socket has been set to the desired state (there is no easy way to determine this), it just means that the arduino has send the command sequence to its output pin. Everything else is not in control of this program.

The error messages in detail:
* __1:__ Invalid group: Request group is not configured (exceeds specified group size)
* __2:__ Invalid socket: Socket is not configured (exceeds specified sockets)
