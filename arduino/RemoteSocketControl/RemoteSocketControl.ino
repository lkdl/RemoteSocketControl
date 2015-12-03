#include "RemoteSocketControl.h"

// Groups of remote sockets (see header for more info)
Group groups[1];

void setup() {

  // set baud rate for serial port
  Serial.begin(9600);


  // initialize first group
  groups[0] = (Group) {
      .protocol = 1,
      .pulseLength = 320,
      .repeatTransmits = 1,
      .protocolLength = 24,
      .sockets = {
        { .on = 1, .off = 5},
        { .on = 2,. off = 6},
        { .on = 3, .off = 7},
        { .on = 4, .off = 8}
      }
  }; 
}

void loop() {

  // wait for serial
  if (Serial.available()){

    // blocking read, wait for a incoming request
    long inc = Serial.parseInt();

    // parse incoming request according to specificied protocol
    byte group = (inc & 0xFF0000) >> 16;
    byte socket = (inc & 0xFF00) >> 8;
    byte state = inc & 0xFF;

    // get the command
    int command = groups[group].sockets[socket].off;
    if(state == 1){
      command = groups[group].sockets[socket].on;
    }

    // debug output
    Serial.print("Command to be sent: ");
    Serial.println(command, DEC);
  }
}
