import * as MailComposer from 'expo-mail-composer';
import DeviceManager from './device-manager';

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

    async sendEmail(text:string,methodName:string){
        const deviceDetails = DeviceManager.instance.currentDevice.all();
        const composeOptions:MailComposer.MailComposerOptions = {
            subject:'Kabin Mobile - Error Email',
            body:text + '\n' + 'Method Name: '+methodName + '\n' + deviceDetails,
            recipients:['kabinmobile@gmail.com']
        }
        try{
            const result = await MailComposer.composeAsync(composeOptions);
        }
        catch(err){
            console.log(err);
        }
    }
}