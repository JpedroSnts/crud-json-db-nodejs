const Product = require('../models/Product');
const HtmlReader = require('../service/HtmlReader');

class PagesController {
    static async index(req, res) {
        const data = Product.read();
        res.writeHeader(200, { 'Content-Type': 'text/html' });
        res.write(await HtmlReader.index(data));
    }
}

module.exports = PagesController;
