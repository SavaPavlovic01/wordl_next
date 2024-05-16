import { relations } from "drizzle-orm";
import { bigint, integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import { games } from "./games";

export const users = pgTable('users', {
    id:serial('id').primaryKey(),
    email:text('email').notNull().unique(),
    password:text('password').notNull(),
    wins:integer('wins').notNull().default(0),
    losses:integer('losses').notNull().default(0),
    rating:integer('rating').notNull().default(1000)
});

export const userRelations = relations(users, ({ many }) => ({
    player1:many(games),
    player2:many(games)
}));