import { mockPassportData } from '../../data/mockDb.js';
import { sendSuccess, sendError, HttpStatus } from '../../shared/utils/response.js';
import { logger } from '../../shared/utils/logger.js';

const SERVICE_NAME = 'Passport-Service';

export const verifyPassport = (req, res) => {
  const { file_number, date_of_birth, consent } = req.body;
  const requestId = res.locals.requestId;

  logger(SERVICE_NAME, requestId, `Verifying Passport File: ${file_number}`);

  if (consent !== 'Y') {
    return sendError(res, 'CONSENT_DENIED', 'Consent must be Y', SERVICE_NAME, HttpStatus.BAD_REQUEST);
  }

  if (!file_number || !date_of_birth) {
    return sendError(res, 'MISSING_FIELDS', 'File number and DOB are required', SERVICE_NAME, HttpStatus.BAD_REQUEST);
  }

  const passportRecord = mockPassportData.find(p => p.file_number === file_number && p.date_of_birth === date_of_birth);

  if (!passportRecord) {
    return sendError(res, 'PASSPORT_NOT_FOUND', 'Passport details not found for given file number and DOB', SERVICE_NAME, HttpStatus.NOT_FOUND);
  }

  const responseData = {
    code: "1006",
    message: "Passport details fetched.",
    passport_data: {
      document_type: "PASSPORT",
      document_id: passportRecord.passport_number,
      file_number: passportRecord.file_number,
      first_name: passportRecord.first_name,
      last_name: passportRecord.last_name,
      date_of_birth: passportRecord.date_of_birth,
      application_received_date: passportRecord.application_received_date
    }
  };

  return sendSuccess(res, responseData, SERVICE_NAME, 'Passport details fetched successfully');
};
