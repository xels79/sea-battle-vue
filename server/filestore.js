import { JSONFiles } from './jsonfiles.js';
import path from 'node:path';
import fs from 'node:fs';
import require from './require.js';
const mime = require('mime-types');
export class FileStore{
    constructor(configPath){
        this._config = JSONFiles.getJSON(path.resolve(configPath));
        this._keys = Object.keys(this._config);
    }
    _findFullKey(url){
        const index = this._keys.indexOf( url );
        if (index > -1){
            return this._config[this._keys[index]];
        }else{
            return '';
        }
    }
    _findPartKey(url){
        const urlDirPart = path.dirname(url);
        const fName = path.basename(url);
        const key = this._keys.find(element => {
            const keyParts = element.split('/');
            if (keyParts[keyParts.length-1] === '*'){
                keyParts.pop();
            }else{
                return false;
            }
            if ((keyParts.join('/')) === urlDirPart){
                return true;
            }
        });
        if (key){
            return this._config[key]+'/'+fName;
        }else{
            return '';
        }
    }
    getFileByUrl(url){
        const relativePath = this._findFullKey(url) || this._findPartKey(url);
        if (relativePath){
            const fullPath = path.resolve(relativePath);
            console.log(`URL: "${url}"`);
            console.log(`\tПолный путь: "${fullPath}"`);
            if (fs.existsSync(fullPath)) {
                console.log("\tФайл существует");
                return fullPath;
            }else{
                console.warn(`Файл "${fullPath}" - не существует.`);
                return '';
            }
        }else{
            console.warn(`Запрос "${url}" - не найден`);
            return '';
        }
    }
    publishFileParam(filePath){
        const mmT = mime.lookup(filePath);
        console.log(`Параметры отправки файла "${path.basename(filePath)}"`);
        console.log(`\tMime-type: "${mmT}"`)
        return {
            path:filePath,
            header:{'Content-Type':mmT}
        }
    }
    publishFile(respose, url){
        const pathFile = this.getFileByUrl(url);
        if (pathFile){
            const publishParam = this.publishFileParam(pathFile);
            respose.set(publishParam.header);
            respose.sendFile(publishParam.path);
        }else{
            respose.sendStatus(404);
        }    
    }
}