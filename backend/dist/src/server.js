"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// src/index.ts
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(require("./controllers/userController"));
const cors_1 = __importDefault(require("cors"));
const socketController_1 = __importDefault(require("./controllers/socketController"));
const node_http_1 = require("node:http");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json({ limit: '50mb' }));
const port = 5000;
const server = (0, node_http_1.createServer)(app);
socketController_1.default.init(server);
app.get('/', (req, res) => {
    res.send('Hello, TypeScript with Express!????');
});
app.post('/test', (req, res) => {
    new userController_1.default().register(req, res);
});
app.post('/login', (req, res) => {
    new userController_1.default().login(req, res);
});
server.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
//# sourceMappingURL=server.js.map