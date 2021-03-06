import 'dotenv/config';

import sirv from 'sirv';
import compression from 'compression';

import express from 'express';
import path from 'path';
import cors from 'cors';
import helmet from 'helmet';
// import redis from 'redis';
// import RateLimit from 'express-rate-limit';
// import RateLimitRedis from 'rate-limit-redis';
import Youch from 'youch';
import * as Sentry from '@sentry/node';
import 'express-async-errors';

import routes from './routes';
import sentryConfig from './config/sentry';

import './database';

class App {
  constructor() {
    this.server = express();

    Sentry.init(sentryConfig);

    this.middlaWare();
    this.routes();
    this.exceptionHandler();
  }

  middlaWare() {
    this.server.use(cors());
    this.server.use(compression({ threshold: 0 }));
    this.server.use(sirv('static', { dev: process.env.NODE_ENV }));
    this.server.use(Sentry.Handlers.requestHandler());
    this.server.use(helmet());
    this.server.use(express.json());
    this.server.use(
      '/files',
      express.static(
        path.resolve(__dirname, '..', '..', '..', 'tmp', 'uploads')
      )
    );

    // if (process.env.NODE_ENV !== 'development') {
    //   this.server.use(
    //     new RateLimit({
    //       store: new RateLimitRedis({
    //         client: redis.createClient({
    //           host: process.env.REDIS_HOST,
    //           port: process.env.REDIS_PORT,
    //         }),
    //       }),
    //       windowMs: 100000 * 60 * 15,
    //       max: 100000,
    //     })
    //   );
    // }
  }

  routes() {
    this.server.use(routes);
    this.server.use(Sentry.Handlers.errorHandler());
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV) {
        const errors = await new Youch(req, err).toJSON();

        return res.status(500).json(errors);
      }
      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
