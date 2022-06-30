const Product = require('../models/Product');
const HtmlReader = require('../service/HtmlReader');
const { parse: urlParse } = require('url');

class PagesController {
    static async index(req, res) {
        const data = Product.read();
        res.writeHeader(200, { 'Content-Type': 'text/html' });
        res.write(await HtmlReader.index(data));
    }

    static async search(req, res) {
        const { q } = urlParse(req.url, true).query;
        if (typeof q === 'undefined') {
            res.statusCode = 404;
        } else {
            let data = Product.read();
            data = data.filter((prod) => prod.name.toLowerCase().includes(q.toLowerCase()));
            res.writeHeader(200, { 'Content-Type': 'text/html' });
            res.write(await HtmlReader.search(data, q));
        }
    }

    static async product(req, res) {
        const { id } = urlParse(req.url, true).query;
        if (typeof id === 'undefined') {
            res.statusCode = 404;
        } else {
            const data = Product.readById(id);
            if (typeof data === 'undefined') {
                res.statusCode = 404;
            } else {
                res.writeHeader(200, { 'Content-Type': 'text/html' });
                res.write(await HtmlReader.product(data));
            }
        }
    }

    static async create(req, res) {
        res.writeHeader(200, { 'Content-Type': 'text/html' });
        res.write(await HtmlReader.create());
    }

    static async update(req, res) {
        const { id } = urlParse(req.url, true).query;
        if (typeof id === 'undefined') {
            res.statusCode = 404;
        } else {
            const data = Product.readById(id);
            if (typeof data === 'undefined') {
                res.statusCode = 404;
            } else {
                res.writeHeader(200, { 'Content-Type': 'text/html' });
                res.write(await HtmlReader.update(data));
            }
        }
    }
}

module.exports = PagesController;
