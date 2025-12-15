import { pgTable, varchar, uuid, text, index } from "drizzle-orm/pg-core";
import { sql } from "drizzle-orm";
import { authorTable } from "./author.model.js";

export const booksTable = pgTable("books", {
    id: uuid().primaryKey().defaultRandom(),
    title: varchar({ length: 100 }).notNull(),
    description: text(),
    authorId: uuid()
        .references(() => authorTable.id)  // Foreign key reference to authors table
        .notNull(),
}, (table) => [
    index("title_search_index")
        .using('gin', sql`to_tsvector('english', ${table.title})`)
]
);