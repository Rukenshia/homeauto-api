/**
 * @title communicator.js
 * @overview Communication to RPi_GPIO
 * @author Jan Christophersen
 * @copyright (c) 2015
 */

 var dgram = require('dgram');

function Communicator (address, port) {
  this.address = address;
  this.port = port;

  return this;
}

Communicator.prototype.send = function (message, done) {
  var buf = new Buffer (message);
  var socket = dgram.createSocket('udp4');
  socket.send(buf, 0, buf.length, this.port, this.address, function (err) {
    if (err) {
      socket.close();
      throw err;
    }
  });

  socket.on('message', function (message) {
    done(message.toString());
    socket.close();
  });
};


module.exports = Communicator;
