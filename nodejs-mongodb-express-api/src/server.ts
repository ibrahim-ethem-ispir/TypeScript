import express from 'express';
import Logging from './library/Logging';
import mongoose, { ConnectOptions } from 'mongoose';
import path from 'path';
import { config } from './config/config';
import authorRouters from './routes/author.routes';
import booksRouters from './routes/books.routes';

const app = express();

mongoose.set({ strictQuery: true });
mongoose
    .connect(config.mongo.url, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    } as ConnectOptions)
    .then(() => {
        Logging.info('MongoDB bağlantısı başarıyla sağlandı.');
        startServer();
    })
    .catch((err) => {
        Logging.error('MongoDB bağlantı Hatası');
        Logging.error(err);
    });

const startServer = () => {
    app.use((req, res, next) => {
        Logging.info(`Incomming Method: [${req.method}] - Url : [${req.url}] - İp: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            Logging.info(`Incomming Method: [${req.method}] - Url : [${req.url}] - İp: [${req.socket.remoteAddress}] - Status : [${req.statusCode}]`);
        });

        next();
    });
    app.use(express.static(path.join(__dirname, 'public')));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));

    // routers

    app.use('/api/author', authorRouters);
    app.use('/api/books', booksRouters);

    app.get('/ping', (req, res) => {
        res.status(200).json({ message: 'Hoş Geldiniz ...' });
    });

    app.use((req, res) => {
        const error = new Error('Not Found !');
        Logging.error(error);

        return res.status(404).json({
            message: error.message
        });
    });

    app.listen(config.server.port, () => {
        Logging.info(`Server listening on [${config.server.port}]`);
    });
};
