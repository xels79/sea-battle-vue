import Person from './person.mjs';
import crypto from 'node:crypto';
const SALT = '$ome$alt';
class User extends Person{
    constructor(name){
        super(name);
        this._token = User.createHash(this.name + (new Date(this._lastRequestTime).toLocaleString()));
        this.refreshToken();
    }
    refreshToken(){
        this._tokenExpired = (new Date()).getTime() + User.userLiveMs();
    }
    static createHash(str) {
        return crypto.createHmac('sha256', SALT)
            .update(str)
            .digest('hex');
    }
    static userLiveMs(){
        return 60*10*1000;
    }

}
export default User;