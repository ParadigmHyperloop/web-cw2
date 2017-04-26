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

// Onclick functions for buttons on the NavBar.
function poweron() {
	console.log('Powering the pod on.');
}

function lpvent() {
  lp_vent = {"command": "vent"};
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/posts",
            data: lp_vent,
            type: 'POST',
            success: function(response) {
              console.log(response);
            },
            error: function(error) {
                console.log("error func");
            }
        });
  console.log('Current pod state = LPVENT.')
}

function hpfill() {
  hp_fill = {"command": "fill"};
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/posts",
            data: hp_fill,
            type: 'POST',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
  console.log('Current pod state = HP FILL.')
}

function armpod() {
  arm = {"command": "arm"};
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/posts",
            data: arm,
            type: 'POST',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
  console.log('Arming the pod.')
}

function shutdown() {
	console.log('Shutting the pod down.');
}

function ventstate() {
	console.log('Taking user to the ventstate information.');
}

function emergencystop() {
  e_stop = {"command": "e"};
        $.ajax({
            url: "https://jsonplaceholder.typicode.com/posts",
            data: e_stop,
            type: 'POST',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
 console.log('Bringing the pod to an emergency stop.')
};

function telemetrydata() {
	console.log('Bringing the user to the telemetry data graphs.')
}
function flightprofile() {
	console.log('Bringing the user to the flight profile data.')
}

// Gets PodState JSON Blob and parses its data into variables.
// Variables are accessed in the below functions to update the GUI.
setInterval (updatePodState, 1000);
var podState; 
function updatePodState () {
  $.ajax({
            url: "0.0.0.0:7778/pod_State", // https://jsonplaceholder.typicode.com/posts
            type: 'GET',
            success: function(response) {
                console.log(response);
                podState = JSON.parse(response);

                var solSkateA = podState.SOL_SKATE_0;

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

                var solSkateB = podState.SOL_SKATE_0;

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

                var solSkateC = podState.SOL_SKATE_1;

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

                var solSkateD = podState.SOL_SKATE_1;

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

                var solSkateE = podState.SOL_SKATE_2;

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

                var solSkateF = podState.SOL_SKATE_2;

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
            },
            error: function(error) {
                console.log(error);
            }
        });
}

/*
setInterval (tester, 1000);
var nameObj;
var age;
function tester() {
  window.nameObj = JSON.parse('{ "name":"John", "age":30, "city":"New York"}');
  window.age = nameObj.age;
  console.log(age);
}
*/
