import   Koa  from 'koa';
import   sendFile  from 'koa-send';
import   fs  from 'fs';
import path from "path";
import { createServer as createViteServer } from 'vite'
import koaConnect from "koa-connect";
import {fileURLToPath} from "url";
import {render} from './dist/server/entry-server.js'
import  manifest from './dist/client/ssr-manifest.json' assert {type: 'json'};

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const resolve = (p) => path.resolve(__dirname, p);

const clientRoot = resolve('dist/client');
const template = fs.readFileSync(resolve('dist/client/index.html'), 'utf-8');
// const render = require('./dist/server/entry-server.js').render;
// const manifest = require('./dist/client/ssr-manifest.json');

(async () => {
    const app = new Koa();

    app.use(async (ctx) => {

        // 请求的是静态资源
        if (ctx.path.startsWith('/assets')) {
            await sendFile(ctx, ctx.path, { root: clientRoot });
            return;
        }

        const [appHtml,state, preloadLinks] = await render(ctx, manifest);

        const html = template
            .replace('<!--preload-links-->', preloadLinks)
            .replace('<!--app-html-->', appHtml)
            .replace('<!--pinia-state-->', state);


        ctx.type = 'text/html';
        ctx.body = html;
    });

    app.listen(8080, () => console.log('started server on http://localhost:8080'));

})();
