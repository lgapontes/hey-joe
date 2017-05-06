/* Show Monitoring Variables */
function showMonitoringVariables() {
     for(var entry in properties.config.monitoringVariables) {
          var variable = properties.config.monitoringVariables[entry];
          $("section.boxes ul.box").append(
               '<li id="' + variable.id + '" class="loading">' +
               '    <div class="title">' + variable.label + '</div>' +
                    '<div class="status"><div class="loading"></div></div>' +
               '    <div class="hr"><hr /></div>' +
               '    <div class="icons">' +
               '         <div class="' + variable.id + '"></div>' +
               '         <br />' +
               '         <span></span>' +
               '    </div>' +
               '    <div class="graph ct-chart ct-perfect-fourth"></div>' +
               '</li>'
          );
     }
};

/* Access server */
function getMonitoringVariables() {
     var count = 0;
     for(var entry in properties.config.monitoringVariables) {
          var variable = properties.config.monitoringVariables[entry];

          /* First time */
          getMonitoringVariable(variable);
          count++;

          console.log(count);
          if (count == getAllProperties(properties.config.monitoringVariables).length) {
               calcTotalStatus();
          }
     }
};

/* Charts*/
function createChart(variable,data) {
     if (variable.chartType === "pie") {
          variable.chart = new Chartist.Pie('#' + variable.id + ' div.graph', data, {
               donut: true,
               donutWidth: 30,
               startAngle: 270,
               total: 200,
               showLabel: false,
               width: 200,
               height: 170
          });
     } else if (variable.chartType === "line") {
          variable.chart = new Chartist.Line('#' + variable.id + ' div.graph', data, {
               showPoint: false,
               lineSmooth: false,
               showArea: true,
               chartPadding: {
                   right: 0,
                   left: 0
               },
               width: 200,
               height: 110
          });
     }
};

function updateChart(variable,data) {
     variable.chart.update(data);
};

/* Ajax */
function dataLoaded(id) {
     $(id).attr('class','done');
     $(id + ' div.icons').css('display', 'block');
     $(id + ' div.graph').css('display', 'block');
};

function getMonitoringVariable(variable,callback) {
     var id = '#' + variable.id;
     $.get({
         url: variable.url,
         error: function(){
               if (variable.chart === undefined) {
                    dataLoaded(id);
               }
               $(id + ' div.status div').attr('class','error');
               variable.currentStatus = 'error';
               $(id + ' div.icons span').text('error');
               variable.chart = undefined;
               $(id + ' div.graph').text(properties.config.errorMessage);
         },
         success: function(json) {
               var values = variable.getDataAppropriately(json);

               if (variable.chart === undefined) {
                    dataLoaded(id);
                    $(id + ' div.graph').text('');
                    createChart(variable,{labels: variable.chartLabels, series: values});
               } else {
                    updateChart(variable,{labels: variable.chartLabels, series: values});
               }

               variable.currentStatus = variable.status(variable.value(values));
               $(id + ' div.status div').attr('class',variable.currentStatus);
               $(id + ' div.icons span').text(variable.formatedValue(values));
          },
         timeout: properties.config.defaultTimeout
     });
};

function getCustomMonitoringMethods(callback) {
     $.get({
         url: properties.config.statusMonitoringMethodsUrl,
         error: function(){
               callback();
         },
         success: function(json) {
               getAllProperties(json).forEach(function(entry){
                      properties.config.monitoringVariables[entry].status = function(value){
                         if (value < json[entry].stable) return "stable";
                         else if (value < json[entry].unstable) return "unstable";
                         else return "dangerous";
                      };
               });
               callback();
          },
         timeout: properties.config.defaultTimeout
     });
};

/* Document ready */
$( document ).ready(function() {
     typeStatus(properties.config.currentStatus);
     getCustomMonitoringMethods(function(){
          showMonitoringVariables();
          $('section.boxes ul.box').fadeIn(1000);
          getMonitoringVariables();

          /* Intervals */
          setInterval(function(){ getMonitoringVariables(); }, properties.config.millisecondsUpdateTime);
     });
});

/* Rules to change background */
var c = 0,
     $img = $('.image div'),
     n = $img.length;

$("#link").click(function(){
     $img.delay(1000).fadeOut(800).eq(++c%n).fadeIn(800,function(){
          typeStatus($img.eq(c%n).attr("class"));
     });
     return false;
});

/* Utils */
var possibleStatus = [
       "loading",
       "stable",
       "unstable",
       "dangerous",
       "error"
];
var possibleStatusValues = [
       -1,
       0,
       1,
       2,
       3
];

function getIndexStatus(status,callback) {
     var i = 0;
     possibleStatus.forEach(function(entry){
          if (entry === status) {
               callback(i);
          }
          i++
     });
};

function calcTotalStatus() {
     var worseStatusIndex = 0;
     var count = 0;
     for(var entry in properties.config.monitoringVariables) {
          getIndexStatus(properties.config.monitoringVariables[entry].currentStatus,function(currentStatusIndex){
               if (possibleStatusValues[currentStatusIndex] > possibleStatusValues[worseStatusIndex]) {
                    worseStatusIndex = currentStatusIndex;
               }
          });
          count++;

          if (getAllProperties(properties.config.monitoringVariables).length === count) {
               /* Change it */
               if (properties.config.currentStatus != possibleStatus[worseStatusIndex]) {
                    properties.config.currentStatus = possibleStatus[worseStatusIndex];
                    colorStatus(properties.config.currentStatus);
               }
          }
     }
};

function colorStatus(status) {
     getIndexStatus(status,function(statusIndex){
          $img.fadeOut(500).eq(statusIndex).fadeIn(500,function(){
               typeStatus($img.eq(statusIndex).attr("class"));
          });
     });
};

function typeStatus(status) {
    Typed.new('#status', {
        strings: [status],
        typeSpeed: 10
    });
};

function getAllProperties(object) {
     var properties = [];
     for(var key in object) {
          properties.push(key);
     }
     return properties;
};

function getAllPropertiesValues(object) {
     var properties = [];
     for(var key in object) {
          properties.push(object[key]);
     }
     return properties;
};

function getAllMethods(object) {
    var methods = Object.getOwnPropertyNames(object).filter(function(property) {
        return typeof object[property] == 'function';
    });
    return methods;
};

/* For future use... */
var ResultTypes = {
          loading: {
                    background: {
                              color: "#616161",
                              image: "img/loading.png"
                    },
                    font: {
                              color: "#424242"
                    }
          },
          stable: {
                    background: {
                              color: "#1e88e5",
                              image: "img/stable.png"
                    },
                    font: {
                              color: "#1565c0"
                    }
          },
          unstable: {
                    background: {
                              color: "#9e9d24",
                              image: "img/unstable.png"
                    },
                    font: {
                              color: "#827717"
                    }
          },
          dangerous: {
                    background: {
                              color: "#ef6c00",
                              image: "img/dangerous.png"
                    },
                    font: {
                              color: "#e65100"
                    }
          },
          error: {
                    background: {
                              color: "#d84315",
                              image: "img/error.png"
                    },
                    font: {
                              color: "#bf360c"
                    }
          },
};