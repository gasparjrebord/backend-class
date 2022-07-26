const Container = require("../containers/container");
const config = require('../config');

const chatDao = new Container(config.MONGO_URI, 'commerce', 'chats')

module.exports = chatDao;
