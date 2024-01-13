import require from './require.js';
import fs from 'node:fs';
import path from 'node:path';
import User from './user.js'
import { IPerson } from './person';
import { IResponse, IServerConnector } from "./data.interfacec.js";
import express_types from 'express';
import ServerAction from "./serveraction.js";
import { toDisplayString } from 'vue';
import { json } from 'stream/consumers';
const Mustache=require('mustache');
// interface IResponse{
//     status:String,
//     action:ServerAction
// }
class AddUserAction extends ServerAction{
    constructor(server:IServerConnector){
        super(server, "adduser", "Добавить пользователя", {});
    }
}
class GetUserListAction extends ServerAction{
    constructor(server:IServerConnector, userList: IPerson[]){
        super(server, 'getuserlist','Список пользователей', {
            userList: userList
        });
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
class ServerCore implements IServerConnector{
    _playersList:User[];
    constructor(){
        this._playersList = [];
        console.warn('coreTest');
        const tmp:ServerResponse = new ServerResponse("ok", new ServerAction(this, "add user", "all right", {"key1":23}));
        console.warn( tmp.stringifi());
    }
    findUserByToken(token:string):(User | undefined){
        return this._playersList.find(element=>element.token === token);
    }
    getActionName(request:express_types.Request): (string | undefined){
        return (request.body && request.body.action && request.body.action.name)?request.body.action.name:undefined;
    }
    run(request:express_types.Request, response:express_types.Response):void{
        const aName: (string | undefined) = this.getActionName(request);
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
        const aName: (string | undefined) = this.getActionName(request);
        if (aName === 'getuserlist'){
            response.json(new ServerResponse("ok", new GetUserListAction(this, [])));
        }else if (aName==='adduser'){

        }else{
            setTimeout(()=>
            response.json(new ServerResponse("ok", new AddUserAction(this))),
            2000);
        }
    }
    getShortUsersList():IPerson[]{
        return [];
    }
}

export default ServerCore;