const viewsPath = require('path').dirname(require.main.filename) + '\\views';
const readFileAsync = require('util').promisify(require('fs').readFile);

class HtmlReader {
    static async index({ author, project }) {
        const html = await readFileAsync(`${viewsPath}\\index.html`);
        const page = html
            .toString()
            .replaceAll('{{author-name}}', author.name)
            .replaceAll('{{author-link}}', author.link)
            .replaceAll('{{project-name}}', project.name)
            .replaceAll('{{project-link}}', project.link);
        return page;
    }
}

module.exports = HtmlReader;
