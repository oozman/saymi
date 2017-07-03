class Response {

    /**
     * Return a success response.
     *
     * @param msg
     * @param data
     */
    success(msg, data = null) {

        return JSON.stringify({code: 'SUCCESS', msg: msg, data: data});

    }

    /**
     * Return an error response.
     *
     * @param msg
     * @param data
     */
    error(msg, data = null) {

        return JSON.stringify({code: 'ERROR', msg: msg, data: data});

    }
}

module.exports = Response;