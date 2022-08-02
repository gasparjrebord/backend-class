const express = require('express');
const { Server: SocketServer} = require("socket.io");
const { Server: HttpServer } = require("http");

const config = require('./utils/config.js');
const passport = require('./utils/passport');
const session = require("express-session");
const cookieParser = require("cookie-parser");
const MongoStore = require("connect-mongo");
const { fork } = require('child_process');
const randomNumberFork = fork('./src/utils/randomNum.js')
const { isLoggedIn  } = require("./middlewares/login");
const { info } = require('./utils/info');
const chatDao = require('./daos/chatDao');
const productDao = require('./daos/productDao');
const normalizedChats = require('./utils/normalizr');
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
app.use(passport.initialize());
app.use(passport.session());

app.get('/', isLoggedIn);

app.use(express.static("public"));

app.use('/', sessionRouter);

//random
app.get('/api/randoms', (req, res, next) => {
    const quantity = req.query.cant || 100000;
    randomNumberFork.on('message', (result) => {
        res.status(200).json(result);
    })
    randomNumberFork.send(quantity);
});

//info
app.get('/api/info', (req, res, next) => {
    const systemInfo = info;
    res.status(200).json(systemInfo);
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