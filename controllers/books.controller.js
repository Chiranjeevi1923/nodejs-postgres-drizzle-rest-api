import { booksTable } from "../models/book.model.js";
import db from "../db/index.js";
import { eq, sql } from "drizzle-orm";
import { authorTable } from "../models/author.model.js";

export const getAllBooks = async (req, res) => {
    try {
        const search = req.query.search?.trim() || "";

        if (search && search !== "") {
            const result = await db
                .select()
                .from(booksTable)
                .where(
                    sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`
                )
                .leftJoin(authorTable, eq(booksTable.authorId, authorTable.id));


            return res.json(result);
        }

        const result = await db.select()
        .from(booksTable)
        .leftJoin(authorTable, eq(booksTable.authorId, authorTable.id));
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong, please try again later." });
    }
};

export const getBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        const book = await db
            .select()
            .from(booksTable)
            .where(eq(booksTable.id, bookId))
            .leftJoin(authorTable, eq(booksTable.authorId, authorTable.id))
            .limit(1);

        if (book.length === 0) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.json(book[0]);
    } catch (error) {
        res.status(500).json({ error: "Something went wrong, please try again later." });
    }
};

export const createBook = async (req, res) => {
    try {
        const { title, description, authorId } = req.body;
        if (!title) {
            return res.status(400).json({
                message: "Title is a required field"
            });
        }
        if (!authorId) {
            return res.status(400).json({
                message: "Author ID is a required field"
            });
        }

        const [createdBook] = await db
            .insert(booksTable)
            .values({
                title: title.trim(),
                description: description ? description.trim() : null,
                authorId
            })
            .returning();

        res.status(201).json({
            message: "Book created successfully",
            book: createdBook
        });
    } catch (error) {
        res.status(500).json({ error: "Something went wrong, please try again later." });
    }
};

export const deleteBookById = async (req, res) => {
    try {
        const bookId = req.params.id;
        if (!bookId) return res.status(400).json({
            message: "Book ID is required (/books/:id)"
        });
        const [deletedBook] = await db
            .delete(booksTable)
            .where(eq(booksTable.id, bookId))
            .returning({
                id: booksTable.id
            });
        if (!deletedBook) {
            return res.status(404).json({
                message: "Book not found"
            });
        }

        res.status(200).json({
            message: "Book deleted successfully",
            book: deletedBook
        });

    } catch (error) {
        res.status(500).json(
            {
                error: "Something went wrong, please try again later.",
            }
        );
    }
};
