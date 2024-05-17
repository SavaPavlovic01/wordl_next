// src/index.ts
import express from 'express';

import { Client } from 'pg';
import { drizzle } from "drizzle-orm/node-postgres";
import UserController from './controllers/userController';
import { Server, Socket } from 'socket.io';
import { createServer } from 'node:http'
import cors from 'cors'
import lobbyController from './controllers/lobbyController';



const app = express();
app.use(cors())
app.use(express.json({limit:'50mb'}))
const port = 5000;

const server = createServer(app)
const io = new Server(server, {cors:{
  origin: "http://localhost:3000",
  methods: ["GET", "POST"]
}})

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!????');
});

app.post('/test', (req, res) => {
  new UserController().register(req, res);
});

app.post('/login', (req, res) => {
  new UserController().login(req, res);
});

io.on('connection', (socket:Socket) => {

  socket.on('findMatch', (data:any) =>{
    let controll:lobbyController = lobbyController.getInstance();
    let res = controll.findOpponent(data.id, data.rating);
    if(!socket.rooms.has(String(data.id))) socket.join(String(data.id));
    console.log(socket.rooms)
    console.log(socket.connected)
    console.log(socket.id)
    if(res != -1){
      console.log(data.id)
      
      console.log('sending foundMatch to users')
      socket.to(String(res)).emit('foundMatch', data.id)
      socket.to(String(data.id)).emit('foundMatch', res)
    }
  })

})

io.on('error', function (err) { 
  console.log("Socket.IO Error"); 
  console.log(err.stack); // this is changed from your code in last comment
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
