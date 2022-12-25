import express from 'express';
import controller from '../controllers/author.controller';

const router = express.Router();

router.post('/create', controller.createAuthor);
router.get('/get', controller.readAllAuthor);
router.get('/get/:id', controller.readAuthor);
router.put('/update/:id', controller.updateAuthor);
router.delete('/delete/:id', controller.deleteAuthor);

export = router;
