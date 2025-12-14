import { pgTable, varchar, uuid, text } from "drizzle-orm/pg-core";
import { authorTable } from "./author.model.js";

export const booksTable = pgTable("books", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    description: text(),
    authorId: uuid()
        .references(() => authorTable.id)  // Foreign key reference to authors table
        .notNull(),
});