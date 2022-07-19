const express = require('express');
const { Server: SocketServer} = require("socket.io");
const { Server: HttpServer } = require("http");

const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

const chatDao = require('./daos/chatDao');
const productDao = require('./daos/productDao');
const createRandomProductList = require('./faker');
const normalizedChats = require('./normalizr');

const mongodbUri = require("./config");
const isLoggedIn = require("./middlewares/login");
const sessionRouter = require("./routes/session");
const app = express();
const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
        secret: "secret",
        saveUninitialized: false,
        resave: false,
        rolling: true,
        store: MongoStore.create({
            mongoUrl: mongodbUri,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        }),
        cookie: {
        maxAge: 600000
        }
}));

app.get('/', isLoggedIn);

app.use(express.static("public"));

app.use('/', sessionRouter);

//random products
app.get('/api/products-test', (req, res, next) => {
    const products = createRandomProductList();
    res.json(products);
});

// websockets
socketServer.on('connection', async (socket) => {
    console.log('new connection');

    socket.emit('init', await productDao.getAll());
    socket.emit('chatInit', normalizedChats(await chatDao.getAll()));
    socket.on('newProduct', async (newProduct) => {
        await productDao.addItem(newProduct);
        socketServer.sockets.emit('productUpdate', await productDao.getAll());
    });
    socket.on('newMessage', async (newMessage) => {
        await chatDao.addItem(newMessage);
        socketServer.sockets.emit('chatUpdate', normalizedChats(await chatDao.getAll()));
    });
});

const PORT = 8080;
const server = httpServer.listen(PORT, () => {
console.log(`Server started at http://localhost:${PORT}`)
});

server.on('error', (err) => console.log(err));