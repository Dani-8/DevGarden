import { Router } from 'express';
import { authRouter } from './authRoutes.js';
import { apiRouter } from './apiRoutes.js';

export const routes = Router();

routes.use(authRouter);
routes.use(apiRouter);
