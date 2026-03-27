import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import { requestIdMiddleware, delayMiddleware, failureMiddleware, authMiddleware } from '../../shared/middlewares/common.js';

const app = express();
const SERVICE_NAME = 'SprintVerify-PAN';

app.use(cors());
app.use(express.json());
app.use(requestIdMiddleware(SERVICE_NAME));
app.use(authMiddleware(SERVICE_NAME));
app.use(delayMiddleware(300, 800));
app.use(failureMiddleware(0.02));

app.use('/api/v1', routes);

export default app;
