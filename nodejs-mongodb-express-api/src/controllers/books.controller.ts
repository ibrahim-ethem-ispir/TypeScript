import { NextFunction, Request, Response, response } from 'express';
import Books from '../models/Books.model';

const createBooks = (req: Request, res: Response, next: NextFunction) => {
    const { title, author } = req.body;

    const booksSave = new Books({
        title,
        author
    });

    return booksSave
        .save()
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};
const readBooks = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.id;

    return Books.findById(bookId)
        .populate('author')
        .then((data) => {
            data ? res.status(200).json(data) : res.status(404).json({ message: 'Books not found !' });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};
const readAllBooks = (req: Request, res: Response, next: NextFunction) => {
    return Books.find({})
        .populate('author')
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};
const updateBooks = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.id;
    const { name } = req.body;

    return Books.findByIdAndUpdate(bookId, { name })
        .then((data) => {
            data ? res.status(200).json(data) : res.status(404).json({ message: 'Books not found' });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};
const deleteBooks = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.id;

    return Books.findByIdAndDelete(bookId)
        .then((data) => {
            data ? res.status(200).json(data) : res.status(404).json({ message: 'Books not found !' });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

export default {
    createBooks,
    readAllBooks,
    readBooks,
    deleteBooks,
    updateBooks
};
