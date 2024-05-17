"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("./controllers/userController"));
const socket_io_1 = require("socket.io");
const node_http_1 = require("node:http");
const cors_1 = __importDefault(require("cors"));
const lobbyController_1 = __importDefault(require("./controllers/lobbyController"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
const port = 5000;
const server = (0, node_http_1.createServer)(app);
const io = new socket_io_1.Server(server, { cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    } });
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!????');
});
app.post('/test', (req, res) => {
    new userController_1.default().register(req, res);
});
app.post('/login', (req, res) => {
    new userController_1.default().login(req, res);
});
io.on('connection', (socket) => {
    socket.on('findMatch', (data) => {
        let controll = lobbyController_1.default.getInstance();
        let res = controll.findOpponent(data.id, data.rating);
        if (!socket.rooms.has(String(data.id)))
            socket.join(String(data.id));
        console.log(socket.rooms);
        console.log(socket.connected);
        console.log(socket.id);
        if (res != -1) {
            console.log(data.id);
            console.log('sending foundMatch to users');
            socket.to(String(res)).emit('foundMatch', data.id);
            socket.to(String(data.id)).emit('foundMatch', res);
        }
    });
});
io.on('error', function (err) {
    console.log("Socket.IO Error");
    console.log(err.stack); // this is changed from your code in last comment
});
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map