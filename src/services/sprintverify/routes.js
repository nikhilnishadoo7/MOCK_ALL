import { Router } from 'express';
import * as controller from './controller.js';

const router = Router();

router.post('/sprintverify', controller.verifyPan);

export default router;
