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
import ValidacaoController from './app/controllers/ValidacaoController';
import ProfileController from './app/controllers/ProfileController';
import RankingUsuarioController from './app/controllers/RankingUsuarioController';
import RankingBarController from './app/controllers/RankingBarController';
import SolicitaBrindeController from './app/controllers/SolicitaBrindeController';
import ValidacaoBrindeController from './app/controllers/ValidacaoBrindeController';
import FiltroUserController from './app/controllers/FiltroUserController';

import TesteController from './app/controllers/TestesController';

import ValidateUserStore from './app/Validators/UserStore';
import ValidateAppointmentStore from './app/Validators/AppointmentStore';
import ValidateCodigoStore from './app/Validators/CodigoStore';

import authMiddleware from './app/middleware/auth';
import PostagemController from './app/controllers/PostagemController';
import CurtidasController from './app/controllers/CurtidasController';
import ComentariosController from './app/controllers/ComentariosController';
import EstabelecimentoController from './app/controllers/EstabelecimentoController';
import EnderecoController from './app/controllers/EnderecoController';
import PremiosController from './app/controllers/PremiosController';
import ConquistasController from './app/controllers/ConquistasController';

const routes = Router();
const upload = multer(multerConfig);

const bruteStore = new BruteRedis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT,
});

const bruteForce = new Brute(bruteStore);

routes.post('/api/user', ValidateUserStore, UserController.store);
routes.post('/api/session', bruteForce.prevent, SessionController.store);
routes.post('/api/user/validaEmail', UserController.validaEmail);

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
routes.post('/api/validacao', ValidacaoController.store);
routes.get('/api/validacao/:user_hash', ValidacaoController.index);

routes.get('/api/Postagens', PostagemController.Show);
routes.put('/api/Postagens/:postagen_id', PostagemController.update);
routes.post('/api/Postagens', PostagemController.store);

routes.post('/api/Curtidas', CurtidasController.store);
routes.post('/api/Comentarios', ComentariosController.store);

routes.get('/api/profile/:user_id', ProfileController.index);
routes.post('/api/Endereco', EnderecoController.store);

routes.post('/api/Estabelecimento', EstabelecimentoController.store);

routes.get('/api/rankingUsuario', RankingUsuarioController.show);
routes.get('/api/rankingBar', RankingBarController.show);
routes.get(
  '/api/Estabelecimento/:estabelecimento_id',
  EstabelecimentoController.index
);

routes.post('/api/Premios', PremiosController.store);
routes.get('/api/Premios/:premio_id', PremiosController.index);
routes.get('/api/Premios', PremiosController.show);

routes.get('/api/profile/:user_id', ProfileController.index);

routes.get('/api/conquistas/:user_id', ConquistasController.index);

routes.post('/api/solicitaBrinde', SolicitaBrindeController.store);
routes.post('/api/validacaoBrinde', ValidacaoBrindeController.store);

routes.get('/api/filtroUser', FiltroUserController.show);

routes.use(sapper.middleware());

export default routes;
