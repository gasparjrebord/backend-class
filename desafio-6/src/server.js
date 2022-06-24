const express = require('express');

const { Server: HttpServer } = require('http');
const { Server: SocketServer } = require('socket.io');
const app = express();
const router = express.Router();
const { engine } = require('express-handlebars');

const httpServer = new HttpServer(app);
const socketServer = new SocketServer(httpServer);

const Container = require('./container');
const productsContainer = new Container("products.json");
const chatContainer = new Container("chat.json");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use('/api', router);

app.set('views', './src/views');
app.set('view engine', 'hbs');

app.engine('hbs', engine({
    extname: '.hbs',
    defaultLayout: 'index.hbs',
    layoutsDir: __dirname + '/views/layouts',
    partialsDir: __dirname + '/views/partials'
}));



socketServer.on('connection', async(socket) => {

    console.log('🟢 User connected')
    
    const products = await productsContainer.getAll();
    socket.emit('productsList', products )
    
    const messages = await chatContainer.getAll();
    socket.emit('messagesList', messages)


    socket.on('newProduct', async(data) => {

        await productsContainer.save(data);
        
        const products = await productsContainer.getAll();
        socketServer.sockets.emit('productsUpdate', products);
    })
    
    socket.on('newMessage', async(data) => {
        await chatContainer.save(data);
        
        const messages = await chatContainer.getAll();
        socketServer.sockets.emit('messagesUpdate', messages);
    });


    socket.on('disconnect', () => {
        console.log('🔴User disconnected')
    })

});


router.get('/', async (req, res) => {
    const messages = await chatContainer.getAll();
    const products = await productsContainer.getAll();
    res.status(200).render('layouts/index', {products: products, messages: messages})
})


router.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await productsContainer.getById(id);
    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404).json({error: "Producto no encontrado"});
    } 
})

router.post('/chat', async (req, res) => {
    const {body} = req;
    await chatContainer.save(body);
    res.status(200)
       .redirect('/api')
})


router.post('/products', async (req, res) => {
    const {body} = req;
    await productsContainer.save(body);
    res.status(200)
       .redirect('/api')
})


router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    const wasUpdated = await productsContainer.updateById(id, body);
    if (wasUpdated) {
        res.status(200).send(`El producto de ID: ${id} fue actualizado`)
    } else {
        res.status(404).send(`El producto no fue actualizado porque no se encontró el ID: ${id}`);
    }
})


router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await productsContainer.deleteById(id);
    if (wasDeleted) {
        res.status(200).send(`El producto de ID: ${id} fue borrado`)
    } else {
        res.status(404).send(`El producto no fue borrado porque no se encontró el ID: ${id}`);
    }
})


const PORT = 8080;
const server = httpServer.listen(PORT, () => {
console.log(` >>>>> Server started at http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));