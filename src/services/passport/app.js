import express from 'express';
import cors from 'cors';
import routes from './routes.js';
import { requestIdMiddleware, delayMiddleware, failureMiddleware, authMiddleware } from '../../shared/middlewares/common.js';

const app = express();
const SERVICE_NAME = 'Passport-Service';

app.use(cors());
app.use(express.json());
app.use(requestIdMiddleware(SERVICE_NAME));
app.use(authMiddleware(SERVICE_NAME));
app.use(delayMiddleware(500, 1200));
app.use(failureMiddleware(0.03));

app.use('/passport-api', routes);

export default app;
