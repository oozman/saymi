function Response() {}

/**
 * Return error response.
 *
 * @param msg
 */
Response.prototype.error = function (msg) {

    return JSON.stringify({code: 'ERROR', msg: msg, data: null});

}

/**
 * Return success response.
 *
 * @param msg
 * @param data
 */
Response.prototype.success = function (msg, data) {

    return JSON.stringify({code: 'SUCCESS', msg: msg, data: data});

}

module.exports = Response;