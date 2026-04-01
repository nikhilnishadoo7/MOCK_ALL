import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import { requestIdMiddleware, delayMiddleware, failureMiddleware, authMiddleware } from '../../shared/middlewares/common.js';

const app = express();
const SERVICE_NAME = 'Bank-Verification';

app.use(cors());
app.use(express.json());
app.use(requestIdMiddleware(SERVICE_NAME));
app.use(authMiddleware(SERVICE_NAME));
app.use(delayMiddleware());
app.use(failureMiddleware(0.1));

app.use('/api/v1/bank', routes);

export default app;
