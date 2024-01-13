import ServerAction from "./serveraction.js"
import { IPerson } from "./person"
export type SSJSon = {
    [key: string]: string
}
export type SAnyJSon = {
    [key: ( string | number )]:(string | number | boolean | undefined | null | IPerson[] | IPerson)
}
export interface IActionID{
    name:string,
    message?:string,
    data?:SAnyJSon
}
export interface IResponse{
    status:String,
    action:ServerAction
}
export interface IServerConnector{
    getShortUsersList():IPerson[]
}

//export type {SSJSon, SAnyJSon, IActionID, IResponse};