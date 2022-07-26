const { faker } = require('@faker-js/faker')

faker.locale = 'es'

const createRandomProduct = () => {
    return {
        title: faker.commerce.product(),
        price: faker.commerce.price(),
        thumbnail: faker.image.imageUrl()
    }
}

const createRandomProductList = (quantity = 5) => {
    const productList = []
    for(let i = 0; i < quantity; i++) {
        productList.push(createRandomProduct())
    }
    return productList;
}

module.exports = createRandomProductList;