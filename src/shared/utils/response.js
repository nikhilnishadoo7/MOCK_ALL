export const HttpStatus = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_SERVER_ERROR: 500,
  SERVICE_UNAVAILABLE: 503,
};

export const sendSuccess = (
  res,
  data,
  service,
  message = 'Operation successful',
  code = HttpStatus.OK
) => {
  const requestId = res.locals.requestId || 'unknown';
  const response = {
    status: 'SUCCESS',
    message,
    service,
    requestId,
    timestamp: new Date().toISOString(),
    data,
  };
  return res.status(code).json(response);
};

export const sendError = (
  res,
  errorCode,
  message,
  service,
  code = HttpStatus.INTERNAL_SERVER_ERROR
) => {
  const requestId = res.locals.requestId || 'unknown';
  const response = {
    error_code: errorCode,
    message,
    service,
    request_id: requestId,
    timestamp: new Date().toISOString(),
  };
  return res.status(code).json(response);
};
