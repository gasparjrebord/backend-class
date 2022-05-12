const fs = require("fs");

class Container {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async createEmptyFile() {
        fs.writeFile(this.fileName, "[]", (error) => {
            if (error) {
                console.log(error)
            } else {
                console.log(`File ${this.fileName} was created`);
            }
        });
    }

    async readFile() {
        try {
            const data = await fs.promises.readFile(this.fileName, 'utf-8');
            return JSON.parse(data);
        } catch (error) {
            if (error) {
                this.createEmptyFile();
            } else {
                console.log(`Error Code: ${error} | There was an unexpected error when trying to read ${this.fileName}`);
            }
            return [];
        }
    }

    async save(title, price, thumbnail) {
        try {
            const data = await this.readFile();
            const newProduct = {
                title,
                price,
                thumbnail,
                id: data.length + 1
            }
            data.push(newProduct);
            await fs.promises.writeFile(this.fileName, JSON.stringify(data));
            return newProduct.id;
        } catch (error) {
            console.log(`Error Code: ${error} | There was an error when trying to save an element`);
        }
    }

    async getById(id) {
        try {
            const data = await this.readFile();
            return data.find((product) => product.id === id);
        } catch (error) {
            console.log(`Error Code: ${error} | There was an error when trying to get an element by its ID (${id})`);
        }
    }

    async getAll() {
        const data = await this.readFile();
        return data;
    }


    async deleteById(id) {
        try {
            const data = await this.readFile();
            const objectIdToBeRemoved = data.find(
                (product) => product.id === id
            );
            if (objectIdToBeRemoved) {
                const index = data.indexOf(objectIdToBeRemoved);
                data.splice(index, 1);
                await fs.promises.writeFile(this.fileName, JSON.stringify(data));
            } else {
                console.log(`ID ${id} does not exist in the file`);
                return null;
            }
        } catch (error) {
            console.log(`Error Code: ${error} | There was an error when trying to delete an element by its ID (${id})`);
        }
    }


    async deleteAll() {
        try {
            await this.createEmptyFile();
        } catch (error) {
            console.log(`There was an error (${error}) when trying to delete all the objects`);
        }
    }
}
module.exports = Container;