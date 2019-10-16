import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';
import ErrorManager from "./ErrorManager";
import { Platform } from "react-native";
import Constants from 'expo-constants';
import Functions from "./Firebase/Functions";
import Firebase from './Firebase';
import { resolve } from "path";
import { rejects } from "assert";

export default class DeviceManager{
    static _instance:DeviceManager;
    _pushToken:string="";

    constructor(){
        if(!DeviceManager._instance){
            DeviceManager._instance = this;
        }
        else
            throw new Error("You cannot create second PermissionsManager instance.");
    }
    static get instance(){
        if(!DeviceManager._instance)
            DeviceManager._instance = new DeviceManager();
        return DeviceManager._instance;
    }

    get contentVersion():string{
        return "15";
    }

    get os():string{
        return Platform.OS;
    }

    get osVersion():string{
        return Platform.Version as string;
    }

    get appVersion():any{
        return Constants.nativeAppVersion;
    }

    get modelName():string{
        if(Constants.platform && Constants.platform.ios){
            return Constants.platform.ios.model;
        }
        else
            return Constants.deviceName as string;
    }

    get deviceId():string{
        return Constants.deviceId as string;
    }

    async registerOrGetPNTokenAsync(){
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            let x = 0;
        }
        let result = undefined;
        try{
            result = await Notifications.getExpoPushTokenAsync();
        }
        catch(err){
            ErrorManager.instance.logErrors("getExpoPushTokenAsync",err.toString());
        }
        
        if(result)
            this._pushToken = result;
    }

    async saveDeviceWithTokenToServer(){
        await this.registerOrGetPNTokenAsync();
        Firebase.initializeApp();
        var data = await Firebase.getInstance().saveDeviceWithTokenToServerAsync(this._pushToken,this.modelName,this.os,this.osVersion,this.appVersion,this.contentVersion);
        var k = data;
        //var data = await Functions.instance.saveDeviceWithTokenToServerAsync(this.pushToken,this.modelName,this.os,this.osVersion,this.appVersion,this.contentVersion);
    }
}