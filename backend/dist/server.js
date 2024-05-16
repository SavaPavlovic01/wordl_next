"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const pg_1 = require("pg");
const node_postgres_1 = require("drizzle-orm/node-postgres");
const app = (0, express_1.default)();
const port = 5000;
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!');
});
const client = new pg_1.Client({
    connectionString: "postgres://postgres:123@127.0.0.1:5432/test",
});
client.connect().then(() => {
    console.log("Connected to db");
});
const db = (0, node_postgres_1.drizzle)(client);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map