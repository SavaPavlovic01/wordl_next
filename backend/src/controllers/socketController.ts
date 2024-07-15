import { Server, Socket } from 'socket.io';

import lobbyController from './lobbyController';

class SocketController {

    public static init(server:any){
        
        const io = new Server(server, {cors:{
            origin: "http://localhost:3000",
            methods: ["GET", "POST"]
        }})

        SocketController.findMatch(io)
        SocketController.receiveWord(io)

        io.on('error', function (err) { 
            console.log("Socket.IO Error"); 
            console.log(err.stack); // this is changed from your code in last comment
        });
    }

    private static receiveWord(io:any){
        io.on('connection', (socket:Socket) => {
            socket.on('sendWord', (data:any) => {
                io.to(String(data.opponent)).emit("sendWord", data.word)
            })
          
          })
    }

    private static findMatch(io:any){
        io.on('connection', (socket:Socket) => {
            socket.on('findMatch', (data:any) =>{
              let controll:lobbyController = lobbyController.getInstance();
              let res = controll.findOpponent(data.id, data.rating);
              if(!socket.rooms.has(String(data.id))) socket.join(String(data.id));
              if(res != -1){
                io.to(String(res)).emit('foundMatch', data.id)
                io.to(String(data.id)).emit('foundMatch', res)
              }
            })
        })
    }
}

export default SocketController;