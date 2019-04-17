const prepareSuccess = (data = {}) => {
    const responseData = {
        code: 200,
        data: {
            success: true,
            message: "Successful",
            ...data
        }
    };
    return responseData;
}

const prepareNoContent = (data ={}) =>{
    const responseData = {
        code: 204,
        data: {
            success: true,
            message: "No content",
            ...data
        }
    };
    return responseData;
}
const prepareForbiddenFailure = (data = {}) => {
    const responseData = {
        code: 403,
        data: {
            success: false,
            message: "The username or password you entered is incorrect.",
            ...data
        }
    };
    return responseData;
}

const prepareAuthorizationFailure = (data = {}) => {
    const responseData = {
        code: 401,
        data: {
            success: false,
            message: "User is not authorized to perform this action",
            ...data
        }
    };
    return responseData;
}

const prepareInternalServerError = (resp, data = {}) => {
    const responseData = {
        code: 500,
        data: {
            success: false,
            message: "Internal Server Error",
            ...data
        }
    };
    return responseData;
}

const prepareResourceConflictFailure = (resp, data = {}) => {
    const responseData = {
        code: 409,
        data: {
            success: false,
            message: "Resource Conflict",
            ...data
        }
    };
    return responseData;
}

module.exports = { prepareSuccess, prepareNoContent,
    prepareForbiddenFailure, prepareAuthorizationFailure,
      prepareInternalServerError, prepareResourceConflictFailure };
