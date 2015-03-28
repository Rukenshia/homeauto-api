/**
 * @title rpi_gpio.js
 * @overview Implements RPi GPIO Commands
 * @author Jan Christophersen
 * @copyright (c) 2015
 */

var RPiGPIO = module.exports;
var comms = new (require('./communicator.js'))("192.168.178.39", 4200);

function send (command, done) {
  comms.send(JSON.stringify(command), function (message) {
    done(message);
  });
}

RPiGPIO.Actor = function (name) {
  return {
    state: function (done, opt_state) {
      var command = {
        Command: "state",
        EntityName: name,
        Args: (typeof opt_state !== "undefined") ? [opt_state] : []
      };
      send(command, done);
    },
    toggle: function (done) {
      var command = {
        Command: "toggle",
        EntityName: name,
        Args: []
      };
      send(command, done);
    },
    direction: function (done, opt_dir) {
      var command = {
        Command: "direction",
        EntityName: name,
        Args: (typeof opt_dir !== "undefined") ? [opt_dir] : []
      };
      send(command, done);
    },
  };
};

RPiGPIO.List = function (done) {
  send({
    Command: "list",
    EntityName: "",
    Args: []
  }, function(data) {
    done(data);
  });
};
