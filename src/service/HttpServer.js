const staticPath = require('path').dirname(require.main.filename) + '\\public';
const readFileAsync = require('util').promisify(require('fs').readFile);
const http = require('http');

class HttpServer {
    _server = null;
    _routes = []; // [{ route: '', method: '', routeFunction: (request, response): void}]

    constructor() {
        this._server = http.createServer(async (request, response) => {
            const url = request.url;
            const method = request.method;
            for (let index in this._routes) {
                if (url == this._routes[index].route && method == this._routes[index].method) {
                    await this._routes[index].routeFunction(request, response);
                    response.end();
                    return;
                }
            }
            try {
                const data = await readFileAsync(staticPath + request.url);
                response.writeHead(200);
                response.end(data);
            } catch (error) {
                this._throwRouteError(request, response);
            }
        });
    }

    get(route, routeFunction) {
        this._routes.push({ route, routeFunction, method: 'GET' });
    }

    post(route, routeFunction) {
        this._routes.push({ route, routeFunction, method: 'POST' });
    }

    put(route, routeFunction) {
        this._routes.push({ route, routeFunction, method: 'PUT' });
    }

    delete(route, routeFunction) {
        this._routes.push({ route, routeFunction, method: 'DELETE' });
    }

    patch(route, routeFunction) {
        this._routes.push({ route, routeFunction, method: 'PATCH' });
    }

    _throwRouteError(req, res) {
        res.statusCode = 404;
        res.write(`{"error": "Cannot ${req.method} ${req.url}"}`);
        res.end();
    }

    listen(port, hostname, callback) {
        if (typeof port === 'undefined' || typeof port !== 'number') throw Error('Invalid port format');
        if (typeof callback === 'undefined') {
            this._server.listen(port, hostname);
        } else if (typeof hostname === 'undefined') {
            this._server.listen(port);
        } else {
            this._server.listen(port, hostname, callback);
        }
    }
}

module.exports = HttpServer;
