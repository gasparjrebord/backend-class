const express = require('express');
const { Server: SocketServer} = require("socket.io");
const { Server: HttpServer } = require("http");

const config = require('./config.js');
const passport = require('./passport');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");

const chatDao = require('./daos/chatDao');
const productDao = require('./daos/productDao');
const createRandomProductList = require('./faker');
const normalizedChats = require('./normalizr');

const isLoggedIn = require("./middlewares/login");
const sessionRouter = require("./routes/session");

const app = express();
const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({
        secret: config.SECRET,
        saveUninitialized: false,
        resave: false,
        rolling: true,
        store: MongoStore.create({
            mongoUrl: config.MONGO_URI,
            mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },
        }),
        cookie: {maxAge: 600000} //10 min.
}));
app.use(passport.initialize())
app.use(passport.session())

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

const server = httpServer.listen(config.PORT, () => {
console.log(`>>>>>Server started at http://localhost:${config.PORT}`)
});

server.on('error', (err) => console.log(err));