export default class ErrorManager{
    _instance = new ErrorManager();
    constructor(){
        if(!_instance){
            _instance = this;
        }
        else
            throw new Error("You cannot create instance via constructor.");
    }

    static getInstance(){
        if(!_instance)
            _instance = new ErrorManager();
        return _instance;
    }

    logErrors(error){
        throw new Error("logErrors method is not inplemented yet. The error that sent this method is:"+error);
    }
}