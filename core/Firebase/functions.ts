import FirebaseCore from "./firebase-core";
import app from 'firebase/app';
import Device from "../../model/device";
import { ServerResponse } from "./response";
import ConnectionManager from "../connection-manager";
import AppUser from "../../model/app-user";

export default class Functions{
    static _instance:Functions;
    _isPingReturned:boolean|undefined;
    _funcs:firebase.functions.Functions;
    _currentVersion:app.functions.HttpsCallable;
    constructor() {
        if(!Functions._instance){
            this._funcs = FirebaseCore.instance.functions;
            this._funcs.useFunctionsEmulator("http://localhost:5001");
            this._currentVersion = this._funcs.httpsCallable('v2');
            Functions._instance = this;
        }
        else
            throw new Error("Firebase/Functions is already initialized!");
    }
    static get instance():Functions{
        if(!Functions._instance)
            Functions._instance = new Functions();
        return Functions._instance;
    }

    async ping():Promise<void>{
        let response:KabinCallableResult;
        try{
            response = await this._currentVersion({m:'ping'});
        }catch(err){
            this._isPingReturned = true;
            return;
        }
        
        if(response && response.data && response.data.statusCode && response.data.statusCode === 200)
            this._isPingReturned = true;
        else
        this._isPingReturned = false;
    }

    async checkIfEmailValid(email:string):Promise<ServerResponse | undefined>{
        if(!await this.isServiceAvailable())
            return undefined;
        
        let response:KabinCallableResult;
        try{
            response = await this._currentVersion({m:'checkIfEmailValid',b:email});
        }catch(err){
            return undefined;
        }
        if(response && response.data)
            return response.data
        else
            return undefined;
    }

    async createDeviceAndSaveToDb(d:Device):Promise<string|undefined>{
        if(!await this.isServiceAvailable())
            return undefined;
        
        let response:KabinCallableResult;
        try{
            response = await this._currentVersion({m:'createDeviceAndSaveToDb',b:d});
        }catch(err){
            return undefined;
        }
        if(response && response.data && response.data.statusCode && response.data.statusCode === 200)
            return response.data.param;
        else
            return undefined;
    }

    async updateDeviceTokenOnDb(dId:string|undefined,t:string|undefined):Promise<boolean>{
        if(!await this.isServiceAvailable())
            return false;
        
        let response:KabinCallableResult;
        try{
            response = await this._currentVersion({m:'updateDeviceTokenOnDb',b:{dId,t}});
        }catch(err){
            return false;
        }
        if(response && response.data && response.data.statusCode && response.data.statusCode === 200)
            return true;
        else
            return false;
    }

    async attachUserToDevice(dId:string|undefined, uid?:string):Promise<boolean>{
        if(!await this.isServiceAvailable())
            return false;
        
        let response:KabinCallableResult;
        try{
            response = await this._currentVersion({m:'attachUserToDevice',b:{dId,uid}});
        }
        catch(err){
            return false;
        }
        
        if(response && response.data && response.data.statusCode && response.data.statusCode === 200)
            return true;
        else
            return false;
    }

    async setNewUser(displayName:string):Promise<KabinCallableResult>{
        let response:KabinCallableResult = new KabinCallableResult();
        response.data = {statusCode:400};
        if(!await this.isServiceAvailable())
            return response;
        
        try{
            response = await this._currentVersion({m:'setNewUser',b:{n:displayName}});
        }
        catch(err){
            return response;
        }
        return response;
    }

    async isServiceAvailable():Promise<boolean>{
        if(!ConnectionManager.instance.isOnline)
            await this.sleep(3000);
        if(!ConnectionManager.instance.isOnline)
            return false;
        else
            return true;
    }

    async sleep(ms:number){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

class KabinCallableResult implements app.functions.HttpsCallableResult{
    data: ServerResponse | undefined;
}