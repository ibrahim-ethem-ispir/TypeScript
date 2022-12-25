"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Logging_1 = __importDefault(require("./library/Logging"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config/config");
const author_routes_1 = __importDefault(require("./routes/author.routes"));
const books_routes_1 = __importDefault(require("./routes/books.routes"));
const app = (0, express_1.default)();
mongoose_1.default.set({ strictQuery: true });
mongoose_1.default
    .connect(config_1.config.mongo.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
    Logging_1.default.info('MongoDB bağlantısı başarıyla sağlandı.');
    startServer();
})
    .catch((err) => {
    Logging_1.default.error('MongoDB bağlantı Hatası');
    Logging_1.default.error(err);
});
const startServer = () => {
    app.use((req, res, next) => {
        Logging_1.default.info(`Incomming Method: [${req.method}] - Url : [${req.url}] - İp: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            Logging_1.default.info(`Incomming Method: [${req.method}] - Url : [${req.url}] - İp: [${req.socket.remoteAddress}] - Status : [${req.statusCode}]`);
        });
        next();
    });
    app.use(express_1.default.static(path_1.default.join(__dirname, 'public')));
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    // routers
    app.use('/api/author', author_routes_1.default);
    app.use('/api/books', books_routes_1.default);
    app.get('/ping', (req, res) => {
        res.status(200).json({ message: 'Hoş Geldiniz ...' });
    });
    app.use((req, res) => {
        const error = new Error('Not Found !');
        Logging_1.default.error(error);
        return res.status(404).json({
            message: error.message
        });
    });
    app.listen(config_1.config.server.port, () => {
        Logging_1.default.info(`Server listening on [${config_1.config.server.port}]`);
    });
};
