import { IActionID,SAnyJSon, IServerConnector } from './data.interfacec.js'
class ServerAction implements IActionID{
    name: string;
    message?: string;
    data?: SAnyJSon;
    server:IServerConnector;
    constructor(server:IServerConnector, name:string, message:string,data:SAnyJSon){
        this.name = name;
        this.message = message;
        this.data = data;
        this.server = server;
    }
    stringifi():string{
        return JSON.stringify(this);
    }
    run():void{}
}

export default ServerAction;