/* Show Monitoring Variables */
function showMonitoringVariables() {
     for(var entry in properties.config.monitoringVariables) {
          if (entry === 'cpu') {
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

               /* First time */
               getMonitoringVariable(variable);

               /* Intervals */
               setInterval(function(){ getMonitoringVariable(variable) }, variable.millisecondsUpdateTime);
          }
     }
};

/* Charts*/
function createChart(variable,data) {
     if (variable.chartType === "pie") {
          properties.config.monitoringVariables.cpu.chart = new Chartist.Pie('#' + variable.id + ' div.graph', data, {
               donut: true,
               donutWidth: 30,
               startAngle: 270,
               total: 200,
               showLabel: false,
               width: 200,
               height: 170
          });
     }
};

function updateChart(variable,data) {
     variable.chart.update(data);
};

/* Ajax */
function dataLoaded(id) {
     $(id).attr('class','done');
     $(id + ' div.icons div').css('display', 'block');
     $(id + ' div.graph').css('display', 'block');
};

function getMonitoringVariable(variable) {
     var id = '#' + variable.id;
     $.get({
         url: variable.url,
         error: function(){
               if (variable.chart === undefined) {
                    dataLoaded(id);
               }
               $(id + ' div.status div').attr('class','error');
               $(id + ' div.icons span').text('error');
               variable.chart = undefined;
               $(id + ' div.graph').text(properties.config.errorMessage);
         },
         success: function(json) {
               var values = variable.getDataAppropriately(json);

               if (variable.chart === undefined) {
                    dataLoaded(id);
                    $(id + ' div.graph').text('');
                    createChart(variable,{series: values});
               } else {
                    updateChart(variable,{series: values});
               }

               $(id + ' div.status div').attr('class',
                    variable.status(variable.value(values))
               );
               $(id + ' div.icons span').text(variable.formatedValue(values));
          },
         timeout: properties.config.defaultTimeout
     });
};

/* Document ready */
$( document ).ready(function() {
     typeStatus("loading");
     showMonitoringVariables();
     //getCpu();
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
function typeStatus(status) {
    Typed.new('#status', {
        strings: [status],
        typeSpeed: 100
    });
};

/* Charts */
new Chartist.Line('#concurrentUsersChart', {
 labels: ['h -3', 'h -2', 'h -1', 'now'],
 series: [
   [200, 230, 222, 233]
 ]
}, {
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



/* Is it necessary? */
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