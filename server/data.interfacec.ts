type SSJSon = {
    [key: string]: string
}
type SAnyJSon = {
    [key: ( string | number )]:(string | number | boolean | undefined | null)
}
export {SSJSon, SAnyJSon};