const db = require('../data/db.json');
const writeFileAsync = require('util').promisify(require('fs').writeFile);

class Model {
    static async index() {
        return db;
    }
}

module.exports = Model;
