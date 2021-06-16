var balloon,balloonImage1,balloonImage2;
var pos;
var db;

function preload(){
   bg =loadImage("cityImage.png");
   balloonImage1=loadAnimation("hotairballoon1.png");
  }

function setup() {
  db=firebase.database();
  createCanvas(1500,700);

  balloon=createSprite(250,450,150,150);
  balloon.addAnimation("hotAirBalloon",balloonImage1);
  balloon.scale=0.5;

  var ballpos = db.ref('balloon/height');
    ballpos.on("value",readposition)

  textSize(20); 
}

// function to display UI
function draw() {
  background(bg);

  /*if(keyDown(LEFT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in left direction
  }
  else if(keyDown(RIGHT_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in right direction
  }
  else if(keyDown(UP_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in up direction
  }
  else if(keyDown(DOWN_ARROW)){
    balloon.addAnimation("hotAirBalloon",balloonImage2);
    //write code to move air balloon in down direction
  }*/

  if(keyDown(LEFT_ARROW)){
    writePosition(-5,0);
}
else if(keyDown(RIGHT_ARROW)){
    writePosition(5,0);
}
else if(keyDown(UP_ARROW)){
    writePosition(0,-5);
    balloon.scale = 0.7;
}
else if(keyDown(DOWN_ARROW)){
    writePosition(0,+5);
    balloon.scale = 0.3;
}

  drawSprites();
  fill(0);
  stroke("white");
  textSize(25);
  text("**Use arrow keys to move Hot Air Balloon!",40,40);
}

function writePosition(x,y){
    db.ref('balloon/height').set({
        'x': position.x + x,
        'y': position.y + y
    })
}
   function readposition(data){
       position = data.val();
       balloon.x = position.x;
       balloon.y = position.y;
   }                                           