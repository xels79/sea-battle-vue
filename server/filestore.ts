import { JSONFiles } from './jsonfiles';
import path from 'node:path';
import fs from 'node:fs';
import require from './require';
import { strict } from 'node:assert';
const mime = require('mime-types');
import express from 'express';
interface sendFileHeaderI{
    path:string,
    header:Object
};
type SSJSon = {
    [key: string]: string
}
export class FileStore{
    _config:SSJSon={};
    _keys:string[];
    constructor(configPath:string){
        this._config = <SSJSon>JSONFiles.getJSON(path.resolve(configPath));
        this._keys = Object.keys(this._config);
    }
    _findFullKey(url:string):string{
        const index:number = this._keys.indexOf( url );
        if (index > -1){
            return this._config[this._keys[index]];
        }else{
            return '';
        }
    }
    _findPartKey(url:string):(string | boolean){
        const urlDirPart:string = path.dirname(url);
        const fName:string = path.basename(url);
        const key:( string | undefined ) = this._keys.find(( element:string ) => {
            const keyParts:string[] = element.split('/');
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
    getFileByUrl(url:string):string{
        const relativePath:(string | boolean) = this._findFullKey(url) || this._findPartKey(url);
        if (relativePath){
            const fullPath:string = path.resolve(<string>relativePath);
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
    publishFileParam(filePath:string):sendFileHeaderI{
        const mmT:string = mime.lookup(filePath);
        console.log(`Параметры отправки файла "${path.basename(filePath)}"`);
        console.log(`\tMime-type: "${mmT}"`)
        return {
            path:filePath,
            header:{'Content-Type':mmT}
        }
    }
    publishFile(respose:express.Response, url:string):void{
        const pathFile = this.getFileByUrl(url);
        if (pathFile){
            const publishParam:sendFileHeaderI = this.publishFileParam(pathFile);
            respose.set(publishParam.header);
            respose.sendFile(publishParam.path);
        }else{
            respose.sendStatus(404);
        }    
    }
}