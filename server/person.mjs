let _pID=1;
class Person{
    constructor(params){
        if (params instanceof Object){
            ({
                id:this._id,
                token:this._token,
                enemyID:this._enemyID = 0,
                score:this._score = 0,
                name:this._name
            } = params);
            if (!this._id){
                this._id = _pID++;
            }
        }else{
            this._id = _pID;
            this._name = params || 'Player '+_pID;
            this._token = '';
            this._score = 0;
            this._enemyID = 0;
            _pID++;
        }
    }
    get name(){return this._name;}
    get token(){return this._token;}
    get score(){return this._score;}
    get enemyID(){return this._enemyID;}
    set score(val){
        if (typeof(val) === 'number'){
            this._score = val;
        }else{
            console.warn("Person: значение score должно быть число");
        }
    }
    set enemyID(val){
        if (+val>0){
            this._enemyID = val;
        }else{
            console.warn("Person: значение enemyID должно быть большк 0");
        }
    }
    serialize(){
        return JSON.stringify({
            id:this._id,
            name:this._name,
            enemyID:this._enemyID,
            score:this._score,
            token:this._token
        });
    }
}
export default Person;