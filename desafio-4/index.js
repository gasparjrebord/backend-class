const express = require('express');
const Container = require('./container')
const container = new Container("products.json");

const app = express();
const router = express.Router();

app.use(express.static('public'));

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/products', router);



router.get('/', async (req, res) => {
    const products = await container.getAll();
    res.status(200).json(products)
})


router.get('/:id', async (req, res) => {
    const {id} = req.params;
    const product = await container.getById(id);
    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404).json({error: "Producto no encontrado"});
    } 
})


router.post('/', async (req, res) => {
    const {body} = req;
    const newProductId = await container.save(body);
    res.status(200).send(`Producto agregado con el ID: ${newProductId}`)
})


router.put('/:id', async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    const wasUpdated = await container.updateById(id, body);
    if (wasUpdated) {
        res.status(200).send(`El producto de ID: ${id} fue actualizado`)
    } else {
        res.status(404).send(`El producto no fue actualizado porque no se encontró el ID: ${id}`);
    }
})


router.delete('/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await container.deleteById(id);
    if (wasDeleted) {
        res.status(200).send(`El producto de ID: ${id} fue borrado`)
    } else {
        res.status(404).send(`El producto no fue borrado porque no se encontró el ID: ${id}`);
    }
})


const PORT = 8080;
const server = app.listen(PORT, () => {
console.log(` >>>>> Server started at http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));