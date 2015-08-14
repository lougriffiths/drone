var Cylon = require('cylon');


// initialise the bot
Cylon.robot()
    .connection("ardrone", {
        adaptor: 'ardrone',
        port: '192.168.1.1'
    })
    .device("drone", {
        driver: "ardrone",
        connection: "ardrone"
    })
    .device("nav", {
        driver: "ardrone-nav",
        connection: "ardrone"
    })
    .on("ready", fly);

var bot;
//fly the bot
function fly(robot) {
    bot = robot;
    // receive limited amount of data
    bot.drone.config('general: navdata_demo', 'TRUE');

    bot.nav.on("navdata", function(data){
        console.log(data);
    });

    bot.nav,on("altitudeChange", function(data) {
        console.log("Altitude:", data);
        //drone is higher than 1.5m
        if (altitude > 1.5) {
            bot.drone.land();
        }
    });

    bot.nav.on("batteryChange", function(data) {
        console.log("Battery level:", data);
    });
    //disable emergency settings
    bot.drone.disableEmergency();
    //tell the drone it's lying flat
    bot.drone.ftrim();


    bot.drone.takeoff();
//further instructions go here

    after(8*1000, function(){
        bot.drone.right(0.1);
        console.log("right");
    });

    after(12*1000, function(){
        bot.drone.right(0);
        bot.drone.hover(1);
    });

    after(16*1000, function(){
        bot.drone.forward(0.1);
    });

    after(20*1000, function() {
        bot.drone.forward(0);
        bot.drone.hover(1);

    });

    after(24*1000, function(){
        bot.drone.left(0.1);
    });

    after(28*1000, function() {
        bot.drone.left(0);
        bot.drone.hover(1);

    });

    after(32*1000, function(){
        bot.drone.back(0.1);
    });

    after(36*1000, function() {
        bot.drone.back(0);
        bot.drone.hover(1);

    });

    after(41*1000, function(){
    bot.drone.land();
    });

    after(45*1000, function () {
    bot.drone.stop();
    });

}


Cylon.start();


