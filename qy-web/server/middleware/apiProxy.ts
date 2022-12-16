import {defineNodeMiddleware, readBody, getCookie, getMethod, getQuery, H3Event} from 'h3'

const runtimeConfig = useRuntimeConfig();
export default eventHandler(async (e:any) => {

    const API_BASE = runtimeConfig.API_BASE;
    const BACKEND_URL = runtimeConfig.BACKEND_URL;
    if (e.req.url.startsWith(API_BASE)) {
        const url = BACKEND_URL + e.req.url;
        const method = getMethod(e);
        const query = getQuery(e);
        const headers = e.req.headers;
        let body = null;

        if ('GET' !== method.toUpperCase()) {
            body = await readBody(e)
        }

        return $fetch(url, {
            method,
            params: query,
            headers,
            body
        })
    }
})
