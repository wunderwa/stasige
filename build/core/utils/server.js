import http from 'node:http';
import finalhandler from 'finalhandler';
import serveStatic from 'serve-static';
import open from 'open';
import { green, red, yellow } from './colored.js';
const status = (code) => {
    if (code >= 200 && code < 300) {
        return green(code);
    }
    else if (code >= 300 && code < 400) {
        return yellow(code);
    }
    else if (code >= 400) {
        return red(code);
    }
    return `${code}`;
};
export const startServer = ({ root = './', port = 8000, host = 'localhost', openBrowser = true, onlyError = true, }) => {
    const protocol = 'http';
    const url = `${protocol}://${host}:${port}`;
    const serveStat = serveStatic(root, {
        fallthrough: false,
    });
    const server = http.createServer(function (req, res) {
        const done = finalhandler(req, res, {
            onerror: (_, { method, url }, { statusCode }) => {
                console.log(`[${status(statusCode)}] ${method}  ${url}`);
            },
        });
        serveStat(req, res, done);
    });
    server.on('listening', async () => {
        console.log(`http server ${url}`);
        if (openBrowser) {
            await open(url);
        }
    });
    server.on('request', ({ method, url }, { statusCode }) => {
        if (!onlyError)
            console.log(`[${status(statusCode)}] ${method}  ${url}`);
    });
    server.listen(port, host);
    return server;
};
