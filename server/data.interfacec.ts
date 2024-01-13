import ServerAction from "./serveraction.js"
type SSJSon = {
    [key: string]: string
}
type SAnyJSon = {
    [key: ( string | number )]:(string | number | boolean | undefined | null)
}
interface IActionID{
    name:string,
    message?:string,
    data?:SAnyJSon
}
interface IResponse{
    status:String,
    action:ServerAction
}

export type {SSJSon, SAnyJSon, IActionID, IResponse};