import { Person, IPerson } from './person';
import crypto from 'node:crypto';
const SALT = '$ome$alt';
class User extends Person{
    private _tokenExpired:number = 0;
    constructor(name:(IPerson | string | undefined)){
        super(name);
        this._token = User.createHash(this.name + (new Date().toLocaleString()));
        this.refreshToken();
    }
    refreshToken():void{
        this._tokenExpired = (new Date()).getTime() + User.userLiveMs();
    }
    static createHash(str:string):string {
        return crypto.createHmac('sha256', SALT)
            .update(str)
            .digest('hex');
    }
    static userLiveMs():number{
        return 60*10*1000;
    }

}
export default User;