import { Router } from 'express';
import * as controller from './controller.js';

const router = Router();

router.post('/verify', controller.verifyBank);

export default router;
