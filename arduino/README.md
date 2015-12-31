# Setting up the Arduino

The first step is to set up the Arduino. I'll assume the hardware is already set up properly, i.e. the 433 MHz sender is connected to a GPIO pin of the Arduino.
The `RemoteSocketControl` folder is already an Arduino project which can be opened with the Arduino IDE.

You will have to configure two things in the project, one is trivial, the other one not... ;) First, head to the `Config.h` and change the value of `TRANSMIT_PIN` if necessary. As you might have already guessed, this was the trivial part.
The important configuration is the heart of the project: the configuration of your remote sockets and their control codes.
Open `RemoteSocketControl.ino` and edit the group initialization to fit your needs.
 
Of course you'll have to find out the control codes before by using the 433 MHz receiver and a receiver sketch. The process of determing the control codes is beyond the scope of this project, but there are enough resources available which cover this topic.
 
Once you set everything up you can test the Arduino by opening a serial connection and send commands according to the protocol below.

## Protocol used between the Raspberry and the Arduino

The following, very simple protocol is being used for the communcation between the Arduino and the Raspberry. Each message has the size of a byte (8 bit).

### Request

```
 7 6 5 4 3 2 1 0
+-+-+-+-+-+-+-+-+
| Group | Sk. |O|
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

