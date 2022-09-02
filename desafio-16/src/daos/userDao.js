const Container = require("../containers/container");
const config = require('../utils/config');

const userDao = new Container(config.MONGO_URI, 'commerce', 'users')

module.exports = userDao;
