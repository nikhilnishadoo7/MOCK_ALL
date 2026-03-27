export const logger = (service, requestId, message, level = 'INFO') => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] [${level}] [${service}] [RID:${requestId}] ${message}`);
};
