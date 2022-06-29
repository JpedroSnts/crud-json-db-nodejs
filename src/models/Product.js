const dbPath = require('path').dirname(require.main.filename) + '\\data\\db.json';
const db = require('../data/db.json');
const writeFileAsync = require('util').promisify(require('fs').writeFile);
const { randomUUID } = require('crypto');

class Product {
    static create(item) {
        item.id = randomUUID();
        const { id, name, description, price, image } = item;
        db.push({ id, name, price, description, image });
        writeFileAsync(dbPath, JSON.stringify(db));
        return { id, name, price, description, image };
    }

    static read() {
        return db;
    }

    static readById(id) {
        return db.find((item) => item.id === id);
    }

    static update(id, item) {
        const { name, description, price, image } = item;
        const index = db.findIndex((x) => x.id === id);
        if (index === -1) return index;
        db[index] = { id, name, price, description, image };
        writeFileAsync(dbPath, JSON.stringify(db));
        return { id, name, price, description, image };
    }

    static delete(id) {
        const index = db.findIndex((x) => x.id === id);
        if (index === -1) return index;
        db.splice(index, 1);
        writeFileAsync(dbPath, JSON.stringify(db));
    }
}

module.exports = Product;
