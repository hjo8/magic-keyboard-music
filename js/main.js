//////////////////////////////////////////
/////////VERTEX DATA FOR LETTERS//////////
//////////////////////////////////////////

var A = [{x:26,y:71},{x:52,y:15},{x:74,y:71},{x:57,y:71},{x:52,y:51},{x:47,y:71},{x:26,y:71},{x:56,y:44},{x:52,y:30},{x:48,y:44},{x:56,y:44}];

var B = [{x:28,y:9},{x:28,y:70},{x:73,y:70},{x:83,y:65},{x:87,y:55},{x:85,y:45},{x:78,y:39},{x:63,y:36},{x:75,y:32},{x:79,y:23},{x:78,y:15},{x:70,y:9},{x:28,y:9},{x:39,y:15},{x:60,y:17},{x:60,y:22},{x:39,y:25},{x:39,y:46},{x:66,y:51},{x:66,y:59},{x:39,y:60},{x:39,y:15}];

var C = [{x:80,y:17},{x:43,y:20},{x:35,y:29},{x:30,y:44},{x:32,y:56},{x:40,y:61},{x:56,y:62},{x:80,y:62},{x:80,y:52},{x:63,y:49},{x:50,y:41},{x:53,y:30},{x:80,y:30}];

var D = [{x:28,y:18},{x:28,y:71},{x:71,y:71},{x:81,y:63},{x:84,y:44},{x:82,y:31},{x:72,y:19},{x:28,y:18},{x:37,y:28},{x:61,y:29},{x:67,y:41},{x:66,y:53},{x:59,y:56},{x:37,y:55},{x:37,y:28}];

var E = [{x:28,y:14},{x:28,y:72},{x:77,y:72},{x:77,y:59},{x:49,y:59},{x:49,y:46},{x:64,y:46},{x:65,y:33},{x:49,y:33},{x:49,y:23},{x:77,y:23},{x:76,y:14}];

var F = [{x:30,y:12},{x:30,y:70},{x:48,y:70},{x:48,y:44},{x:64,y:44},{x:64,y:34},{x:48,y:34},{x:48,y:24},{x:76,y:24},{x:76,y:12}];

var G = [{x:83,y:14},{x:54,y:14},{x:37,y:20},{x:29,y:43},{x:32,y:61},{x:61,y:69},{x:89,y:69},{x:89,y:43},{x:61,y:41},{x:61,y:50},{x:77,y:50},{x:78,y:60},{x:61,y:58},{x:47,y:53},{x:44,y:39},{x:53,y:27},{x:83,y:27}];

//////////////////////////////////////////

var w = window.innerWidth;
var h = window.innerHeight;
var objLimit = 50;

var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

var engine = Engine.create(document.body, {
    render: {
        options: {
            height: h,
            width: w,
            showDebug: true,
            wireframes: false,
            background: "hsl(0,0%,10%)"
        }
    }
});
engine.timing.timeScale = 1.2;
engine.world.gravity.y = 2;
engine.world.bounds.max.x = w;
engine.world.bounds.max.y = h;

World.add(engine.world, Bodies.rectangle(w / 2, h - 160, 1050, 300, {   //adds the bottom rectangle, look into docs for params
    isStatic: true,
    render: {
        fillStyle: "rgba(0,0,0,0)",
        strokeStyle: "rgba(0,0,0,0)"
    }
}));

Engine.run(engine);

var letters = {
    A: {
        name: "a",
        pos: -500,
        vertices: A
    },
    B: {
        name: "b",
        pos: 0,
        vertices: B
    },
    C: {
        name: "c",
        pos: -200,
        vertices: C
    },
    D: {
        name: "d",
        pos: -300,
        vertices: D
    },
    E: {
        name: "e",
        pos: -300,
        vertices: E
    },
    F: {
        name: "f",
        pos: -200,
        vertices: F
    },
    G: {
        name: "g",
        pos: 0,
        vertices: G
    }
};

var key_to_letter = {
    Q: "C",
    W: "D",
    E: "E",
    R: "F",
    T: "G",
    Y: "A",
    U: "B",
    I: "C",
    O: "D",
    P: "E"
}

function createBox(x, y, key) {
    return Matter.Body.create({
        position: {
            x: x,
            y: y
        },
        vertices: JSON.parse(JSON.stringify(letters[key].vertices)),
        mass: 0.0017,
        friction: 0,
        restitution: 1
    });
}

var boxes = [];

$(document).keydown(function(e) {
    var keyCode = e.keyCode;
    var key = String.fromCharCode(keyCode);
    key = key_to_letter[key];

    if(key in letters){
        var midi = playNote(keyCode, 60);
        addLetter(key, midi);
//        hilight(letters[key].name);
    }
});

function addLetter(e, midi) {
    //change letters[e].pos to sth else
    offset = keyDict(midi);
    var box = createBox( offset, window.innerHeight - 300, e);

    box.angle = Math.random() * 0.5 - 0.25;
    box.force.y -= 0.00015;
    //  console.log(box);
    //  set colors/styles here
    boxes.push(box);
    World.add(engine.world, boxes[boxes.length - 1]);

    if (boxes.length > objLimit) {
        World.remove(engine.world, boxes[0]);
        boxes = boxes.slice(1);
    }
}

/** maybe for later
function hilight(key) {
    $("#" + key).addClass("hilight");
    setTimeout(function() {
        $("#" + key).removeClass("hilight");
    }, 500);
}

$(".key").bind("click touch",function(e) {
    e.preventDefault();
    var key = String.fromCharCode($(this).attr("id").charCodeAt(0)).toUpperCase();
    if(key in letters){
        addLetter(key);
        hilight($(this).attr("id"));
    }
});
*/