// src/index.ts
import express from 'express';

import { Client } from 'pg';
import { drizzle } from "drizzle-orm/node-postgres";
import UserController from './controllers/userController';
//import { UserController } from './controllers/userController';


const app = express();

app.use(express.json({limit:'50mb'}))
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!????');
});

app.post('/test', (req, res) => {
  new UserController().register(req, res);
});


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
