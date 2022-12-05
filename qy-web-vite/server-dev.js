import   Koa  from 'koa';
import   fs  from 'fs';
import path from "path";
import { createServer as createViteServer } from 'vite'
import koaConnect from "koa-connect";

async function createServer() {
    const app = new Koa();

    // 创建 vite 服务
    const viteServer = await createViteServer({
        root: process.cwd(),
        logLevel: 'error',
        server: { middlewareMode: true },
        appType: 'custom',
    })

    // 注册 vite 的 Connect 实例作为中间件（注意：vite.middlewares 是一个 Connect 实例）
    app.use(koaConnect(viteServer.middlewares))

    // 获取 index.html
    const __dirname = path.resolve();

    app.use(async (ctx) => {
        try {
            // 1. 获取index.html
            let template = fs.readFileSync(path.resolve(__dirname, 'index.html'), 'utf-8');
            // 2. 应用 Vite HTML 转换。这将会注入 Vite HMR 客户端，
            template = await viteServer.transformIndexHtml(ctx.path, template)

            // 3. 加载服务器入口, vite.ssrLoadModule 将自动转换
            const { render } = await viteServer.ssrLoadModule('/src/entry-server.ts',{

            })
            //  4. 渲染应用的 HTML
            const { appHtml,state, preloadLinks } = await render(ctx, {})
            // 替换 index.html 中的 <!--app-html--> 标记
            const html = template
                .replace('<!--preload-links-->', preloadLinks)
                .replace('<!--app-html-->', appHtml)
                .replace('<!--pinia-state-->', state);

            ctx.body = html;
        } catch (e) {
            viteServer && viteServer.ssrFixStacktrace(e)
            console.log(e.stack)
            ctx.throw(500, e.stack)
        }


    });

    app.listen(9000, () => {
        console.log('server is listening in 9000');
    });
}
createServer()