const express = require('express');
const serverless = require('serverless-http');

const api = express();

const router = express.Router();

api.use('/api/', router);

export const handler = serverless(api);