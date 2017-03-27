var powerOn = document.getElementById("poweron");
var lpFill = document.getElementById("lpfill");
var hpFill = document.getElementById("hpfill");
var armPod = document.getElementById("armpod");
var shutDown = document.getElementById("shutdown");
var ventState = document.getElementById("ventstate");
var emergencyStop = document.getElementById("emergencystop");
var telemetryData = document.getElementById("telemetrydata");
var flightProfile = document.getElementById("flightprofile");
var podPowered = true

// Basic Button clicking functions
function poweron() {
	console.log('Powering the pod on.');
}
function lpfill() {
	console.log('Pod state = lpfill.');
}
function hpfill() {
	console.log('Pod state = hpfill.');
}
function armpod() {
	console.log('Arming the pod.');
}
function shutdown() {
	console.log('Shutting the pod down.');
}
function ventstate() {
	console.log('Taking user to the ventstate information.');
}
function emergencystop() {
	console.log('Bringing the pod to an emergency stop!');
}
function telemetrydata() {
	console.log('Bringing the user to the telemetry data graphs.')
}
function flightprofile() {
	console.log('Bringing the user to the flight profile data.')
}


// Timer function for each solenoid skate
// Parses JSON data from Python API and changes the badges accordingly
var myTimerIntA = setInterval (myTimerA, 1000);
var solSkateA = 1;

function myTimerA () {
if (solSkateA == 1) {
  $('#solenoidSkateA').text('Open').addClass('label-danger').removeClass('label-success');
} else if (solSkateA == 0) {
  $('#solenoidSkateA').text('Closed').addClass('label-success').removeClass('label-danger');
  } else {
    console.log("Invalid SolenoidSkateA value");
  }
}

var myTimerIntB = setInterval (myTimerB, 1000);
var solSkateB = 1;

function myTimerB () {
if (solSkateB == 1) {
  $('#solenoidSkateB').text('Open').addClass('label-danger').removeClass('label-success');
} else if (solSkateB == 0) {
  $('#solenoidSkateB').text('Closed').addClass('label-success').removeClass('label-danger');
  } else {
  console.log("Invalid SolenoidSkateB value");
  }
}

var myTimerIntC = setInterval (myTimerC, 1000);
var solSkateC = 1;

function myTimerC () {
if (solSkateC == 1) {
  $('#solenoidSkateC').text('Open').addClass('label-danger').removeClass('label-success');
} else if (solSkateC == 0) {
  $('#solenoidSkateC').text('Closed').addClass('label-success').removeClass('label-danger');
  } else {
  console.log("Invalid SolenoidSkateC value");
  }
}

var myTimerIntD = setInterval (myTimerD, 1000);
var solSkateD = 1;

function myTimerD () {
if (solSkateD == 1) {
  $('#solenoidSkateD').text('Open').addClass('label-danger').removeClass('label-success');
} else if (solSkateD == 0) {
  $('#solenoidSkateD').text('Closed').addClass('label-success').removeClass('label-danger');
  } else {
  console.log("Invalid SolenoidSkateD value");
  }
}

var myTimerIntE = setInterval (myTimerE, 1000);
var solSkateE = 1;

function myTimerE () {
if (solSkateE == 1) {
  $('#solenoidSkateE').text('Open').addClass('label-danger').removeClass('label-success');
} else if (solSkateE == 0) {
  $('#solenoidSkateE').text('Closed').addClass('label-success').removeClass('label-danger');
  } else {
  console.log("Invalid SolenoidSkateE value");
  }
}

var myTimerIntF = setInterval (myTimerF, 1000);
var solSkateF = 1;

function myTimerF () {
if (solSkateF == 1) {
  $('#solenoidSkateF').text('Open').addClass('label-danger').removeClass('label-success');
} else if (solSkateF == 0) {
  $('#solenoidSkateF').text('Closed').addClass('label-success').removeClass('label-danger');
  } else {
  console.log("Invalid SolenoidSkateF value");
  }
}
