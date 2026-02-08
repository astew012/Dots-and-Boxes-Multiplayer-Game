// Create connection to Node.JS Server
const socket = io();

let bSize = 3; // brush size
let canvas;
let drawIsOn = false;
let myColor;
let prevX = 0;
let prevY = 0;
let userLetter = ""; // will be assigned by server

function setup() {
  canvas = createCanvas(800, 800);
  myColor = color(random(255), random(255), random(255));
  drawGrid();
  drawInstructions();
  
  //set styling for the sketch
  background(255);
  noStroke();
}



function draw() {
  drawGrid();
  drawInstructions();
  
  if(drawIsOn){
    fill(myColor);
    circle(mouseX,mouseY,bSize);
  }
  // Display user letter in bottom right
  fill(200);
  noStroke();
  rect(width - 80, height - 50, 70, 40, 5);
  fill(0);
  textFont("Courier New");
  textSize(15);
  textAlign(CENTER, CENTER);
  let displayLetter = userLetter || "?";
  text("User " + displayLetter, width - 45, height - 30);

}

//we only want to draw if the click is on the canvas not on our GUI
function mousePressed(){
  drawIsOn = true;
  prevX = mouseX;
  prevY = mouseY;
}

function mouseReleased(){
  drawIsOn = false;
}

function drawGrid() {
  let cols = 4;
  let rows = 4;
  let spacingX = width / (cols + 1);
  let spacingY = height / (rows + 1);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let xPos = (x + 1) * spacingX;
      let yPos = (y + 1) * spacingY;
      fill (0)
      circle(xPos, yPos, 15);
    }
  }
}

function drawInstructions() {
  let panelW = 360;
  let panelH = 140;
  // position panel at top-left
  let panelX = 10;
  let panelY = 10;

  // Panel background
  fill(100, 180, 220, 235);      
  noStroke();
  rect(panelX, panelY, panelW, panelH, 8); // rounded corners

  // Instruction text
  fill(30);
  textFont("Arial");
  textSize(11);
  textAlign(LEFT, TOP);

  text(
    "DOTS & BOXES\n" +
    "A simple two-player sketch inspired by Dots & Boxes.\n" +
    "Players take turns drawing one line between adjacent dots. When a player completes a box, write initials inside it and they take another turn.\n" +
    "Player A starts.\n" +
    "The game ends when all possible lines have been drawn, and the player with the most boxes wins.",
    panelX + 10,
    panelY + 10,
    panelW - 20,
    panelH - 20
  );
}

////IMPLEMENT MULTI-USER DRAWING////



////IMPLEMENT MULTI-USER DRAWING////


//Events we are listening for
// Connect to Node.JS Server
socket.on("connect", () => {
  console.log(socket.id);
});

// Receive user letter assignment
socket.on("assignUser", (letter) => {
  userLetter = letter;
  console.log("You are User " + userLetter);
  console.log("Assigned letter:", letter);
});

// Callback function on the event we disconnect
socket.on("disconnect", () => {
  console.log(socket.id);
});

socket.on("drawing", (data) => { // this is the event we are listening for when other users draw
drawStuff(data);
});

function mouseDragged() {
const drawData = {
xpos1: prevX,
ypos1: prevY,
xpos2: mouseX,
ypos2: mouseY,
userS: bSize, 
col:{
r: red(myColor),
g: green(myColor),
b: blue(myColor)
}
};
socket.emit("drawing", drawData);
drawStuff(drawData); // draw immediately on your own canvas
prevX = mouseX;
prevY = mouseY;
}

function drawStuff(data) {
  stroke(data.col.r, data.col.g, data.col.b);
  strokeWeight(data.userS);
  line(data.xpos1, data.ypos1, data.xpos2, data.ypos2);
  noStroke();
}


