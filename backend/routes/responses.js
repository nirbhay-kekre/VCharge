const sendSuccess = (resp, data = {}) => {
    let responseData = {
        success: true,
        message: "Successful",
        ...data
    };
    resp.writeHead(200, {
        'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify(responseData));
}

const sendNoContent = (resp, data = {}) => {
    let responseData = {
        success: true,
        message: "No Content",
        ...data
    };
    resp.writeHead(204, {
        'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify(responseData));
}

const sendForbiddenFailure = (resp, data = {}) => {
    resp.writeHead(403, {
        'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
        success: false,
        message: "The username or password you entered is incorrect.",
        ...data
    }));
}

const sendAuthorizationFailure = (resp, data = {}) => {
    resp.writeHead(401, {
        'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
        success: false,
        message: "User is not authorized to perform this action",
        ...data
    }));
}

const sendInternalServerError = (resp, data = {}) => {
    resp.writeHead(500, {
        'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
        success: false,
        message: "Internal Server Error",
        ...data
    }));
}

const sendBadRequest = (resp, data = {}) => {
    resp.writeHead(400, {
        'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
        success: false,
        message: "Bad Request",
        ...data
    }));
}

const sendResourceConflictFailure = (resp, data = {}) => {
    resp.writeHead(409, {
        'Content-Type': 'application/json'
    });
    resp.end(JSON.stringify({
        success: false,
        message: "Resource Conflict",
        ...data
    }));
}

const responseHandler = (resp, result = {}) => {
    switch (result.code) {
        case 200:
            sendSuccess(resp, result.data);
            break;
        case 204:
            sendNoContent(resp, result.data);
            break;
        case 400:
            sendBadRequest(resp);
            break;
        case 401:
            sendAuthorizationFailure(resp,result.data);
            break;
        case 403:
            sendForbiddenFailure(resp, result.data);
            break;
        case 500:
            sendInternalServerError(resp);
            break;
        case 409:
            sendResourceConflictFailure(resp);
            break;
        default:
            sendInternalServerError(resp,{
                reason: "default"
            });
    }
}

module.exports = { sendSuccess, sendForbiddenFailure, sendAuthorizationFailure, sendInternalServerError, sendBadRequest, responseHandler };
