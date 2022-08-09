const Container = require("../containers/container");
const config = require('../utils/config');

const productDao = new Container(config.MONGO_URI, "commerce", "products");

module.exports = productDao;
