function spawnNote(note) {
	var offset = $("#canvasid").offset();

	//320 is middle width
    var px = width/2 - offset.left;
    var py = height - 50 - offset.top;

    var rand_x = (Math.random()*2 - 1)/30;
    world.add(Physics.body("convex-polygon",{
            x: px,
            y: py,
            vertices: [
                {x:0, y:0},
                {x:0, y:30},
                {x:30, y:30},
                {x:30, y:0}

            ],
            restitution:0.5,
    }).applyForce(Physics.vector(rand_x,-0.1)));

}