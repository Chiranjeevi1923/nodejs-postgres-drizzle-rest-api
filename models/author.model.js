import { pgTable, varchar, uuid } from "drizzle-orm/pg-core";

export const authorTable = pgTable("authors", {
    id: uuid().primaryKey().defaultRandom(),
    firstName: varchar({ length: 55 }).notNull(),
    lastName: varchar({ length: 55 }),
    email: varchar({ length: 255 }).notNull().unique(),
});