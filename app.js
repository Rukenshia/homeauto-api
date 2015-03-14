/**
 * @title app.js
 * @overview Main Application File
 * @author Jan Christophersen
 * @copyright (c) 2015
 */

var http = require("http");

// Custom modules
var RPi = require("./rpi_gpio.js");

http.createServer(function(request,response){

	var fn = requestToCommand(request.url);

	response.writeHeader(200, {"Content-Type": "text/html"});

	if (!fn) {
		response.write("Command: " + request.url + "<br />Invalid");
		response.end();
	}
	else {
		fn(function (data) {
			response.write("Command: " + request.url + "<br />Return Data: " + data);
			response.end();
		});
	}
}).listen(8080);

function requestToCommand (requestPath) {
	if (requestPath.indexOf('favicon') > -1)
		return undefined;

	var args = requestPath.split("/");
	args.splice(0,1);

	if (args.length === 0) {
		return undefined;
	}

	var actor = args[0];
	args.splice(0,1);

	if (args.length === 0) {
		return undefined;
	}

	var cmd = args[0];
	args.splice(0, 1);

	var fn;
	switch (cmd) {
		case "state":
			fn = function (done) {
				RPi.Actor(actor).state(function (retn) {
					done(retn);
				}, args[0]);
			};
		break;
		case "direction":
			fn = function (done) {
				RPi.Actor(actor).state(function (retn) {
					done(retn);
				}, args[0]);
			};
		break;
	}

	return fn;
}
