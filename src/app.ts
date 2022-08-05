import express, { Express } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import CORS from 'cors';

import Routes from './routes';

const app: Express = express();

app.use(
  CORS({
    origin: ['http://localhost:3000', 'https://localhost:3000'],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', Routes);

export default app;
