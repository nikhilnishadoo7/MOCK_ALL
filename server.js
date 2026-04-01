import surepassApp from './src/services/surepass/app.js';
import sprintVerifyApp from './src/services/sprintverify/app.js';
import gstApp from './src/services/gst/app.js';
import passportApp from './src/services/passport/app.js';
import bankApp from './src/services/bank/app.js';
import express from 'express';

const PORTS = {
  SUREPASS: 3001,
  SPRINTVERIFY: 3002,
  GST: 3003,
  PASSPORT: 3004,
  BANK: 3005,
  GATEWAY: 3000
};

surepassApp.listen(PORTS.SUREPASS, '0.0.0.0', () => {
  console.log(`[SurePass] Mock Service running on http://localhost:${PORTS.SUREPASS}`);
});

sprintVerifyApp.listen(PORTS.SPRINTVERIFY, '0.0.0.0', () => {
  console.log(`[SprintVerify] Mock Service running on http://localhost:${PORTS.SPRINTVERIFY}`);
});

gstApp.listen(PORTS.GST, '0.0.0.0', () => {
  console.log(`[GST] Mock Service running on http://localhost:${PORTS.GST}`);
});

passportApp.listen(PORTS.PASSPORT, '0.0.0.0', () => {
  console.log(`[Passport] Mock Service running on http://localhost:${PORTS.PASSPORT}`);
});

bankApp.listen(PORTS.BANK, '0.0.0.0', () => {
  console.log(`[Bank] Mock Service running on http://localhost:${PORTS.BANK}`);
});

const gateway = express();
gateway.get('/', (req, res) => {
  res.json({
    status: 'SUCCESS',
    message: 'KYC Mock System Gateway is Active',
    services: [
      { name: 'SurePass PAN', port: PORTS.SUREPASS, endpoint: '/api/v1/pan/pan-adv-v2' },
      { name: 'SprintVerify PAN', port: PORTS.SPRINTVERIFY, endpoint: '/api/v1/' },
      { name: 'GST Service', port: PORTS.GST, endpoint: '/gstin-api/fetch-detailed' },
      { name: 'Passport Service', port: PORTS.PASSPORT, endpoint: '/passport-api/fetch' },
      { name: 'Bank Service', port: PORTS.BANK, endpoint: '/api/v1/bank/verify' }
    ]
  });
});

gateway.use('/surepass', surepassApp);
gateway.use('/sprintverify', sprintVerifyApp);
gateway.use('/gst', gstApp);
gateway.use('/passport', passportApp);
gateway.use('/bank', bankApp);

gateway.listen(PORTS.GATEWAY, '0.0.0.0', () => {
  console.log(`[Gateway] Main entry point running on http://localhost:${PORTS.GATEWAY}`);
});
