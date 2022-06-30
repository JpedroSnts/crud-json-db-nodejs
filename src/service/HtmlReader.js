const viewsPath = require('path').dirname(require.main.filename) + '\\views';
const readFileAsync = require('util').promisify(require('fs').readFile);

class HtmlReader {
    static async _addPageToLayout(page, title) {
        let layout = await readFileAsync(`${viewsPath}\\layout\\index.html`);
        return layout.toString().replace('{{{BODY}}}', page.toString()).replace('{{{TITLE}}}', title);
    }

    static async index(products) {
        const $page = await readFileAsync(`${viewsPath}\\home.html`);
        const $cardProduct = await readFileAsync(`${viewsPath}\\partials\\cardProduct.html`);
        let $cardsProducts = '';
        for (let i in products) {
            $cardsProducts += $cardProduct
                .toString()
                .replaceAll('{{{PRODUCT_ID}}}', products[i].id)
                .replaceAll('{{{PRODUCT_NAME}}}', products[i].name)
                .replaceAll('{{{PRODUCT_PRICE}}}', products[i].price.toFixed(2))
                .replaceAll('{{{PRODUCT_IMAGE}}}', products[i].image);
        }
        if (products.length === 0) $cardsProducts = '<h4>No Product Registered</h4>';
        const $replacedPage = $page.toString().replaceAll('{{{PRODUCTS}}}', $cardsProducts);
        return this._addPageToLayout($replacedPage, 'Products');
    }

    static async search(products, query) {
        const $page = await readFileAsync(`${viewsPath}\\search.html`);
        const $cardProduct = await readFileAsync(`${viewsPath}\\partials\\cardProduct.html`);
        let $cardsProducts = '';
        for (let i in products) {
            $cardsProducts += $cardProduct
                .toString()
                .replaceAll('{{{PRODUCT_ID}}}', products[i].id)
                .replaceAll('{{{PRODUCT_NAME}}}', products[i].name)
                .replaceAll('{{{PRODUCT_PRICE}}}', products[i].price.toFixed(2))
                .replaceAll('{{{PRODUCT_IMAGE}}}', products[i].image);
        }
        if (products.length === 0) $cardsProducts = '<h4>No Products Found</h4>';
        const $replacedPage = $page
            .toString()
            .replaceAll('{{{PRODUCTS}}}', $cardsProducts)
            .replaceAll('{{{QUERY}}}', query);
        return this._addPageToLayout($replacedPage, 'Products');
    }

    static async create() {
        const $page = await readFileAsync(`${viewsPath}\\createProduct.html`);
        return this._addPageToLayout($page, 'Create Product');
    }

    static async product(product) {
        let $page = await readFileAsync(`${viewsPath}\\product.html`);
        $page = $page
            .toString()
            .replaceAll('{{{PRODUCT_ID}}}', product.id)
            .replaceAll('{{{PRODUCT_NAME}}}', product.name)
            .replaceAll('{{{PRODUCT_DESCRIPTION}}}', product.description)
            .replaceAll('{{{PRODUCT_PRICE}}}', product.price.toFixed(2))
            .replaceAll('{{{PRODUCT_IMAGE}}}', product.image);
        return this._addPageToLayout($page, `Product - ${product.name}`);
    }

    static async update(product) {
        let $page = await readFileAsync(`${viewsPath}\\editProduct.html`);
        $page = $page
            .toString()
            .replaceAll('{{{PRODUCT_ID}}}', product.id)
            .replaceAll('{{{PRODUCT_NAME}}}', product.name)
            .replaceAll('{{{PRODUCT_DESCRIPTION}}}', product.description)
            .replaceAll('{{{PRODUCT_PRICE}}}', product.price.toFixed(2))
            .replaceAll('{{{PRODUCT_IMAGE}}}', product.image);
        return this._addPageToLayout($page, `Edit - ${product.name}`);
    }
}

module.exports = HtmlReader;
