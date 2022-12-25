import { NextFunction, Request, Response, response } from 'express';
import mongoose from 'mongoose';
import Author from '../models/Author.model';

const createAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    const authorSave = new Author({
        name
    });

    return authorSave
        .save()
        .then((data) => {
            res.status(201).json(data);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};
const readAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.id;

    return Author.findById(authorId)
        .then((data) => {
            data ? res.status(200).json(data) : res.status(404).json({ message: 'Author not found !' });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};
const readAllAuthor = (req: Request, res: Response, next: NextFunction) => {
    return Author.find({})
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};
const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.id;
    const { name } = req.body;

    return Author.findByIdAndUpdate(authorId, { name })
        .then((data) => {
            data ? res.status(200).json(data) : res.status(404).json({ message: 'Author not found' });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};
const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.id;

    return Author.findByIdAndDelete(authorId)
        .then((data) => {
            data ? res.status(200).json(data) : res.status(404).json({ message: 'Author not found !' });
        })
        .catch((error) => {
            res.status(500).json({ error });
        });
};

export default {
    createAuthor,
    readAllAuthor,
    readAuthor,
    deleteAuthor,
    updateAuthor
};
