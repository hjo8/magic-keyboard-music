var synth = T("OscGen", {wave:"saw", mul:0.25}).play();


var midicps = T("midicps");

var map = []

for (var i = 0; i < 256; i++) {
	map[i] = {pressed: false, held_length: 0};
}

document.onkeydown = function(event) {
    event = event || window.event;
    var e = event.keyCode;

    // only play once let go
	// held down
	map[e].held_length++;
	map[e].pressed = true;
	
    
	console.log(map[e].held_length);
    
}
document.onkeyup = function(event) {
    event = event || window.event;
    var e = event.keyCode;



    var freq = getFrequency(e);
    var release_time = Math.min(500 + map[e].held_length * 20, 3000);
    console.log(release_time);
    var tempsynth = T("saw", {freq:freq, mul:0.25});
    var env = T("perc", {r:release_time}, tempsynth).bang().play();
    // synth.def.env = env;

	// synth.noteOnWithFreq(freq, 100, env);

	// reset variables
    map[e].pressed = false;
    map[e].held_length = 0;
}


function getFrequency(midi_code) {
    var offset_code = midi_code - 69;
    if (offset_code > 0) {
        return Number(440 * Math.pow(2, offset_code / 12));
    } 
    else {
        return Number(440 / Math.pow(2, -offset_code / 12));
	}
}