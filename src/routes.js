import { Router } from 'express';
import multer from 'multer';
import Brute from 'express-brute';
import BruteRedis from 'express-brute-redis';
// eslint-disable-next-line import/no-extraneous-dependencies
import * as sapper from '@sapper/server';

import multerConfig from './config/multer';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';
import AppointmentController from './app/controllers/AppointmentController';
import ScheduleController from './app/controllers/ScheduleController';
import NotificationController from './app/controllers/NotificationController';
import AvaliableController from './app/controllers/AvaliableController';
import CodigoController from './app/controllers/CodigoController';
import BebidaController from './app/controllers/BebidaController';
import ConsumoController from './app/controllers/ConsumoController';

import TesteController from './app/controllers/TestesController';

import ValidateUserStore from './app/Validators/UserStore';
import ValidateAppointmentStore from './app/Validators/AppointmentStore';
import ValidateCodigoStore from './app/Validators/CodigoStore';

import authMiddleware from './app/middleware/auth';
import PostagemController from './app/controllers/PostagemController';

const routes = Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

routes.post('/api/user', ValidateUserStore, UserController.store);
routes.post('/api/session', bruteForce.prevent, SessionController.store);

routes.use('/api', authMiddleware);
routes.put('/api/user', UserController.update);

routes.post('/api/files', upload.single('file'), FileController.store);

routes.get('/api/providers', ProviderController.index);

routes.post(
  '/api/appointments',
  ValidateAppointmentStore,
  AppointmentController.store
);
routes.get('/api/appointments', AppointmentController.index);
routes.delete('/api/appointments/:id', AppointmentController.delete);
routes.get(
  '/api/appappointments/:providerId/avaliable',
  AvaliableController.index
);

routes.get('/api/bebida', BebidaController.Show);

routes.get('/api/schedules', ScheduleController.index);

routes.get('/api/notifications', NotificationController.index);
routes.put('/api/notifications/:id', NotificationController.update);

routes.post('/api/testes', TesteController.store);

routes.post('/api/codigos', ValidateCodigoStore, CodigoController.store);

routes.post('/api/consumo', ConsumoController.store);

routes.get('/api/Postagens', PostagemController.Show);

routes.use(sapper.middleware());

export default routes;
