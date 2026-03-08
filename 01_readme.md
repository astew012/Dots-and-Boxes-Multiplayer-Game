# Dots and Boxes Multiplayer Game 
8/03/26 
Anna Stewart 

# Instructions for coder 
// The project uses external Node.js libraries such as Express and Socket.IO, which are installed via npm and stored in the node_modules directory

// app.js
// This file contains the server-side code for our Dots & Boxes inspired sketch.
// It runs on a Node.js server and manages communication between all connected users.

// We use Express to serve the P5.js sketch from the "public" folder,
// and Socket.IO to enable real-time communication between the server and clients.

// The server listens for connections from users, assigns each client a unique letter,
// and broadcasts drawing data so everyone can see each other's drawings live.


// sketch.js
// This file contains the client-side code that runs in the browser.

// It handles the P5.js drawing logic and communicates with the Node.js server
// using Socket.IO.

// A connection is created between the browser and the server so that drawing
// actions can be sent and received in real time, allowing multiple users to
// interact with the sketch simultaneously.


# Description 
Inspired by the nostalgia of long childhood car journeys or sitting bored in a café with nothing but a pen and paper, this is a digital version of that experience. While people may not carry pen and paper with them anymore, this is designed for the device we now always carry with us: our phones. This reimagines the classic Dots and Boxes game for the digital age. 

# Instructions for user 
This is a simple Dots & Boxes inspired sketch built with P5.JS and Socket.IO. It allows multiple users to draw on the same canvas in real-time, with each user assigned a unique letter and color. The sketch includes a grid of dots and instructions for how to play the game. Users can click and drag to draw lines between the dots, and their drawings will be visible to all other connected users. The sketch also displays the user's assigned letter in the bottom right corner of the canvas.

# Acknowldegements
This sketch was built upon the class workshop code. 