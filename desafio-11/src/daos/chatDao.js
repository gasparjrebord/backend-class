const Container = require("../containers/container");
const mongodbUri = require('../config')

const chatDao = new Container(mongodbUri, 'commerce', 'chats')

module.exports = chatDao;
