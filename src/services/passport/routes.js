import { Router } from 'express';
import * as controller from './controller.js';

const router = Router();

router.post('/fetch', controller.verifyPassport);

export default router;
