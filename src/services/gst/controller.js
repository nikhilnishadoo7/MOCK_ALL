import { mockGstData } from '../../data/mockDb.js';
import { sendSuccess, sendError, HttpStatus } from '../../shared/utils/response.js';
import { logger } from '../../shared/utils/logger.js';

const SERVICE_NAME = 'GST-Service';

export const verifyGst = (req, res) => {
  const { gstin, consent } = req.body;
  const requestId = res.locals.requestId;

  logger(SERVICE_NAME, requestId, `Verifying GSTIN: ${gstin}`);

  if (consent !== 'Y') {
    return sendError(res, 'CONSENT_REQUIRED', 'Consent is mandatory for GST verification', SERVICE_NAME, HttpStatus.BAD_REQUEST);
  }

  if (!gstin) {
    return sendError(res, 'INVALID_GSTIN', 'GSTIN is required', SERVICE_NAME, HttpStatus.BAD_REQUEST);
  }

  const gstRecord = mockGstData.find(g => g.gstin === gstin);

  if (!gstRecord) {
    return sendError(res, 'GSTIN_NOT_FOUND', 'Valid GSTIN not found', SERVICE_NAME, HttpStatus.NOT_FOUND);
  }

  const responseData = {
    code: "1000",
    message: "Valid GSTIN",
    gstin_data: {
      document_type: "GSTIN",
      document_id: gstRecord.gstin,
      status: gstRecord.status,
      pan: gstRecord.pan,
      legal_name: gstRecord.legal_name,
      trade_name: gstRecord.trade_name,
      center_jurisdiction: gstRecord.center_jurisdiction,
      state_jurisdiction: gstRecord.state_jurisdiction,
      constitution_of_business: gstRecord.constitution_of_business,
      taxpayer_type: gstRecord.taxpayer_type,
      aadhaar_verified: gstRecord.aadhaar_verified,
      field_visit_conducted: gstRecord.field_visit_conducted,
      date_of_registration: gstRecord.date_of_registration,
      directors: gstRecord.directors,
      percent_tax_in_cash: "NA",
      annual_aggregate_turnover: "Slab: Rs. 1.5 Cr. to 5 Cr.",
      annual_aggregate_turnover_year: "2024-2025",
      principal_address: gstRecord.principal_address
    }
  };

  return sendSuccess(res, responseData, SERVICE_NAME, 'GST details fetched successfully');
};
