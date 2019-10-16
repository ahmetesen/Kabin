export default class ErrorManager{
    static _instance:ErrorManager;
    constructor(){
        if(!ErrorManager._instance){
            ErrorManager._instance = this;
        }
        else
            throw new Error("You cannot create second ErrorManager instance.");
    }
    static get instance(){
        if(!ErrorManager._instance)
            ErrorManager._instance = new ErrorManager();
        return ErrorManager._instance;
    }

    logErrors(errorMethod:string,error:string){
        
        throw new Error("logErrors method is not inplemented yet. The method that sent this error is:"+error);
    }

    sendErrors(){
        //TODO:Log Error On Firestore
    }
}