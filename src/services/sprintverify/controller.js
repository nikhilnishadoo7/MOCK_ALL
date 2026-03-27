import { mockPanData } from '../../data/mockDb.js';
import { sendSuccess, sendError, HttpStatus } from '../../shared/utils/response.js';
import { logger } from '../../shared/utils/logger.js';

const SERVICE_NAME = 'SprintVerify-PAN';

export const verifyPan = (req, res) => {
  const pan_number = req.body.pan_number || req.body.idNumber;
  const requestId = res.locals.requestId;

  logger(SERVICE_NAME, requestId, `Verifying PAN: ${pan_number}`);

  if (!pan_number) {
    return sendError(res, 'INVALID_INPUT', 'ID number is required', SERVICE_NAME, HttpStatus.BAD_REQUEST);
  }

  const panRecord = mockPanData.find(p => p.pan_number === pan_number);

  if (!panRecord) {
    return sendError(res, 'RECORD_NOT_FOUND', 'No records found for the provided ID', SERVICE_NAME, HttpStatus.NOT_FOUND);
  }

  const responseData = {
    idNumber: panRecord.pan_number,
    idStatus: "VALID",
    panStatus: panRecord.pan_status,
    lastName: panRecord.last_name,
    middleName: panRecord.middle_name,
    firstName: panRecord.first_name,
    fullName: panRecord.full_name,
    idHolderTitle: panRecord.title,
    idLastUpdated: null,
    aadhaarSeedingStatus: panRecord.aadhaar_seeding_status === 'Y' ? "Successful" : "Pending"
  };

  return sendSuccess(res, responseData, SERVICE_NAME, 'PAN details fetched successfully');
};
