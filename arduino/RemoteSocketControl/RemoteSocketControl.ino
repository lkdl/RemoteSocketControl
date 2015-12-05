#include <RCSwitch.h>
#include "RemoteSocketControl.h"

// Groups of remote sockets (see header for more info)
Group groups[GROUPS];

RCSwitch rc = RCSwitch();

void setup() {

  // set baud rate for serial port
  Serial.begin(BAUD_RATE);

  // enable transmit on transmit pin
  rc.enableTransmit(TRANSMIT_PIN);
  
  // initialize first group
  groups[0] = (Group) {
      .protocol = 1,
      .pulseLength = 325,
      .repeatTransmits = 10,
      .protocolLength = 28,
      .sockets = {
        { .on = 1, .off = 2},
        { .on = 3,. off = 4},
        { .on = 5, .off = 6},
        { .on = 7, .off = 8}
      }
  };
}

void loop() {

  // wait for serial
  if (Serial.available()){

    // blocking read, wait for a incoming request
    byte inc = Serial.read();

    // parse incoming request according to specificied protocol
    byte group = inc >> 4;
    byte socket = (inc & 0xE) >> 1;
    byte state = inc & 0x1;

    // check if requested group exceeds number of configured groups
    if(group >= GROUPS){
        Serial.write(1);
        return;
    }

    // check if requested socket exceeds number of configured sockets
    if(socket >= SOCKETS_PER_GROUP){
        Serial.write(2);
        return;
    }

    Group gr = groups[group];
    
    // get the command
    unsigned long command = gr.sockets[socket].off;
    if(state == 1){
      command = gr.sockets[socket].on;
    }

    // Configure RCswitch library
    rc.setProtocol(gr.protocol);
    rc.setPulseLength(gr.pulseLength);
    rc.setRepeatTransmit(gr.repeatTransmits);

    // finally send the command
    rc.send(command, gr.protocolLength);

    Serial.write(0);
  }
}
