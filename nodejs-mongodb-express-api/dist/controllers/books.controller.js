"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Books_model_1 = __importDefault(require("../models/Books.model"));
const createBooks = (req, res, next) => {
    const { title, author } = req.body;
    const booksSave = new Books_model_1.default({
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
const readBooks = (req, res, next) => {
    const bookId = req.params.id;
    return Books_model_1.default.findById(bookId)
        .populate('author')
        .then((data) => {
        data ? res.status(200).json(data) : res.status(404).json({ message: 'Books not found !' });
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
};
const readAllBooks = (req, res, next) => {
    return Books_model_1.default.find({})
        .populate('author')
        .then((data) => {
        res.status(200).json(data);
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
};
const updateBooks = (req, res, next) => {
    const bookId = req.params.id;
    const { name } = req.body;
    return Books_model_1.default.findByIdAndUpdate(bookId, { name })
        .then((data) => {
        data ? res.status(200).json(data) : res.status(404).json({ message: 'Books not found' });
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
};
const deleteBooks = (req, res, next) => {
    const bookId = req.params.id;
    return Books_model_1.default.findByIdAndDelete(bookId)
        .then((data) => {
        data ? res.status(200).json(data) : res.status(404).json({ message: 'Books not found !' });
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
};
exports.default = {
    createBooks,
    readAllBooks,
    readBooks,
    deleteBooks,
    updateBooks
};
