import {readBody, getMethod, getQuery} from 'h3'


 
const runtimeConfig = useRuntimeConfig();

export default eventHandler(async (e:any) => {

    const API_BASE = runtimeConfig.public.API_BASE as string;
    const BACKEND_URL = runtimeConfig.public.BACKEND_URL as string;
    const BASEURL = process.server?BACKEND_URL:API_BASE;
    if (e.req.url.startsWith(API_BASE)) { 
        const url = e.req.url; 
        const method = getMethod(e);
        const query = getQuery(e);
        const headers = e.req.headers;
        let body = null;

        if ('GET' !== method.toUpperCase()) {
            body = await readBody(e)
        }
        // @ts-ignore
        return $fetch(url, {
            baseURL: BASEURL,
            method,
            params: query,
            headers,
            body
        });
    }
})
