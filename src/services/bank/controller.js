import { mockBankData } from '../../data/mockDb.js';
import { logger } from '../../shared/utils/logger.js';

const SERVICE_NAME = 'Bank-Verification';

export const verifyBank = (req, res) => {
  const { accountNumber, ifsc, name } = req.body;
  const requestId = res.locals.requestId;

  logger(SERVICE_NAME, requestId, `Verifying Bank Account: ${accountNumber}, IFSC: ${ifsc}`);

  if (!accountNumber || !ifsc || !name) {
    return res.status(400).json({
      status: 'FAILED',
      code: 'INVALID_REQUEST',
      message: 'Account number, IFSC, and name are required'
    });
  }

  const bankRecord = mockBankData.find(b => b.accountNumber === accountNumber && b.ifsc === ifsc);

  if (!bankRecord) {
    return res.status(404).json({
      status: 'FAILED',
      code: 'NOT_FOUND',
      message: 'Bank account details not found'
    });
  }

  if (bankRecord.name.toLowerCase() !== name.toLowerCase()) {
    return res.status(200).json({
      status: 'FAILED',
      code: 'NAME_MISMATCH',
      message: 'Account name does not match'
    });
  }

  return res.status(200).json({
    status: 'SUCCESS',
    verifiedName: bankRecord.verifiedName,
    matchScore: 100
  });
};
