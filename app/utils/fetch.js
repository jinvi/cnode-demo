function logResult(result) {
    console.log(result);
}

function logError(error) {
    console.log('出错: \n', error);
}

function validateResponse(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function readResponseAsJSON(response) {
    return response.json();
}

function readResponseAsText(response) {
    return response.text();
}

function response(response) {
    console.log(response)
}

//返回JSON格式数据
function fetchJSON({url, success, req, fail}) {
    const preUrl = 'https://cnodejs.org/api/v1'
    fetch(preUrl + url, req)
        .then(validateResponse)
        .then(readResponseAsJSON)
        .then(success)
        .catch(fail ? fail : logError);
}

//返回文本格式数据
function fetchText(pathToResource) {
    fetch(pathToResource)
        .then(validateResponse)
        .then(readResponseAsText)
        .then(logResult)
        .catch(logError);
}

//自定义请求
function backResponse(...req) {
    fetch(...req)
        .then(validateResponse)
        .then(response)
        .catch(logError);
}

export {fetchJSON, fetchText, backResponse}