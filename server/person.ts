let _pID=1;
interface IPerson{
    id:number;
    token:string;
    enemyID:number;
    score:number;
    name:string;
}
class Person{
    protected _id:number;
    protected _token:string;
    protected _enemyID:number;
    protected _score:number;
    protected _name:string;
    constructor(params:(IPerson | string | undefined)){
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
    get name():string{return this._name;}
    get token():string{return this._token;}
    get score():number{return this._score;}
    get enemyID():number{return this._enemyID;}
    set score(val:number){
        this._score = val;
    }
    set enemyID(val:number){
        if (+val>0){
            this._enemyID = val;
        }else{
            console.warn("Person: значение enemyID должно быть большe 0");
        }
    }
    serialize():string{
        return JSON.stringify({
            id:this._id,
            name:this._name,
            enemyID:this._enemyID,
            score:this._score,
            token:this._token
        });
    }
}
export { IPerson, Person };
// export default Person;