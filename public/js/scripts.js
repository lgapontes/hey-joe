$( document ).ready(function() {
     typeStatus("loading");
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





new Chartist.Line('#concurrentUsersGraph', {
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

new Chartist.Pie('#cpuCore1Graph', {
     series: [23, 77]
}, {
     donut: true,
     donutWidth: 30,
     startAngle: 270,
     total: 200,
     showLabel: false,
     width: 200,
     height: 170
});