"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const drizzle_kit_1 = require("drizzle-kit");
require('dotenv').config();
console.log(process.env);
exports.default = (0, drizzle_kit_1.defineConfig)({
    schema: ["./src/models/users.ts", "./src/models/games.ts"],
    out: './drizzle',
    dialect: 'postgresql',
    dbCredentials: {
        host: "127.0.0.1:5432",
        user: "postgres",
        password: "123",
        database: "test",
    },
});
//# sourceMappingURL=drizzle.config.js.map