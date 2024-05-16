// src/index.ts
import express from 'express';
import { Client } from 'pg';
import { drizzle } from "drizzle-orm/node-postgres";



const app = express();
const port = 5000;

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

const client = new Client({
    connectionString: "postgres://postgres:123@127.0.0.1:5432/test",
})

client.connect().then(()=>{
    console.log("Connected to db");
})
const db = drizzle(client)

console.log(process.env)

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});