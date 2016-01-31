function spawnNote(note, size, midi) {
    
}


/**

function spawnNote(note, size, midi) {
	var offset = $("#canvasid").offset();

    var x = keyDict(midi);

	//320 is middle width
    var px = x - offset.left;
    var py = height - 50 - offset.top;

    var side_len = size/30;

    var rand_x = (Math.random()*2 - 1)/100;

    var body = Physics.body("circle",{
            x: px,
            y: py,

            styles: {
                strokeStyle: '#123456',
                lineWidth: 0,
                fillStyle: '#123456',
                angleIndicator: 'white'
            },
            radius: side_len,
            restitution:0.5,
    });

    console.log(body.styles);

    world.add(body.applyForce(Physics.vector(rand_x,-0.1)));
}

*/