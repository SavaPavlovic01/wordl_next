import { relations } from "drizzle-orm";
import { char, date, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { users } from "./users";

export const games = pgTable('games', {
    id:serial('id').primaryKey(),
    player1_id: integer('player1_id').notNull(),
    player2_id: integer('player2_id').notNull(),
    game_date: date('game_date').notNull(),
    state: text('state').notNull().default(''),
    result: char('result').notNull().default('0')
});

export const gameRelations = relations(games, ({ one }) => ({
    player1: one(users, {fields: [games.player1_id], references: [users.id]}),
    player2: one(users, {fields: [games.player2_id], references: [users.id]})
}))