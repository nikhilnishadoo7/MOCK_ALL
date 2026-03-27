import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import { requestIdMiddleware, delayMiddleware, failureMiddleware, authMiddleware } from '../../shared/middlewares/common.js';

const app = express();
const SERVICE_NAME = 'GST-Service';

app.use(cors());
app.use(express.json());
app.use(requestIdMiddleware(SERVICE_NAME));
app.use(authMiddleware(SERVICE_NAME));
app.use(delayMiddleware(800, 2000));
app.use(failureMiddleware(0.05));

app.use('/gstin-api', routes);

export default app;
