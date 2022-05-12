const Container = require("./container");
const express = require('express');

const app = express();
const PORT = 8080;
const container = new Container("products.json");

app.get('/', (req, res) => {
    res.send('Hi Express Server!')
});

app.get('/products', async (req, res) => {
    const allProducts = await container.getAll();
    res.json(allProducts);
});

app.get('/randomProduct', async (req, res) => {
    const allProducts = await container.getAll();
    const maxId = allProducts.length;
    
    const randomNumber = generateRandomNumber(1, maxId);
    const randomProduct = await container.getById(randomNumber);

    res.json(randomProduct);

})

const generateRandomNumber = (min, max) => {
    return Math.floor((Math.random() * (max+1 -min)) +min);
}

const server = app.listen(PORT, () => {
    console.log(`>>>> Server started at http://localhost:${PORT}`)
})

server.on('error', (error) => console.log(error));