"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const books_controller_1 = __importDefault(require("../controllers/books.controller"));
const router = express_1.default.Router();
router.post('/create', books_controller_1.default.createBooks);
router.get('/get', books_controller_1.default.readAllBooks);
router.get('/get/:id', books_controller_1.default.readBooks);
router.put('/update/:id', books_controller_1.default.updateBooks);
router.delete('/delete/:id', books_controller_1.default.deleteBooks);
module.exports = router;
