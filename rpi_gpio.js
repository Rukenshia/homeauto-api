/**
 * @title rpi_gpio.js
 * @overview Implements RPi GPIO Commands
 * @author Jan Christophersen
 * @copyright (c) 2015
 */

var RPiGPIO = module.exports;
var comms = new (require('./communicator.js'))("192.168.178.39", 4200);

function send (command, done) {
  comms.send(command, function (message) {
    done(message);
  });
}

RPiGPIO.Actor = function (name) {
  return {
    state: function (done, opt_state) {
      var command = "actor get " + name;
      if (typeof opt_state !== "undefined") {
        command = "actor set " + name + " " + opt_state;
      }
      send(command, done);
    },
    direction: function (done, opt_dir) {
      var command = "actor get " + name + " direction";
      if (typeof opt_dir !== "undefined") {
        command = "actor set " + name + " direction " + opt_dir;
      }
      send(command, done);
    },
  };
};

RPiGPIO.List = function (done) {
  send("actor list", function(data) {
    try {
      done(JSON.parse(JSON.parse(data).response));
    }
    catch (e) {
      console.log(data);
      done("ERROR_PARSING");
    }
  });
};
