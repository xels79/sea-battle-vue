import  require from './require.mjs';
import fs from 'node:fs';
import path from 'node:path';
const Mustache=require('mustache');
class ServerCore{
    constructor(){
        this._playersList = [];
    }
    renderFile(name, params){
        try{
            const view = fs.readFileSync(path.resolve(name), { encoding: 'utf8', flag: 'r' });
            return Mustache.render(view, params);
        }catch(error){
            console.error(error.name, error.message);
            return '';
        }
    }
    renderDialog(params){
        params=params || {};
        params.close = params.close || true;
        params.title = params.title || '';
        params.body = params.body || '';
        params.footer = params.footer || '';
        params.role = params.role || false;
        return this.renderFile('./views/dialog.html', params);
    }
    findUserByToken(token){
        return this._playersList.find(element=>element.token === token);
    }
    run(request, response){
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
    _noPlayer(request,response){
        if (request.body.execActionName && request.body.execActionName==='add user'){

        }else{
            response.json({
                status:'ok',
                action:{
                        name:'add user',
                        html:this.renderDialog({
                            role:'add user',
                            title:'Добавить игрока',
                            body:'<div class="controls__block><label class="control__label" for="user-name">Введите имя: </label><input class="control__input" id="user-name" type="text"/></div>',
                            footer:'<div class="control__block"><a id="add-user" class="btn" href="#">Добавить</a></div>'
                        })
                    }
            });
        }
    }
}

export default ServerCore;