import fs from 'node:fs';
export class JSONFiles{
    static getJSON(path){
        let rVal={};
        try{
            const rawdata = fs.readFileSync(path); 
            rVal = JSON.parse(rawdata);
        }catch(error){
            console.error(error.name,error.message);
            rVal = {};
        }
        return rVal;
    }
}