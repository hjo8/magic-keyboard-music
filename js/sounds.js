var synth = T("OscGen", {wave:"saw", mul:0.25}).play();

var map = []

function playNote(e, BASE) {
	var midi = midiDict(e, BASE);
	//didn't press a good key
	if (!midi) return;

	var freq = getFrequency(midi);
//	var release_time = Math.min(400 + map[e].held_length * 40, 3000);	//for now, if keep pressed, same as playing it over and over, not sustained
	// console.log(release_time);
	var tempsynth = T("sin", {freq:freq, mul:0.25});
	var env = T("perc", tempsynth).bang().play();
	return midi;
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

function midiDict(keycode, offset) {
    var midi = offset;

    switch(keycode){
        //q 81 c3
        case 81:
            midi += 0;
            break;

        case 50:
            midi += 1;
            break;

        //w 87
        case 87:
            midi += 2;
            break;

        case 51:
            midi += 3;
            break;


        //e 69
        case 69:
            midi += 4;
            break;
        //r 82
        case 82:
            midi += 5;
            break;

        case 53:
            midi += 6;
            break;


        //t 84
        case 84:
            midi += 7;
            break;

        case 54:
            midi += 8;
            break;


        //y 89
        case 89:
            midi += 9;
            break;

        case 55:
            midi += 10;
            break;


        //u 85
        case 85:
            midi += 11;
            break;
        //i 73
        case 73:
            midi += 12;
            break;

        case 57:
            midi += 12;
            break;


        //o 79
        case 79:
            midi += 14;
            break;

        case 48:
            midi += 15;
            break;
        //p 80
        case 80:
            midi += 16;
            break;
        default:
            return false;
            break
    }
    return midi;
}

function keyDict(midi) {
    var midi_temp = midi - 60;//BASE;
    var left_bound = 100;
    // 10 is number of keys I'm using
    var tempwidth = (w-200)/17;

  
    return left_bound + midi_temp * tempwidth;
}