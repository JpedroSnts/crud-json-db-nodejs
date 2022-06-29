const Model = require('../models/Model');
const HtmlReader = require('../service/HtmlReader');

class ModelController {
    static async index(req, res) {
        const data = await Model.index();
        res.writeHeader(200, { 'Content-Type': 'text/html' });
        res.write(await HtmlReader.index(data));
    }
}

module.exports = ModelController;
