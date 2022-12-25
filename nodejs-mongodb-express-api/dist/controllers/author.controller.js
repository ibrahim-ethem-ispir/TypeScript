"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Author_model_1 = __importDefault(require("../models/Author.model"));
const createAuthor = (req, res, next) => {
    const { name } = req.body;
    const authorSave = new Author_model_1.default({
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
const readAuthor = (req, res, next) => {
    const authorId = req.params.id;
    return Author_model_1.default.findById(authorId)
        .then((data) => {
        data ? res.status(200).json(data) : res.status(404).json({ message: 'Author not found !' });
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
};
const readAllAuthor = (req, res, next) => {
    return Author_model_1.default.find({})
        .then((data) => {
        res.status(200).json(data);
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
};
const updateAuthor = (req, res, next) => {
    const authorId = req.params.id;
    const { name } = req.body;
    return Author_model_1.default.findByIdAndUpdate(authorId, { name })
        .then((data) => {
        data ? res.status(200).json(data) : res.status(404).json({ message: 'Author not found' });
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
};
const deleteAuthor = (req, res, next) => {
    const authorId = req.params.id;
    return Author_model_1.default.findByIdAndDelete(authorId)
        .then((data) => {
        data ? res.status(200).json(data) : res.status(404).json({ message: 'Author not found !' });
    })
        .catch((error) => {
        res.status(500).json({ error });
    });
};
exports.default = {
    createAuthor,
    readAllAuthor,
    readAuthor,
    deleteAuthor,
    updateAuthor
};
