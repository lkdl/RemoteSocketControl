/*
 * Represents a single remote socket.
 * For each remote socket exists a command to turn it on 
 * and off respectively.
 */
struct Socket{

  // Command to the turn the socket on
  int on;

  // Command to turn the socket off
  int off;
};

/*
 * Represents a group consisting of four remote sockets.
 * Sockets in a group usually share one remote control and
 * therefore share the same configuration options for the 
 * transmitter.
 */
struct Group{
  
  // Protocol type which should be used for this group (
  int protocol;
  
  // Length of the pulse in microseconds
  int pulseLength;
  
  // Number of transmit repeats 
  int repeatTransmits;
  
  // Length of the protocol in bits
  int protocolLength;
  
  // Sockets of the group
  Socket sockets[4];
};
