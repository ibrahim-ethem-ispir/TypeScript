"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const author_controller_1 = __importDefault(require("../controllers/author.controller"));
const router = express_1.default.Router();
router.post('/create', author_controller_1.default.createAuthor);
router.get('/get', author_controller_1.default.readAllAuthor);
router.get('/get/:id', author_controller_1.default.readAuthor);
router.put('/update/:id', author_controller_1.default.updateAuthor);
router.delete('/delete/:id', author_controller_1.default.deleteAuthor);
module.exports = router;
