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
    after(10*1000, function(){
    bot.drone.land();
    });
    after(15*1000, function(){
        bpt.drone.stop();
    });


}


Cylon.start();


