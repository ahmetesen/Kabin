import FirebaseCore from "./FirebaseCore";
import app from 'firebase/app';

export default class Functions{
    static _instance:Functions;
    _funcs:firebase.functions.Functions;
    _version:string = "a_";
    _saveDeviceToFirestore:app.functions.HttpsCallable;
    _sendErrorToFirestore:app.functions.HttpsCallable;
    //_storage
    constructor() {
        if(!Functions._instance){
            this._funcs = FirebaseCore.instance.functions;
            this._saveDeviceToFirestore = this._funcs.httpsCallable(this._version+'saveDeviceToFirestore');
            this._sendErrorToFirestore = this._funcs.httpsCallable(this._version+'saveErrorToFirestore');
            Functions._instance = this;
        }
        else{
            throw new Error("Firebase/Functions is already initialized!");
        }
    }
    static get instance():Functions{
        if(!Functions._instance)
            Functions._instance = new Functions();
        return Functions._instance;
    }

    saveDeviceWithTokenToServerAsync(pushToken:string,device:string,os:string,osVersion:string,appVersion:any,contentVersion:string):Promise<any>{
        return new Promise((resolve,reject)=>{
            Functions.instance._saveDeviceToFirestore({
                pushToken,
                device,
                osVersion,
                appVersion,
                contentVersion
            }).then((response)=>{
                return resolve(response.data);
            }).catch((response)=>{
                return reject(response.data);
            });
        });
    }
}