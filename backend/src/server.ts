// src/index.ts
import express from 'express';

import { Client } from 'pg';
import { drizzle } from "drizzle-orm/node-postgres";
import UserController from './controllers/userController';
import cors from 'cors'
import lobbyController from './controllers/lobbyController';
import SocketController from './controllers/socketController';
import { createServer } from 'node:http'


const app = express();
app.use(cors())
app.use(express.json({limit:'50mb'}))
const port = 5000;
const server = createServer(app)
SocketController.init(server)

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!????');
});

app.post('/test', (req, res) => {
  new UserController().register(req, res);
});

app.post('/login', (req, res) => {
  new UserController().login(req, res);
});

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
