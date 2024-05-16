"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gameRelations = exports.games = void 0;
const drizzle_orm_1 = require("drizzle-orm");
const pg_core_1 = require("drizzle-orm/pg-core");
const users_1 = require("./users");
exports.games = (0, pg_core_1.pgTable)('games', {
    id: (0, pg_core_1.serial)('id').primaryKey(),
    player1_id: (0, pg_core_1.integer)('player1_id').notNull(),
    player2_id: (0, pg_core_1.integer)('player2_id').notNull(),
    game_date: (0, pg_core_1.date)('game_date').notNull(),
    state: (0, pg_core_1.text)('state').notNull().default(''),
    result: (0, pg_core_1.char)('result').notNull().default('0'),
    word: (0, pg_core_1.text)('word').notNull()
});
exports.gameRelations = (0, drizzle_orm_1.relations)(exports.games, ({ one }) => ({
    player1: one(users_1.users, { fields: [exports.games.player1_id], references: [users_1.users.id] }),
    player2: one(users_1.users, { fields: [exports.games.player2_id], references: [users_1.users.id] })
}));
//# sourceMappingURL=games.js.map