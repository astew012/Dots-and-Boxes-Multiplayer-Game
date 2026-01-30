// Create connection to Node.JS Server
const socket = io();

let bSize = 30; // brush size
let canvas;
let drawIsOn = false;
let myColor;

function setup() {
  canvas = createCanvas(500, 500);
  myColor = color(random(255), random(255), random(255));

  //set styling for the sketch
  background(255);
  noStroke();
}

function draw() {

  if(drawIsOn){
    fill(myColor);
    circle(mouseX,mouseY,bSize);
  }

}

//we only want to draw if the click is on the canvas not on our GUI
function mousePressed(){
  drawIsOn = true;
}

function mouseReleased(){
  drawIsOn = false;
}


////IMPLEMENT MULTI-USER DRAWING////



////IMPLEMENT MULTI-USER DRAWING////


//Events we are listening for
// Connect to Node.JS Server
socket.on("connect", () => {
  console.log(socket.id);
});

// Callback function on the event we disconnect
socket.on("disconnect", () => {
  console.log(socket.id);
});

socket.on("drawing", (data) => {
drawStuff(data);
});

function mouseDragged() {
socket.emit("drawing", {
xpos: mouseX,
ypos: mouseY,
userS: bSize, 
col:{
r: red(myColor),
g: green(myColor),
b: blue(myColor)
}
});
}

function drawStuff(data) {
fill(data.col.r, data.col.g, data.col.b);
circle(data.xpos, data.ypos, data.userS);
}


