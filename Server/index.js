import express from 'express';

const app = express();
const port = 3000;

import cors from 'cors';
app.use(cors());

app.use(express.json()) 
app.use(express.urlencoded({ extended: true })) 

import * as sequelize from "./config/connect.config.js";

import integrateToIDBService from './services/integrateToIDB.service.js';
import loadDataIntoWHService from './services/loadDataIntoWH.service.js';
import { CronJob } from 'cron';
const job = new CronJob(
  '57 22 * * *',
  async () => {
    
  },
  null,
  true,
  'Asia/Ho_Chi_Minh'
);

// integrateToIDBService();
// loadDataIntoWHService();

import indexRoute from './routes/index.route.js';
indexRoute(app);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});