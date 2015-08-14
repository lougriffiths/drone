function init() {
    var tracker1 = initTracker("#example");
    tracking.track("#example .drone", tracker1);
}


function initTracker(element) {
    // Initialise a color tracker
    var tracker = new tracking.ColorTracker();

    //we only want rectangles size>20px
    //tracker .setMinDimension(20);

    //colors we want
    TRackerUtils.addTrackingColor("#A94A45", "red", tracker);
    TrackerUtils.addTrackingColor("#5EA24E", "green")
    TrackerUtils.startTrackingColors(tracker);

    // Whenever there is a new color detected, mark them
    tracker.on('track', function(event) {
        console.log(event.data);
    });

    return tracker;
}

function markColors(colors, element) {
    //do the marking
    var canvas= $(element + ' .canvas').get(0);
    var context = canvas. getContext('2d');
    context.clearRect(0, 0, context.width, context.height);
}



for(var i = 0; i < colors.length; i++) {
    drawRectangle(colors[i], context);
}

function drawRectangle(rect, context) {
    context.strokeStyle = rect.color;
    context.strokeRect(rect.x, rect.y, rect.width, rect.height);
}

window.addEventListener("load", init);
