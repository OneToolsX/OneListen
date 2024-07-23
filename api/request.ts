import { Body, fetch } from "@tauri-apps/api/http";
import { invoke } from "@tauri-apps/api/tauri";
import { getCookie } from "../utils/cookie";

const webApiBaseUrl = "http://localhost:3000";

async function request({
    params = {} as any,
    data = {},
    headers = {},
    method = "GET",
    url = "",
}) {
    // TAURI
    if (window.__TAURI__) {
        return tauriRequest({ params, data, headers, method, url });
    }

    // Browser
    const formatParams = new URLSearchParams();
    Object.keys(params).forEach((key) => {
        formatParams.append(key, params[key]);
    });
    const comUrl = `${webApiBaseUrl}${url}?${formatParams.toString()}`;
    return window
        .fetch(comUrl, {
            credentials: "include",
            mode: "cors",
            method,
            headers: {
                "Content-Type": "application/json",
                ...headers,
            },
            ...(!["GET", "HEAD"].includes(method) && { body: JSON.stringify(data) }),
        })
        .then(async (response) => {
            return {
                ...response,
                data: await response.json()
            };
        });
}

async function tauriRequest({
    params = {},
    data = {},
    headers = {},
    method = "GET",
    url = "",
}) {
    const result = await tauriGetRequestOptions({
        method,
        url,
        params: tauriFormatParams(params),
        cookie: getCookie(),
    }) as any;
    // Direct API call, no CORS, no need for backend deployment
    return fetch(result.url, result.options)
}

// Rust to assemble request parameters
export async function tauriGetRequestOptions(options = {}) {
    console.log(options);
    
    const result = await invoke("get_params", { options }) as any;
    console.log(result);
    

    return {
        url: result.url,
        options: {
            method: result.method as string,
            headers: result.headers.reduce((total: { [x: string]: any; }, [key, value]: any) => {
                total[key] = value;
                return total;
            }, {}),
            body: Body.text(result.body),
        }
    }
}

export function tauriFormatParams(params: any) {
    return Object.keys(params).reduce((total: any, key) => {
        total.push([key, String(params[key])]);
        return total;
    }, []);
}

export default request;