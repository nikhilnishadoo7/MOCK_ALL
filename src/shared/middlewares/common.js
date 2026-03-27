import { v4 as uuidv4 } from 'uuid';
import { logger } from '../utils/logger.js';
import { sendError, HttpStatus } from '../utils/response.js';

export const requestIdMiddleware = (serviceName) => (req, res, next) => {
  const requestId = req.headers['x-request-id'] || uuidv4();
  res.setHeader('X-Request-Id', requestId);
  res.locals.requestId = requestId;
  res.locals.serviceName = serviceName;
  next();
};

export const delayMiddleware = (min = 500, max = 1500) => async (req, res, next) => {
  const delay = Math.floor(Math.random() * (max - min + 1) + min);
  await new Promise((resolve) => setTimeout(resolve, delay));
  next();
};

export const failureMiddleware = (failureRate = 0.05) => (req, res, next) => {
  if (Math.random() < failureRate) {
    const is503 = Math.random() > 0.5;
    return sendError(
      res,
      is503 ? 'SERVICE_UNAVAILABLE' : 'INTERNAL_SERVER_ERROR',
      is503 ? 'Provider service is temporarily down' : 'An unexpected error occurred at provider side',
      res.locals.serviceName,
      is503 ? HttpStatus.SERVICE_UNAVAILABLE : HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
  next();
};

export const authMiddleware = (serviceName) => (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return sendError(res, 'UNAUTHORIZED', 'Missing or invalid authorization token', serviceName, HttpStatus.UNAUTHORIZED);
  }
  next();
};
