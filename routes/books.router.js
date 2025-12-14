import express from 'express';
import {
    createBook, deleteBookById, getAllBooks, getBookById
} from '../controllers/books.controller.js';

const router = express.Router();

router.get('/', getAllBooks);

router.get('/:id', getBookById);

router.post('/', createBook);


router.delete('/:id', deleteBookById);

export default router;