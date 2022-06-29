const Product = require('../models/Product');
const { parse: urlParse } = require('url');

class ProductController {
    static async get(req, res) {
        const { id } = urlParse(req.url, true).query;
        if (typeof id === 'undefined') {
            res.write(JSON.stringify(Product.read()));
        } else {
            const prod = Product.readById(id);
            if (typeof prod !== 'undefined') res.write(JSON.stringify(prod));
            else res.statusCode = 204;
        }
    }

    static post(req, res) {
        req.on('data', (data) => {
            const body = JSON.parse(data);
            const errors = ProductController.validateFields(body);

            if (errors.length > 0) {
                res.statusCode = 400;
                res.write(JSON.stringify({ errors }));
            } else {
                const product = Product.create(body);
                res.statusCode = 201;
                res.write(JSON.stringify(product));
            }
        });
    }

    static update(req, res) {
        const { id } = urlParse(req.url, true).query;
        if (typeof id === 'undefined') {
            res.statusCode = 404;
        } else {
            req.on('data', (data) => {
                const body = JSON.parse(data);
                const errors = ProductController.validateFields(body);

                if (errors.length > 0) {
                    res.statusCode = 400;
                    res.write(JSON.stringify({ errors }));
                } else {
                    const product = Product.update(id, body);
                    if (product === -1) {
                        res.statusCode = 404;
                        res.write(JSON.stringify({ errors: ['Product does not exist'] }));
                    } else {
                        res.write(JSON.stringify(product));
                    }
                }
            });
        }
    }

    static delete(req, res) {
        const { id } = urlParse(req.url, true).query;
        if (typeof id === 'undefined') {
            res.statusCode = 404;
        } else {
            const product = Product.delete(id);
            if (product === -1) {
                res.statusCode = 404;
                res.write(JSON.stringify({ errors: ['Product does not exist'] }));
            } else {
                res.statusCode = 204;
            }
        }
    }

    static validateFields(product) {
        const errors = [];
        const { name, description, price, image } = product;
        if (typeof name === 'undefined' || name.trim() === '') errors.push('Name is required');
        if (typeof description === 'undefined' || description.trim() === '') errors.push('Description is required');
        if (typeof price === 'undefined') errors.push('Price is required');
        else if (price <= 0) errors.push('Price must be greater than 0');
        if (typeof image === 'undefined' || image.trim() === '') errors.push('Image is required');
        return errors;
    }
}

module.exports = ProductController;
