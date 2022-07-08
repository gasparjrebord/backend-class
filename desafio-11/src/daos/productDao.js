const Container = require("../containers/container");
const mongodbUri = require("../config");

const productDao = new Container(mongodbUri, "commerce", "products");

module.exports = productDao;
