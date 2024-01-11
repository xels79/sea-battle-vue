import path from 'node:path';
import { FileStore } from './filestore.js';
import  require from './require.js';
import User from './user.js';
import ServerCore from './servercore.js';
import express_types from 'express';
const port = 3000;
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
const filesStore = new FileStore('server/publishList.json');
const core = new ServerCore();

const user = new User("Ивaн");
console.log(`User instance of User: ${user instanceof Object}`);
app.use(express.json());
app.use(cookieParser());
app.get('/', (req:express_types.Request, res:express_types.Response)=>res.sendFile(path.resolve( './index.html')) );
app.post('/',(request:express_types.Request,response:express_types.Response)=>core.run(request,response));
app.use((req:express_types.Request, res:express_types.Response)=>filesStore.publishFile(res, req.originalUrl));
app.listen(port, () => {
    console.log(`Сервер слушает порт ${port}`)
});