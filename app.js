// Import Libraries and Setup

import express from "express";
import http from "http";
import { Server } from "socket.io";

//// REMOVE IF YOU PUT ON RENDER //////
import open, {openApp, apps} from 'open';//only needed for a simple development tool remove if hosting online see above
//// REMOVE IF YOU PUT ON RENDER //////

const app = express();
const server = http.createServer(app);//socket.io needs an http server
const io = new Server(server);
const port = process.env.PORT || 3500;

//Tell our Node.js Server to host our P5.JS sketch from the public folder
app.use(express.static("public"));

// Setup Our Node.js server to listen to connections
server.listen(port, () => {
  console.log("listening on: "+port);
});

//// REMOVE IF YOU PUT ON RENDER //////
//open in browser: dev environment only!
await open(`http://localhost:${port}`);//opens in your default browser
//// REMOVE IF YOU PUT ON RENDER //////

let userCount = 0;
const userLetters = ['A', 'B', 'C', 'D', 'E', 'F']; // multiple users will be assigned letters in order of connection, can be expanded for more users
let connectedUsers = {}; // track connected users

// Callback function for when our P5.JS sketch connects 
io.on("connection", (socket) => {
  const userLetter = userLetters[userCount % userLetters.length];
  const userId = userCount;
  userCount++;
  connectedUsers[socket.id] = { letter: userLetter, id: userId };
  
  // Send user letter to the connected client
  socket.emit("assignUser", userLetter);
  console.log(`User ${userLetter} connected with socket id: ${socket.id}`);
  
  socket.on("drawing", (data) => {
  io.emit("drawing", data); // send to everyone including the sender
  console.log(data);
  });
  
  socket.on("disconnect", () => {
    delete connectedUsers[socket.id];
    console.log(`User ${userLetters[userId]} disconnected`);
  });



  ////IMPLEMENT MULTI-USER DRAWING////



  ////IMPLEMENT MULTI-USER DRAWING//
});

