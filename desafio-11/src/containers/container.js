const { MongoClient } = require("mongodb");

class ContainerMongoDB {
  constructor(connectionString, db, collection) {
    this.mongo = new MongoClient(connectionString);
    this.db = db;
    this.collection = collection;
  }
  async connect() {
    try {
      await this.mongo.connect();
      console.log("Connected to database");
    } catch (error) {
      throw error;
    }
  }
  async getAll() {
    try {
      const data = await this.mongo
        .db(this.db)
        .collection(this.collection)
        .find({})
        .toArray();
      return data;
    } catch (error) {
      throw error;
    }
  }
  async getById(id) {
    try {
      const data = await this.mongo
        .db(this.db)
        .collection(this.collection)
        .findOne({ id: id });
      return data;
    } catch (error) {
      throw error;
    }
  }
  async addItem(data) {
    try {
      await this.mongo
        .db(this.db)
        .collection(this.collection)
        .insertOne(data);
      return data.id;
    } catch (error) {
      throw error;
    }
  }
  async updateItem(id, data) {
    try {
      return await this.mongo
        .db(this.db)
        .collection(this.collection)
        .updateOne({ id:id }, { $set: data });
    } catch (error) {
      throw error;
    }
  }
  async deleteItem(id) {
    try {
      return await this.mongo
        .db(this.db)
        .collection(this.collection)
        .deleteOne({ id: id });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = ContainerMongoDB;