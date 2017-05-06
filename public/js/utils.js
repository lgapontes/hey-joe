/* Rules to change background */
var c = 0,
     $img = $('.image div'),
     n = $img.length;

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

     monitoringVariables.forEach(function(entry){
        getIndexStatus(entry.currentStatus,function(currentStatusIndex){
               if (possibleStatusValues[currentStatusIndex] > possibleStatusValues[worseStatusIndex]) {
                    worseStatusIndex = currentStatusIndex;
               }
          });
          count++;

          if (monitoringVariables.length === count) {

                if (properties.config.currentStatus != possibleStatus[worseStatusIndex]) {
                     /* Change it */
                    properties.config.currentStatus = possibleStatus[worseStatusIndex];
                    colorStatus(properties.config.currentStatus);
                }

          }
     });
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

function getAllMethods(object) {
    var methods = Object.getOwnPropertyNames(object).filter(function(property) {
        return typeof object[property] == 'function';
    });
    return methods;
};