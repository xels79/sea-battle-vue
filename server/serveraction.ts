import { IActionID,SAnyJSon } from './data.interfacec.js'
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

export default ServerAction;