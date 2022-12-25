// import mongoose, { ConnectOptions } from 'mongoose';
// import { config } from './config';
// import Logging from '../library/Logging';
// import express from 'express';
// import path from 'path';
// const router = express.Router();

// mongoose.set({ strictQuery: true });
// mongoose
//     .connect(config.mongo.url, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     } as ConnectOptions)
//     .then(() => {
//         Logging.info('MongoDB bağlantısı başarıyla sağlandı.');
//         startServer();
//     })
//     .catch((err) => {
//         Logging.error('MongoDB bağlantı Hatası');
//         Logging.error(err);
//     });

// const startServer = () => {
//     router.use((req, res, next) => {
//         Logging.info(`Incomming Method: [${req.method}] - Url : [${req.url}] - İp: [${req.socket.remoteAddress}]`);

//         res.on('finish', () => {
//             Logging.info(`Incomming Method: [${req.method}] - Url : [${req.url}] - İp: [${req.socket.remoteAddress}] - Status : [${req.statusCode}]`);
//         });

//         next();
//     });
//     router.use(express.static(path.join(__dirname, 'public')));
//     router.use(express.json());
//     router.use(express.urlencoded({ extended: true }));

//     router.get('/', (req, res) => {
//         res.status(200).json({ message: 'Hoş Geldiniz ...' });
//     });
// };

// // const connection = mongoose.connection;

// // connection.once('open', () => {
// //     console.log('MongoDB bağlantısı başarıyla sağlandı.');
// // });

// // connection.once('error', (error) => {
// //     console.error('MongoDB Bağlantı Hatası : ', error);
// // });
