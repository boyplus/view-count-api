import dotenv from 'dotenv';

import app from './app';
import databaseConnector from './database';

dotenv.config();

const port = process.env.PORT || 5050;

databaseConnector();

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at https://localhost:${port}`);
});
