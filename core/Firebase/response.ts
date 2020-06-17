export type ServerResponse = {
    statusCode:Number,
    errorType?:"popup" | "validation",
    param?:any
}