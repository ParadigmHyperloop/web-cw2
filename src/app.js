var CONFIG = {
  host: "127.0.0.1",
  port: 7777,
  proto: "http"
}

var LOADING = true

var GRAFANA_URL = "http://localhost:3000"

STATES = {
  0 : { name: 'POST', color: 'default' },
  1 : { name: 'Boot', color: 'default' },
  2 : { name: 'HPFILL', color: 'primary' },
  3 : { name: 'LOAD', color: 'primary' },
  4 : { name: 'STANDBY', color: 'default' },
  5 : { name: 'ARMED', color: 'warning' },
  6 : { name: 'PUSHING', color: 'warning' },
  7 : { name: 'COASTING', color: 'warning' },
  8 : { name: 'BRAKING', color: 'warning' },
  9 : { name: 'VENT', color: 'warning' },
  10 : { name: 'RETRIEVAL', color: 'success' },
  11 : { name: 'EMERGENCY', color: 'danger' },
  12 : { name: 'SHUTDOWN', color: 'default' }
}

/* Sensors */
__CACHED_SENSORS = undefined

function get_sensors() {
  if (__CACHED_SENSORS === undefined) {
    $.get(endpoint('sensors'), function (response) {
      __CACHED_SENSORS = response
    });
    return {}
  }
  return __CACHED_SENSORS
}

BATTERY_CLASSES = [
  "fa-battery-empty",
  "fa-battery-one-quarters",
  "fa-battery-half",
  "fa-battery-three-quarters",
  "fa-battery-full",
  "text-success",
  "text-warning",
  "text-danger"
]
BATTERY_STATES = {
  "fa-battery-empty text-danger fa-blink" : function (x) { return (x < 28.0); },
  "fa-battery-one-quarter text-danger" : function (x) { return (x >= 28.0 && x < 30.0); },
  "fa-battery-half text-warning" : function (x) { return (x >= 30.0 && x < 33.0); },
  "fa-battery-three-quarters text-success" : function (x) { return (x >= 33.0 && x < 37.0); },
  "fa-battery-full text-success" : function (x) { return (x >= 37.0 && x < 43.0); },
  "fa-battery-full text-danger" : function (x) { return (x >= 43.0); }
}

LAST_TIMESTAMP = 0

function get_battery_class(voltage) {
  for (cls in BATTERY_STATES) {
    if (BATTERY_STATES[cls](voltage)) {
      return cls
    }
  }
}

function update_battery(elem, current, voltage) {
  if (current === undefined || voltage === undefined) {
    return;
  }

  var classes = get_battery_class(voltage).split(' ');
  for (i in BATTERY_CLASSES) {
    cls = BATTERY_CLASSES[i]
    if (elem.hasClass(cls) && !(cls in classes)) {
      elem.removeClass(cls)
    }
  }
  for (i in classes) {
    elem.addClass(classes[i])
  }
}


function create_sensor_row(id, sensor) {
  var row = $('<tr/>').attr('id', 'sensorRow_' + id)
  row.append($('<td/>').addClass('sensor-name').text(sensor.name))
  row.append($('<td/>').addClass('sensor-value').text('value').data('unit', sensor.unit))
  row.append($('<td/>').addClass('sensor-warnings'))

  var actions = $('<td/>').addClass('sensor-actions')

  var offsetBtn = $('<a/>').addClass('btn btn-info').text('offset')
  offsetBtn.on('click', function () {
    $('#offsetModal').data('sensor_id', id)
    $('#offsetModal').find('.modal-title').text('Offset ' + id)
    $('#offsetModal').modal('show')
  })
  actions.append(offsetBtn)
  row.append(actions)

  $('#sensorTable tbody').append(row)
}

function get_sensor_threshold(val, sensor) {
  for (threshold in sensor.thresholds) {
    bounds = sensor.thresholds[threshold]

    if (bounds[0] === undefined && bounds[1] == undefined) {
      return threshold
    } else if (bounds[0] === undefined && val <= bounds[1]) {
      return threshold
    } else if (val > bounds[0] && bounds[1] === undefined) {
      return threshold
    } else if (val > bounds[0] && val <= bounds[1]) {
      return threshold
    }
  }
}

function update_sensor_table(state) {
  var sensors = get_sensors()
  for (id in sensors) {
    if (id in state) {

      var row = $('#sensorRow_' + id)
      if (row.length == 0) {
        create_sensor_row(id, sensors[id]);
        row = $('#sensorRow_' + id)
      }

      var val = state[id]
      var name = sensors[id].name
      var desc = sensors[id].description
      var units = sensors[id].units
      $(row.find('.sensor-value')).text(val)

      var threshold = get_sensor_threshold(val, sensors[id])

    }
  }
}

function update_ping(elem, timestamp) {
  if (timestamp == undefined) {
    return;
  }

  if (LAST_TIMESTAMP == 0) {
    LAST_TIMESTAMP = timestamp;
    return
  }

  var diff = (timestamp - LAST_TIMESTAMP) / 1000000.0;
  console.log(diff);
  if (diff <= 2.0 && diff >= 0) {
    elem.removeClass('text-danger').removeClass('text-warning').addClass('text-success')
  } else {
    elem.removeClass('text-success').removeClass('text-warning').addClass('text-danger')
  }
  LAST_TIMESTAMP = timestamp;
}

function endpoint(path) {
  return CONFIG.proto + "://" + CONFIG.host + ":" + CONFIG.port.toString() + "/" + path;
}

(function ($) {
  function send_command(cmd) {
    console.log("Sending Command: " + cmd.toString())
    name = cmd[0]
    args = []

    if (cmd.length > 1) {
      args = cmd.slice(1)
    }
    $("#podResponseArgs").text(cmd.join(' '))
    $("#podResponseModal").modal('show')
    $("#podResponseContent").html('<i class="fa fa-refresh fa-spin fa-3x fa-fw"></i>')
    $.ajax({
        url: endpoint("commands/" + name),
        method: 'POST',
        data: JSON.stringify({
          args: args
        }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function(response) {
            console.log(response);
            if (response.msg === undefined) {
              $("#podResponseContent").html('<div class="alert alert-danger">Command failed to execute</div>')
            } else {
              $("#podResponseContent").text(response.msg)
            }
        },
        error: function(error) {
            console.log(error);
            $("#podResponseContent").html('<div class="alert alert-danger">HTTP Error occured durring execution</div>')
        }
    });
  }

  $(function () {
    // Onclick functions for buttons on the NavBar.
    $('#ventBtn').on('click', function () {
      send_command(["vent"])
    })

    $('#standbyBtn').on('click', function() {
      send_command(["standby"])
    })

    $('#hpFillBtn').on('click', function () {
      send_command(["fill", "hp"])
    })

    $('#armPodBtn').on('click', function () {
      send_command(["arm"])
    })

    $('#helpBtn').on('click', function () {
      send_command(["help"])
    })

    $('#shutdownBtn').on('click', function () {
      send_command(["shutdown"])
    })

    $('#resetBtn').on('click', function () {
      send_command(["reset"])
    })

    $('#calibrateBtn').on('click', function () {
      send_command(["calibrate"])
    })

    $('#emergencyBtn').on('click', function () {
      send_command(["emergency"])
    })

    $('#setOffsetBtn').on('click', function () {
      send_command(["offset", $('#offsetModal').data('sensor_id'), $('#offsetInput').val()])
    })

    $('#returnToStandbyActive').on('click', function () {
      send_command(["returnToStandby", "1"])
      $('#returnToStandbyActive').addClass("active")
      $('#returnToStandbyInactive').removeClass("active")
    })

    $('#returnToStandbyInactive').on('click', function () {
      send_command(["returnToStandby", "0"])
      $('#returnToStandbyActive').removeClass("active")
      $('#returnToStandbyInactive').addClass("active")
    })

    $('#batteryPack0EngageBtn').on('click', function () {
      send_command(["pack", "0", "1"])
      $('#batteryPack0EngageBtn').addClass("active")
      $('#batteryPack0DisengageBtn').removeClass("active")
    })

    $('#batteryPack0DisengageBtn').on('click', function () {
      send_command(["pack", "0", "0"])
      $('#batteryPack0EngageBtn').removeClass("active")
      $('#batteryPack0DisengageBtn').addClass("active")
    })

    $('#batteryPack1EngageBtn').on('click', function () {
      send_command(["pack", "1", "1"])
      $('#batteryPack1EngageBtn').addClass("active")
      $('#batteryPack1DisengageBtn').removeClass("active")
    })

    $('#batteryPack1DisengageBtn').on('click', function () {
      send_command(["pack", "1", "0"])
      $('#batteryPack1EngageBtn').removeClass("active")
      $('#batteryPack1DisengageBtn').addClass("active")
    })

    $('#telemetryDataBtn').on('click', function () {
    	window.open(GRAFANA_URL)
    })

    $('#flightProfileBtn').on('click', function () {
    	console.log('Bringing the user to the flight profile data.')
    })
  })

  // Gets PodState JSON Blob and parses its data into variables.
  // Variables are accessed in the below functions to update the GUI.
  setInterval(updatePodState, 1000);
  var podState;

  function update_pod_state(num) {
    if (num === undefined) {
      return
    }
    console.log("state number: " + num.toString())

    var state = STATES[num]
    console.log("state: " + state.name + " " + state.color)
    $('#podState').text(state.name).addClass("badge-" + state.color)

    colors = ['primary', 'default', 'danger', 'warning', 'success', 'info']
    for (var i in colors) {
      if (colors[i] != state.color) {
        $('#podState').removeClass("badge-" + colors[i])
        // console.log("removed badge-" + colors[i])

      }
    }
  }

  function update_badge_valve_nc(id, value) {
      if (!valid_valve_value(value)) {
        if (value == null) {
          console.log("Valve: " + id + " has invalid value: null")
          return;
        }
        console.log("Valve: " + id + " has invalid value: " + value.toString())
        return;
      }

      if (value == 1) {
          $(id).text('Open').addClass('badge-danger').removeClass('badge-success');
          // console.log("Valve " + id + " Open")
      } else {
          $(id).text('Closed').addClass('badge-success').removeClass('badge-danger');
          // console.log("Valve " + id + " Closed")
      }
  }

  function update_badge_valve_no(id, value) {
    update_badge_valve_nc(id, value ? 0 : 1);
  }

  function update_badge_valve_brake(id, value_rel, value_eng) {
    if (!valid_valve_value(value_rel) || !valid_valve_value(value_eng)) {
      console.log("Valve: " + id + " has invalid values")
      return;
    }

    if (value_eng == 0 && value_rel == 0) {
        $(id).text('Closed').addClass('badge-success').removeClass('badge-warning').removeClass('badge-danger').removeClass('badge-primary');
        // console.log("Brake " + id + " is Closed")
    } else if (value_eng == 1 && value_rel == 0) {
        $(id).text('Engaged').addClass('badge-warning').removeClass('badge-success').removeClass('badge-danger').removeClass('badge-primary');
        // console.log("Brake " + id + " is Engaged")
    } else if (value_eng == 0 && value_rel == 1) {
        $(id).text('Released').addClass('badge-primary').removeClass('badge-success').removeClass('badge-danger').removeClass('badge-warning');
        // console.log("Brake " + id + " is Released")
    } else {
        $(id).text('Error').addClass('badge-danger').removeClass('badge-success').removeClass('badge-warning');
        // console.log("Brake " + id + " is Error: eng:" + value_eng.toString() + " rel:" + value_rel.toString())
    }
  }

  function valid_valve_value(value) {
    return (value === 1 || value  === 0)
  }

  function updatePodState() {
      $.ajax({
          url: endpoint("state"),
          type: 'GET',
          success: function(podState) {
              console.log(podState);

              if (LOADING && podState != {}) {
                $('#connect').text("Connected!").removeClass('btn-outline-info').addClass('btn-success')
                $('#loading').fadeOut()
                LOADING = false
              }

              var new_values = {
                nc: {
                  '#solenoidSkateA1' : podState.SOL_SKATE_0,
                  '#solenoidSkateB1' : podState.SOL_SKATE_1,
                  '#solenoidSkateC1' : podState.SOL_SKATE_2,
                  '#solenoidSkateD1' : podState.SOL_SKATE_2,
                  '#highPressureFill' : podState.SOL_HPFIL,
                  '#highPressureVent' : podState.SOL_VENT,
                  '#solenoidBrake1-1' : podState.SOL_CLAMP_FIL_0,
                  '#solenoidBrake2-1' : podState.SOL_CLAMP_FIL_1,
                },
                brake: {
                  '#solenoidBrake1-2' : [
                    podState.SOL_CLAMP_REL_0,
                    podState.SOL_CLAMP_ENG_0,
                  ],
                  '#solenoidBrake2-2' : [
                    podState.SOL_CLAMP_REL_1,
                    podState.SOL_CLAMP_ENG_1,
                  ]
                }
              }

              for (var key in new_values['nc']) {
                update_badge_valve_nc(key, new_values['nc'][key]);
              }

              for (var key in new_values['brake']) {
                update_badge_valve_brake(key, new_values['brake'][key][0], new_values['brake'][key][1]);
              }

              var pressureTransducer = podState.hp_pressure;
              $('#psiTransducer').text(pressureTransducer);

              var lowPressure = podState.reg_pressure_0;
              $('#lowPressureTransducer').text(lowPressure);

              var brakeTank0 = podState.brake_tank_0
              $('#brakeTank0').text(brakeTank0);

              var brakeTank1 = podState.brake_tank_1
              $('#brakeTank1').text(brakeTank1);

              var approxDistance = podState.position_x
              $('#approxDist').text(approxDistance);

              var velocity = podState.velocity_x
              $('#velocity').text(velocity);

              var acceleration = podState.acceleration_x
              $('#acceleration').text(acceleration);

              update_battery($('#battery0'), podState.current_0, podState.voltage_0);
              update_battery($('#battery1'), podState.current_1, podState.voltage_1);

              update_ping($('#wifiIcon'), podState.timestamp);
              update_pod_state(podState.state);

              update_sensor_table(podState);

          },
          error: function(error) {
              console.log(error);
          }
      });
  }

  $('#connect').on('click', function () {
    $('#loading').fadeOut()
  })

})(jQuery)
