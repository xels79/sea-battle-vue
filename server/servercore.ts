import require from './require.js';
import fs from 'node:fs';
import path from 'node:path';
import User from './user.js'
import { IResponse } from "./data.interfacec.js";
import express_types from 'express';
import ServerAction from "./serveraction.js";
import { toDisplayString } from 'vue';
const Mustache=require('mustache');
// interface IResponse{
//     status:String,
//     action:ServerAction
// }
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
            setTimeout(()=>
            response.json(new ServerResponse("ok", new AddUserAction())),
            2000);
        }
    }
}

export default ServerCore;