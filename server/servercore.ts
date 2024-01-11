import require from './require.js';
import fs from 'node:fs';
import path from 'node:path';
import User from './user.js'
import { SAnyJSon } from "./data.interfacec.js";
import express_types from 'express';
import { toDisplayString } from 'vue';
const Mustache=require('mustache');
interface IActionID{
    name:string,
    message?:string,
    data?:SAnyJSon
}
interface IResponse{
    status:String,
    action:ServerAction
}
class ServerAction implements IActionID{
    name: string;
    message?: string;
    data?: SAnyJSon;
    constructor(name:string, message:string,data:SAnyJSon){
        this.name = name;
        this.message = message;
        this.data = data;
    }
    stringifi():string{
        return JSON.stringify(this);
    }
    run():void{}
}
class AddUserAction extends ServerAction{
    constructor(){
        super("adduser", "Добавить пользователя", {});
    }
}
class ServerResponse implements IResponse{
    status: String;
    action: ServerAction;
    constructor(status:string, action:ServerAction){
        this.status = status;
        this.action = action;
    }
    stringifi():string{
        return JSON.stringify(this);
    }
}
class ServerCore{
    _playersList:User[];
    constructor(){
        this._playersList = [];
        console.warn('coreTest');
        const tmp:ServerResponse = new ServerResponse("ok", new ServerAction("add user", "all right", {"key1":23}));
        console.warn( tmp.stringifi());
    }
    findUserByToken(token:string):(User | undefined){
        return this._playersList.find(element=>element.token === token);
    }
    run(request:express_types.Request, response:express_types.Response):void{
        if (request.cookies && request.cookies.token && this._playersList.length){
            const user = this.findUserByToken(request.cookies.token);
            if (user){

            }else{
                this._noPlayer(request, response);
            }
        }else{
            this._noPlayer(request, response);
        }
    }
    _noPlayer(request:express_types.Request, response:express_types.Response){
        if (request.body.execActionName && request.body.execActionName==='add user'){

        }else{
            response.json(JSON.stringify(new ServerResponse("ok", new AddUserAction())));
        }
    }
}

export default ServerCore;