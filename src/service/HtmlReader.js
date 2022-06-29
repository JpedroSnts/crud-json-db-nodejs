const viewsPath = require('path').dirname(require.main.filename) + '\\views';
const readFileAsync = require('util').promisify(require('fs').readFile);

class HtmlReader {
    static async index() {
        return await readFileAsync(`${viewsPath}\\index.html`);
    }
}

module.exports = HtmlReader;
