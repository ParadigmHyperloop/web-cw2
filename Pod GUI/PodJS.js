var powerOn = document.getElementById("poweron");
var lpFill = document.getElementById("lpfill");
var hpFill = document.getElementById("hpfill");
var armPod = document.getElementById("armpod");
var shutDown = document.getElementById("shutdown");
var ventState = document.getElementById("ventstate");
var emergencyStop = document.getElementById("emergencystop");
var telemetryData = document.getElementById("telemetrydata");
var flightProfile = document.getElementById("flightprofile");

// Onclick functions for buttons on the NavBar.
function lpvent() {
        $.ajax({
            url: "0.0.0.0:7777/command/lp_vent",
            type: 'POST',
            success: function(response) {
              console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
  console.log('Current pod state = LPVENT.')
}

function hpfill() {
        $.ajax({
            url: "0.0.0.0:7777/command/hp_fill", 
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
        $.ajax({
            url: "0.0.0.0:7777/command/arm",
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

// Shutdown command needs implementation and big red button. 
function shutdown() {
        $.ajax({
            url: "0.0.0.0:7777/command/shutdown", 
            type: 'POST',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
	console.log('Shutting the pod down.');
}

// Calibration command goes here (calibrate) zeros out IMU and nav data.
function calibrate() {
        $.ajax({
            url: "0.0.0.0:7777/command/calibrate",
            type: 'POST',
            success: function(response) {
                console.log(response);
            },
            error: function(error) {
                console.log(error);
            }
        });
  console.log('Calibrating Pod. Zeroing out IMU and nav data.')
}

function emergencystop() {
        $.ajax({
            url: "0.0.0.0:7777/command/e",
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

function ventstate() {
  console.log('Taking user to the ventstate information.');
}

// Gets PodState JSON Blob and parses its data into variables.
// Variables are accessed in the below functions to update the GUI.
setInterval (updatePodState, 10000);
var podState; 
function updatePodState () {
  $.ajax({
            url: "0.0.0.0:7777/pod_State", // https://jsonplaceholder.typicode.com/posts
            type: 'GET',
            success: function(response) {
                console.log(response);
                podState = JSON.parse(response);

                var solSkateA = podState.SOL_SKATE_0;

                function SkateA_Update () {
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

                function SkateB_Update () {
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

                function SkateC_Update () {
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

                function SkateD_Update () {
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

                function SkateE_Update () {
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

                function SkateF_Update () {
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

                function Brake1_Update () {
                  if (solBrake1 == 1){
                    $('#solenoidBrake1-1').text('Open').addClass('label-danger').removeClass('label-success');  
                  } else if (solBrake1 == 0) {
                    $('#solenoidBrake1-1').text('Closed').addClass('label-success').removeClass('label-danger');
                  } else {
                    console.log("Invalid solenoidBrake1 value")
                  }
                }

                var solBrake2 = 1;

                function Brake2_Update () {
                  if (solBrake2 == 1){
                    $('#solenoidBrake2-1').text('Open').addClass('label-danger').removeClass('label-success');
                  } else if (solBrake2 == 0) {
                    $('#solenoidBrake2-1').text('Closed').addClass('label-success').removeClass('label-danger');
                  } else {
                    console.log("Invalid solenoidBrake2 value")
                  }
                }

                var pressureTransducer = podState.hp_pressure

                function psiTransducer_Update () {
                  $('#psiTransducer').text(pressureTransducer);
                }

                var stripeCount = podState.stripe_count

                function stripeCountUpdate () {
                  $('stripeCount').text(stripeCount);
                }

                var approxDistance = stripeCount * 100

                function approxDistanceUpdate () {
                  $('approxDist').text(approxDistance);
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
}

