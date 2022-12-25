import express from 'express';
import controller from '../controllers/books.controller';

const router = express.Router();

router.post('/create', controller.createBooks);
router.get('/get', controller.readAllBooks);
router.get('/get/:id', controller.readBooks);
router.put('/update/:id', controller.updateBooks);
router.delete('/delete/:id', controller.deleteBooks);

export = router;
