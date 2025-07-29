/* eslint-disable @typescript-eslint/no-unused-vars */
import { config } from 'dotenv';
import express from 'express';
import { createRequestHandler } from '@react-router/express';
import path from 'path';
import bodyParser from 'body-parser';
import RequestError from 'shared/RequestError';
import './services/i18n';
import asyncDB from './db/asyncDB';
import api from './api';
import { authMiddleware } from './middlewares/auth';

config();

const {
  PORT = 3000,
  NODE_ENV = 'development',
  APP_VERSION,
} = process.env;


const app = express();

// Static file serving
app.use(express.static('server/public'));

await asyncDB();

let build;
if (NODE_ENV === "production") {
  // Production environment: use built static files
  app.use(express.static(path.resolve("./build/client"), { maxAge: 60 * 60 * 24 * 1000 }));
  build = () => import("../build/server/index.js") as any;
} else {
  // Development environment: use Vite dev server
  const viteDevServer = await import("vite").then((vite) =>
  {
    return vite.createServer({
      server: {
        middlewareMode: true,
      },
    })
  }
  );
  app.use(viteDevServer.middlewares);
  build = () => viteDevServer.ssrLoadModule("virtual:react-router/server-build")
}

app.use('/health-checks', (req, res) => {
  res.send(APP_VERSION);
});

app.use(
  authMiddleware(),
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
);

app.use('/api', api);
app.use('/', createRequestHandler({
  build,
  getLoadContext: (req) => ({
    user: req.user,
    employee: req.employee,
    country: req.country,
    defaultLanguage: req.defaultLanguage,
  }),
}));

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error(err);
  const error = new RequestError(err);
  res.status(error.status).send(error);
});

app.listen(PORT, () => {
  console.log(`Express server with React Router middleware running on port http://localhost:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});
