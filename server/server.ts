/* eslint-disable @typescript-eslint/no-unused-vars */
import express from 'express';
import { createRequestHandler } from '@react-router/express';
import path from 'path';
import bodyParser from 'body-parser';
import './services/i18n';
import asyncDB from './db/asyncDB';
import api from './api';
import config from '../config.json';


const {
  PORT = 3000,
  NODE_ENV = 'development',
} = process.env;


const app = express();

// Static file serving
app.use(express.static('server/public'));

await asyncDB();

let build;
if (NODE_ENV === "production") {
  // Production environment: use built static files
  app.use(express.static("build/client", { maxAge: 60 * 60 * 24 * 1000 }));
  build = () => import(path.join(process.cwd(), "build/server/index.js")) as any;
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

app.use(
  bodyParser.json(),
  bodyParser.urlencoded({ extended: true }),
);
app.use('/health-checks', (req, res) => {
  res.send(config.APP_VERSION);
});
app.use('/api', api);
app.all('/', createRequestHandler({ build }));

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, _next: express.NextFunction) => {
  console.error('Server error:', err);
  res.status(500).send('Internal Server Error');
});

app.listen(PORT, () => {
  console.log(`Express server with React Router middleware running on port http://localhost:${PORT}`);
  console.log(`Environment: ${NODE_ENV}`);
});
