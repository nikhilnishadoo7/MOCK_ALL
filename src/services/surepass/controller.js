import { mockPanData } from '../../data/mockDb.js';
import { sendSuccess, sendError, HttpStatus } from '../../shared/utils/response.js';
import { logger } from '../../shared/utils/logger.js';

const SERVICE_NAME = 'SurePass-PAN';

export const verifyPan = (req, res) => {
  const { pan_number } = req.body;
  const requestId = res.locals.requestId;

  logger(SERVICE_NAME, requestId, `Verifying PAN: ${pan_number}`);

  if (!pan_number) {
    return sendError(res, 'INVALID_REQUEST', 'PAN number is required', SERVICE_NAME, HttpStatus.BAD_REQUEST);
  }

  if (pan_number === 'FAIL123456') {
    return sendError(res, 'PROVIDER_ERROR', 'SurePass internal provider error', SERVICE_NAME, HttpStatus.INTERNAL_SERVER_ERROR);
  }

  const panRecord = mockPanData.find(p => p.pan_number === pan_number);

  if (!panRecord) {
    return sendError(res, 'NOT_FOUND', 'PAN details not found in SurePass records', SERVICE_NAME, HttpStatus.NOT_FOUND);
  }

  const responseData = {
    client_id: `pan_advanced_v2_${Math.random().toString(36).substring(7)}`,
    pan_number: panRecord.pan_number,
    full_name: panRecord.full_name,
    title: panRecord.title,
    full_name_split: [panRecord.first_name, panRecord.middle_name, panRecord.last_name].filter(Boolean),
    pan_status: panRecord.pan_status,
    pan_status_desc: panRecord.pan_status_desc,
    aadhaar_seeding_status: panRecord.aadhaar_seeding_status,
    aadhaar_seeding_status_desc: panRecord.aadhaar_seeding_status_desc,
    pan_modified_date: null,
    category: panRecord.category,
    skip_pan_aadhaar_check: false
  };

  return sendSuccess(res, responseData, SERVICE_NAME, 'PAN details fetched successfully');
};
