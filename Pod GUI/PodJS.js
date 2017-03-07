var powerOn = document.getElementById("poweron");
var lpFill = document.getElementById("lpfill");
var hpFill = document.getElementById("hpfill");
var armPod = document.getElementById("armpod");
var shutDown = document.getElementById("shutdown");
var ventState = document.getElementById("ventstate");
var emergencyStop = document.getElementById("emergencystop");
var telemetryData = document.getElementById("telemetrydata");
var flightProfile = document.getElementById("flightprofile");

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