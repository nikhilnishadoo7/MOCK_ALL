import { Router } from 'express';
import * as controller from './controller.js';

const router = Router();

router.post('/pan-adv-v2', controller.verifyPan);

export default router;
