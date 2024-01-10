import fs from 'node:fs';
export class JSONFiles{
    static getJSON(path:string):Object{
        let rVal={};
        try{
            const rawdata = fs.readFileSync(path); 
            rVal = JSON.parse(rawdata.toString());
        }catch(error:(any | unknown)){
            console.error(error.name,error.message);
            rVal = {};
        }
        return rVal;
    }
}