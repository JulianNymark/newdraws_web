interface RequestParams {
    method: Methods;
    url: string;
    jsonBody?: string;
    params?: ParamObject;
}

export interface ParamObject {
    [s: string]: string | number;
}

type Methods = 'GET' | 'POST' | 'PUT';

function makeJSONRequest({ method, url, jsonBody, params = undefined }: RequestParams) {
    console.log('REQUEST: ', method, url, jsonBody, params);
    return new Promise(function (resolve: (value?: string) => void, reject: (reason?: object) => void) {
        let xhr = new XMLHttpRequest();
        if (!params) {
            xhr.open(method, url);
        } else {
            xhr.open(method, url + formatQueryParams(params));
        }
        xhr.setRequestHeader('Content-Type', 'application/json');
        // xhr.withCredentials = true;
        xhr.onload = function () {
            if (xhr.status >= 200 && xhr.status < 300) {
                resolve(xhr.response);
            } else {
                reject({
                    status: xhr.status,
                    statusText: xhr.statusText
                });
            }
        };
        xhr.onerror = function () {
            reject({
                status: xhr.status,
                statusText: xhr.statusText
            });
        };
        xhr.send(jsonBody);
    });
}

function formatQueryParams(params: ParamObject) {
    return '?' + Object
        .keys(params)
        .map(function (key: string) {
            return key + '=' + encodeURIComponent(params[key].toString());
        })
        .join('&');
}

function randomString(count: number = 20) {
    let text = '';
    let possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (let i = 0; i < count; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }

    return text;
}

export {
    makeJSONRequest,
    randomString,
    formatQueryParams,
};
