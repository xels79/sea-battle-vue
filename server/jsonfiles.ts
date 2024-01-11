import fs from 'node:fs';
import { SSJSon } from './data.interfacec.js';
class JSONFiles{
    static getJSON(path:string):SSJSon{
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
export {SSJSon, JSONFiles}