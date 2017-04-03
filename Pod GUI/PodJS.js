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
var myTimerIntA = setInterval (mySkateTimerA, 1000);
var solSkateA = 1;

function mySkateTimerA () {
if (solSkateA == 1) {
  $('#solenoidSkateA1').text('Open').addClass('label-danger').removeClass('label-success');
} else if (solSkateA == 0) {
  $('#solenoidSkateA1').text('Closed').addClass('label-success').removeClass('label-danger');
  } else {
    console.log("Invalid SolenoidSkateA value");
  }
  $('#solenoidSkateA2').text('current val here');
}

var myTimerIntB = setInterval (mySkateTimerB, 1000);
var solSkateB = 1;

function mySkateTimerB () {
if (solSkateB == 1) {
  $('#solenoidSkateB1').text('Open').addClass('label-danger').removeClass('label-success');
} else if (solSkateB == 0) {
  $('#solenoidSkateB1').text('Closed').addClass('label-success').removeClass('label-danger');
  } else {
  console.log("Invalid SolenoidSkateB value");
  }
  $('#solenoidSkateB2').text('current val here');
}

var myTimerIntC = setInterval (mySkateTimerC, 1000);
var solSkateC = 1;

function mySkateTimerC () {
if (solSkateC == 1) {
  $('#solenoidSkateC1').text('Open').addClass('label-danger').removeClass('label-success');
} else if (solSkateC == 0) {
  $('#solenoidSkateC1').text('Closed').addClass('label-success').removeClass('label-danger');
  } else {
  console.log("Invalid SolenoidSkateC value");
  }
  $('#solenoidSkateC2').text('current val here');
}

var myTimerIntD = setInterval (mySkateTimerD, 1000);
var solSkateD = 1;

function mySkateTimerD () {
if (solSkateD == 1) {
  $('#solenoidSkateD1').text('Open').addClass('label-danger').removeClass('label-success');
} else if (solSkateD == 0) {
  $('#solenoidSkateD1').text('Closed').addClass('label-success').removeClass('label-danger');
  } else {
  console.log("Invalid SolenoidSkateD value");
  }
  $('#solenoidSkateD2').text('current val here');
}

var myTimerIntE = setInterval (mySkateTimerE, 1000);
var solSkateE = 1;

function mySkateTimerE () {
if (solSkateE == 1) {
  $('#solenoidSkateE1').text('Open').addClass('label-danger').removeClass('label-success');
} else if (solSkateE == 0) {
  $('#solenoidSkateE1').text('Closed').addClass('label-success').removeClass('label-danger');
  } else {
  console.log("Invalid SolenoidSkateE value");
  }
  $('#solenoidSkateE2').text('current val here');
}

var myTimerIntF = setInterval (mySkateTimerF, 1000);
var solSkateF = 1;

function mySkateTimerF () {
if (solSkateF == 1) {
  $('#solenoidSkateF1').text('Open').addClass('label-danger').removeClass('label-success');
} else if (solSkateF == 0) {
  $('#solenoidSkateF1').text('Closed').addClass('label-success').removeClass('label-danger');
  } else {
  console.log("Invalid SolenoidSkateF value");
  }
  $('#solenoidSkateF2').text('current val here');
}

var myTimerIntBrake1 = setInterval(myBrakeTimer1, 1000);
var solBrake1 = 1;

function myBrakeTimer1 () {
  if (solBrake1 == 1){
    $('#solenoidBrake1-1').text('Open').addClass('label-danger').removeClass('label-success');  
  } else if (solBrake1 == 0) {
    $('#solenoidBrake1-1').text('Closed').addClass('label-success').removeClass('label-danger');
  } else {
    console.log("Invalid solenoidBrake1 value")
  }
}

var myTimerIntBrake2 = setInterval(myBrakeTimer2, 1000);
var solBrake2 = 1;

function myBrakeTimer2 () {
  if (solBrake2 == 1){
    $('#solenoidBrake2-1').text('Open').addClass('label-danger').removeClass('label-success');
  } else if (solBrake1 == 0) {
    $('#solenoidBrake2-1').text('Closed').addClass('label-success').removeClass('label-danger');
  } else {
    console.log("Invalid solenoidBrake2 value")
  }
}
