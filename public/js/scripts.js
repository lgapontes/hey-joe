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
                        $('section.header div.timestamp').text(moment().format('YYYY-MM-DD HH:mm:ss'));
                        calcTotalStatus();
                    }
               }
          });
          count++;
     });
};

function isIE() {
    var ua = window.navigator.userAgent;
    var msie = ua.indexOf("MSIE ");
    if (msie > 0 || !!navigator.userAgent.match(/Trident.*rv\:11\./)) {        
        return true;
    }
    return false;
};

function isEdge() {
  if (/Edge/.test(navigator.userAgent)) {
    return true;
  }
  return false;
}

function isChrome() {
    if(/chrom(e|ium)/.test(navigator.userAgent.toLowerCase())){
      return true;
    }
    return false;
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
     } else if (variable.chartType === '3bar') {
        let high = data.series[2] + 300;
        variable.chart = new Chartist.Bar('#' + variable.id + ' div.graph', data, {
            distributeSeries: true,
            width: 200,
            height: 110,
            chartPadding: 0,
            high: high
        }).on('draw', function(data) {
            var barHorizontalCenter, barVerticalCenter, label, value;
            if(data.type === 'bar') {
              data.element.attr({
                style: 'stroke-width: 20px; stroke: #F8FFE3'
              });

              let marginLeft = 10;
              let marginTop = 0;
              if (isEdge()) {
                marginTop = 14;
                marginLeft = 10;
              } else if(isChrome()){
                marginLeft = 0;
              } else if (isIE()) {
                marginTop = 15;
              }

              barHorizontalCenter = data.x1 + (data.element.width() * .5) - marginLeft;
              barVerticalCenter = data.y1 + (data.element.height() * -1) - 5 + marginTop;
              value = data.element.attr('ct:value');
              if (value !== '0') {
                label = new Chartist.Svg('text');
                label.text(value);
                label.addClass("ct-barlabel");
                label.attr({
                  x: barHorizontalCenter,
                  y: barVerticalCenter,
                  'text-anchor': 'middle'
                });
                return data.group.append(label);
              }
            }
          });
     } else if (variable.chartType === 'uptime') {
        for(var i =0; i<data.labels.length; i++) {
          $('#' + variable.id + ' div.graph').append(
                '<div class="uptime">' +
                '  <div class="title">' + data.labels[i] + '</div>' +
                '  <div class="data">' + data.series[i] + '</div>' +
                '</div>'
            );
        }
     } else if (variable.chartType === 'heap') {
        variable.chart = new Chartist.Bar('#' + variable.id + ' div.graph', data, {
          width: 200,
          height: 110,
          chartPadding: {
                 right: 0,
                 left: 0
          },
          stackBars: true,
          showLabel: true,
          axisX: {
            showGrid: false,
            showLabel: true
          },
          axisY: {
            showGrid: true,
            showLabel: true
          }
        }).on('draw', function(data) {
          if(data.type === 'bar') {
            data.element.attr({
              style: 'stroke-width: 35px'
            });
          }
        });
     } else if (variable.chartType === "hbar2") {
          variable.chart = new Chartist.Bar('#' + variable.id + ' div.graph', data, {
            width: 200,
            height: 90,
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
      if (variable.chartType === '3bar') {
          let high = data.series[2] + 300;
          variable.chart.options.high = high;
      }
      variable.chart.update(data,variable.chart.options);
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

               variable.currentStatus = customRules.monitoringVariables[variable.id].status(variable.value(values));
               $(id + ' div.status div').attr('class',variable.currentStatus);
               $(id + ' div.icons span').text(variable.formatedValue(values));

               callback();
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
     showMonitoringVariables();
     $('section.boxes ul.box').fadeIn(1000);
     getMonitoringVariables();

     /* Intervals */
     setInterval(function(){ getMonitoringVariables(); }, properties.config.millisecondsUpdateTime);
});