const UnautorizedError = require('../errors/unauthorized-error')
const ServerError = require('../errors/server-error')

module.exports = class HttpResponse {
    static badRequest (error) {
        return {
            statusCode: 400,
            data: error
        }
    }

    static serverError () {
        return {
            statusCode: 500,
            data: new ServerError()
        }
    }

    static unautorizedError () {
        return {
            statusCode: 401,
            data: new UnautorizedError()
        }
    }

    static ok (accessToken) {
        return {
            statusCode: 200,
            body: accessToken

        }
    }

    static created (data) {
        return {
            statusCode: 201,
            data: data
        }
    }
}
