const Container = require("../containers/container");
const config = require('../config');

const productDao = new Container(config.MONGO_URI, "commerce", "products");

module.exports = productDao;
