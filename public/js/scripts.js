var monitoringVariables = [];

/* Show Monitoring Variables */
function showMonitoringVariables() {
     monitoringVariables.forEach(function(variable){
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
     });
};

/* Access server */
function getMonitoringVariables() {
     var count = 0;
     var countCallback = 0;

     monitoringVariables.forEach(function(variable){
          variable.promise = false;

          /* First time */
          getMonitoringVariable(variable,function(){
               countCallback++;

               if (count === monitoringVariables.length) {
                    if (countCallback === count) {
                        $('section.header div.timestamp').text(dateFormat(new Date(), "UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"));
                        calcTotalStatus();
                    }
               }
          });
          count++;
     });
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
     } else if (variable.chartType === "hbar") {
          variable.chart = new Chartist.Bar('#' + variable.id + ' div.graph', data, {
            width: 200,
            height: 90,
            high: 100,
            horizontalBars: true,
            stackBars: true,
            showLabel: true,
            axisX: {
              showGrid: false,
              showLabel: false,
              offset: 0
            },
            axisY: {
              showGrid: false,
              showLabel: false,
              offset: 0
            }
          }).on('draw', function(data) {
            if(data.type === 'bar') {
              data.element.attr({
                style: 'stroke-width: 50px'
              });
            }
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

               callback();
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

               callback();
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
               var count = 0;
               monitoringVariables.forEach(function(entry){
                      if (json[entry.id] !== undefined) {
                        entry.status = function(value){
                           if (value < json[entry.id].stable) return "stable";
                           else if (value < json[entry.id].unstable) return "unstable";
                           else return "dangerous";
                        };
                      }
                      count++;

                      if (count === monitoringVariables.length) {
                         callback();
                      }
               });
          },
         timeout: properties.config.defaultTimeout
     });
};

/* Document ready */
$( document ).ready(function() {
     properties.config.getAllProperties(properties.config.monitoringVariables).forEach(function(entry){
          monitoringVariables.push(properties.config.monitoringVariables[entry]);
     });
     typeStatus(properties.config.currentStatus);
     getCustomMonitoringMethods(function(){
          showMonitoringVariables();
          $('section.boxes ul.box').fadeIn(1000);
          getMonitoringVariables();

          /* Intervals */
          setInterval(function(){ getMonitoringVariables(); }, properties.config.millisecondsUpdateTime);
     });
});