const ClientErrorCodes = Object.freeze({
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
})

const ServerErrorCodes = Object.freeze({
  NOT_IMPLEMENTED: 501,
  INTERNAL_SERVER_ERROR: 500,
})

const SuccessCodes = Object.freeze({
  OK: 200,
  CREATED: 201,
})

module.exports = {
  ClientErrorCodes,
  ServerErrorCodes,
  SuccessCodes
}