var powerOn = document.getElementById("poweron");
var lpFill = document.getElementById("lpfill");
var hpFill = document.getElementById("hpfill");
var armPod = document.getElementById("armpod");
var shutDown = document.getElementById("shutdown");
var ventState = document.getElementById("ventstate");
var emergencyStop = document.getElementById("emergencystop");
var telemetryData = document.getElementById("telemetrydata");
var flightProfile = document.getElementById("flightprofile");

var CONFIG = {
  host: "127.0.0.1",
  port: 7777,
  proto: "http"
}

STATES = {
  0 : { name: 'POST', color: 'default' },
  1 : { name: 'Boot', color: 'default' },
  2 : { name: 'LP Fill', color: 'primary' },
  3 : { name: 'HPFILL', color: 'primary' },
  4 : { name: 'LOAD', color: 'primary' },
  5 : { name: 'STANDBY', color: 'default' },
  6 : { name: 'ARMED', color: 'warning' },
  7 : { name: 'PUSHING', color: 'warning' },
  8 : { name: 'COASTING', color: 'warning' },
  9 : { name: 'BRAKING', color: 'warning' },
  10 : { name: 'VENT', color: 'warning' },
  11 : { name: 'RETRIEVAL', color: 'success' },
  12 : { name: 'EMERGENCY', color: 'danger' },
  13 : { name: 'SHUTDOWN', color: 'default' }
}

function endpoint(path) {
  return CONFIG.proto + "://" + CONFIG.host + ":" + CONFIG.port.toString() + "/" + path;
}

// Onclick functions for buttons on the NavBar.
function lpvent() {
    $.ajax({
        url: endpoint("command/lp_vent"),
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
        url: endpoint("command/hp_fill"),
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
        url: endpoint("command/arm"),
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
        url: endpoint("command/shutdown"),
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
        url: endpoint("command/calibrate"),
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
        url: endpoint("command/e"),
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
setInterval(updatePodState, 1000);
var podState;

function update_pod_state(num) {
  console.log("state number: " + num.toString())

  var state = STATES[num]
  console.log("state: " + state.name + " " + state.color)
  $('#podState').text(state.name).addClass("badge-" + state.color)

  colors = ['primary', 'default', 'danger', 'warning', 'success', 'info']
  for (var i in colors) {
    if (colors[i] != state.color) {
      $('#podState').removeClass("badge-" + colors[i])
      console.log("removed badge-" + colors[i])

    }
  }
}

function update_badge_valve_nc(id, value) {
    if (value == 1) {
        $(id).text('Open').addClass('badge-danger').removeClass('badge-success');
        console.log("Valve " + id + " Open")
    } else {
        $(id).text('Closed').addClass('badge-success').removeClass('badge-danger');
        console.log("Valve " + id + " Closed")
    }
}

function update_badge_valve_no(id, value) {
  update_badge_valve_nc(id, !value);
}

function update_badge_valve_brake(id, value_rel, value_eng) {
  if (value_eng == 0 && value_rel == 0) {
      $(id).text('Closed').addClass('badge-success').removeClass('badge-warning').removeClass('badge-danger').removeClass('badge-primary');
      console.log("Brake " + id + " is Closed")
  } else if (value_eng == 1 && value_rel == 0) {
      $(id).text('Engaged').addClass('badge-warning').removeClass('badge-success').removeClass('badge-danger').removeClass('badge-primary');
      console.log("Brake " + id + " is Engaged")
  } else if (value_eng == 0 && value_rel == 1) {
      $(id).text('Released').addClass('badge-primary').removeClass('badge-success').removeClass('badge-danger').removeClass('badge-warning');
      console.log("Brake " + id + " is Released")
  } else {
      $(id).text('Error').addClass('badge-danger').removeClass('badge-success').removeClass('badge-warning');
      console.log("Brake " + id + " is Error: eng:" + value_eng.toString() + " rel:" + value_rel.toString())
  }
}

function valid_valve_value(value) {
  return (value === 1 || value  === 0)
}

function updatePodState() {
    $.ajax({
        url: endpoint("pod_State"),
        type: 'GET',
        success: function(response) {
            console.log(response);
            podState = JSON.parse(response);

            var new_values = {
              nc: {
                '#solenoidSkateA1' : podState.SOL_SKATE_0,
                '#solenoidSkateB1' : podState.SOL_SKATE_0,
                '#solenoidSkateC1' : podState.SOL_SKATE_1,
                '#solenoidSkateD1' : podState.SOL_SKATE_1,
                '#solenoidSkateE1' : podState.SOL_SKATE_2,
                '#solenoidSkateF1' : podState.SOL_SKATE_2,
                '#highPressureFill' : podState.SOL_HPFIL,
                '#solenoidBrake1-1' : podState.SOL_CLAMP_FIL_0,
                '#solenoidBrake2-1' : podState.SOL_CLAMP_FIL_1
              },
              no: {
                '#lowPressureVent' : podState.SOL_VENT
              },
              brake: {
                '#solenoidBrake1-2' : [
                  podState.SOL_CLAMP_REL_0,
                  podState.SOL_CLAMP_ENG_0
                ],
                '#solenoidBrake2-2' : [
                  podState.SOL_CLAMP_REL_1,
                  podState.SOL_CLAMP_ENG_1
                ]
              }
            }

            for (var key in new_values['nc']) {
              update_badge_valve_nc(key, new_values['nc'][key]);
            }

            for (var key in new_values['no']) {
              update_badge_valve_no(key, new_values['no'][key]);
            }

            for (var key in new_values['brake']) {
              update_badge_valve_brake(key, new_values['brake'][key][0], new_values['brake'][key][1]);
            }

            var pressureTransducer = podState.hp_pressure
            $('#psiTransducer').text(pressureTransducer);

            var stripeCount = podState.stripe_count
            $('#stripeCount').text(stripeCount);


            var approxDistance = podState.position_x
            $('#approxDist').text(approxDistance);

            update_pod_state(podState.state)
        },
        error: function(error) {
            console.log(error);
        }
    });
}
