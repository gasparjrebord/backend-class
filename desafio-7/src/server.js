const express = require('express');
const app = express();

const Container = require('./container');
const productContainer = new Container("products.json", ["timestamp", "title", "price", "description", "code", "image", "stock"]);
const cartContainer = new Container("cart.json", ["timestamp", "products"])

const dotenv = require('dotenv');
dotenv.config();
console.log(`Port... ${process.env.TOKEN}`);

const router = express.Router();

app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/api', router);

// AUTHENTICATION MIDDLEWARE

const authMiddleware = app.use((req, res, next) => {
    if (req.header('authorization') == process.env.TOKEN) {
        next()
    } else {
        res.status(401).json({error : `Unauthorized`})
    }
})

////////// PRODUCT ROUTES

// GET ALL

router.get('/products', async (req, res) => {
    const products = await productContainer.getAll();
    res.status(200).json(products);
})

// GET BY ID

router.get('/products/:id', async (req, res) => {
    const {id} = req.params;
    const product = await productContainer.getById(id);
    if (product) {
        res.status(200).json(product)
    } else {
        res.status(404).json({error: `Product not found`});
    } 
})

// POST

router.post('/products', authMiddleware, async (req, res) => {
    const {body} = req;

    body.timestamp = Date.now();

    const newProductId = await productContainer.save(body);

    if (newProductId) {
        res.status(200).json({success : `Product added with ID: ${newProductId}`});
    } else {
        res.status(404).json({error: `Invalid, please verify`});
    } 
})

// PUT

router.put('/products/:id', authMiddleware, async (req, res) => {
    const {id} = req.params;
    const {body} = req;
    const wasUpdated = await productContainer.updateById(id, body);

    if (wasUpdated) {
        res.status(200).json({success :`Product with ID: ${id} was updated`})
    } else {
        res.status(404).json({error: `Product with ID: ${id} not found`});
    }
})

// DELETE

router.delete('/products/:id', authMiddleware, async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await productContainer.deleteById(id);

    if (wasDeleted) {
        res.status(200).send({success : `Product with ID: ${id} was deleted`})
    } else {
        res.status(404).send({error : `Product with ${id} was not deleted`});
    }
})


////////// CART ROUTES

// CART POST

router.post('/cart', async (req, res) => {
    const {body} = req;
    body.timestamp = Date.now(); 
    const newCartId = await cartContainer.save(body); 


    if (newCartId) {
        res.status(200).json({success : `Product added to cart with ID: ${newCartId}`});
    } else {
        res.status(404).json({error: `Invalid, please verify`});
    } 
})

// CART POST ID /api/cart/:id/products
router.post('/cart/:id/products', async(req,res) => {
    const {id} = req.params;
    const { body } = req;
    
    const product = await productContainer.getById(body['id']);    
    
    if (product) {
        const cartExist = await cartContainer.addToArrayById(id, {"products": product});

        if (cartExist) {
            res.status(200).json({success : "Product added to cart"})
        } else {
            res.status(404).json({error: `Product in cart not found`})
        }

    } else {
        res.status(404).json({error: "product not found, verify the ID in the body content is correct."})
    }
})

// CART DELETE

router.delete('/cart/:id', async (req, res) => {
    const {id} = req.params;
    const wasDeleted = await cartContainer.deleteById(id);

    if (wasDeleted) {
        res.status(200).json({success : `Product with ID: ${id} was deleted from cart`})
    } else {
        res.status(404).json({error : `Product with ${id} was not deleted`});
    }
})

router.delete('/cart/:id/products/:id_prod', async (req, res) => {
    const {id, id_prod} = req.params;
    const productExists = await productContainer.getById(id_prod);

    if (productExists) {
        const cartExists = await carrito.removeFromArrayById(id, id_prod, 'products')
        if (cartExists) {
            res.status(200).json({success : `Product with ID: ${id} was deleted from cart`})
        } else {
            res.status(404).json({error: `Product in cart not found`});
        }
    } else {
        res.status(404).json({error : `Product with ${id} was not deleted`});
    }
})



// CART GET BY ID

router.get('/cart/:id/products', async (req, res) => {
    const {id} = req.params;
    const cart = await cartContainer.getById(id);

    if (cart) {
        res.status(200).json(cart.products)
    } else {
        res.status(404).json({error: `Product in cart not found`});
    } 
})






const PORT = 8080;
const server = app.listen(PORT, () => {
console.log(` >>>>> Server started at http://localhost:${PORT}`)
})

server.on('error', (err) => console.log(err));