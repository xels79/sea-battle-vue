import path from 'node:path';
import { FileStore } from './filestore.js';
import  require from './require.js';
import User from './user.js';
import ServerCore from './servercore.js';

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
app.get('/', (req, res)=>res.sendFile(path.resolve( './index.html')) );
app.post('/',(request,response)=>core.run(request,response));
app.use((req, res)=>filesStore.publishFile(res, req.originalUrl));
app.listen(port, () => {
    console.log(`Сервер слушает порт ${port}`)
});