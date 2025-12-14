import 'dotenv/config';
import express from "express";
import booksRouter from "./routes/books.router.js";
import loggerMiddleware from "./middlewares/logger.middleware.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(loggerMiddleware);


// Mount the books router at /books
app.use('/books', booksRouter);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});