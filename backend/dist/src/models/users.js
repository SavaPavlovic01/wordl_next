"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRelations = exports.users = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const games_1 = require("./games");
exports.users = (0, pg_core_1.pgTable)('users', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    email: (0, pg_core_1.text)('email').notNull().unique(),
    username: (0, pg_core_1.text)('username').notNull().unique(),
    password: (0, pg_core_1.text)('password').notNull(),
    wins: (0, pg_core_1.integer)('wins').notNull().default(0),
    losses: (0, pg_core_1.integer)('losses').notNull().default(0),
    rating: (0, pg_core_1.integer)('rating').notNull().default(1000)
});
exports.userRelations = (0, drizzle_orm_1.relations)(exports.users, ({ many }) => ({
    player1: many(games_1.games),
    player2: many(games_1.games)
}));
//# sourceMappingURL=users.js.map