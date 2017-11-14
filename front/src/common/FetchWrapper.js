// update
import memoize from "memoizee";
export const UPDATE = (url, data, succ, fail) => {
    return fetch(url, {
        // credentials: 'include',
        method: 'PUT',
        // @see https://segmentfault.com/a/1190000009637016
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }).then(checkStatus)
    // .then(parseJSON)
        .then(succ || logHandler)
        .catch(fail || defaultErrorHandler)
        ;
};

/**
 * 创建,
 * 创建成功，201，不会有body，
 * 更新成功，200，不会有body，
 * 创建失败，4XX, 有body
 * @param url
 * @param data
 * @param succ
 * @param fail
 * @returns {Promise.<TResult>}
 * @constructor
 */
export const CREATE = (url, data, succ, fail) => {
    fetch(url, {
        // credentials: 'include',
        method: 'POST',
        // @see https://segmentfault.com/a/1190000009637016
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    })
        .then(checkStatus)
        .then(succ || logHandler)
        .catch((error) => {
            const jsonPromise = error.response.json();
            jsonPromise.then(fail || defaultErrorHandler);
        })
    ;
};


export const SELECT = (url, succ, fail) => {
    selectCache(url, succ, fail)
        .then(succ || logHandler)
        .catch(fail || defaultErrorHandler)
    ;
};

const _select = function (url, succ, fail) {
    return fetch(url, {
        // credentials: 'include',
        method: 'GET',
        // @see https://segmentfault.com/a/1190000009637016
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'}
    }).then(checkStatus)
        .then(parseJSON);
};
const selectCache = memoize(_select, {
    maxAge: 1000,
    normalizer: (args) => args[0] //选择fn的第一个参数作为key
    // promise: true, // 如果Promise.reject(),会请掉缓存
});


/**
 * 解析响应
 * @param response
 * @returns {*}
 */
function checkStatus(response) {
    if (response.status >= 200 && response.status < 300) {
        return response;
    } else {
        let error = new Error(response.statusText);
        error.response = response;
        throw error
    }
}

function parseJSON(response) {
    return response.json()
}

function defaultErrorHandler(error) {
    console.log('request failed', error);
    return error;
}

function logHandler(data) {
    console.log('request succ', data);
    return data;
}