import { Notifications } from "expo";
import * as Permissions from 'expo-permissions';
import { Platform, AppState } from "react-native";
import Constants from 'expo-constants';
import Device from "../model/device";
import params from '../constants/params';
import * as SecureStore from 'expo-secure-store';
import ConnectionManager from "./connection-manager";
import Functions from "./firebase/functions";

export default class DeviceManager{
    static _instance:DeviceManager;
    currentDevice:Device = new Device();
    _initialized: boolean = false;
    isRunningInFrontOfScreen:boolean = false;

    constructor(){
        if(!DeviceManager._instance){
            DeviceManager._instance = this;
            this.currentDevice.appV = Constants.nativeAppVersion?Constants.nativeAppVersion:undefined;
            this.currentDevice.expoV = params.appV;
            this.currentDevice.os = Platform.OS;
            this.currentDevice.osV = Platform.Version as string;
            if(Constants.platform && Constants.platform.ios){
                this.currentDevice.d = Constants.platform.ios.model;
            }
            else
                this.currentDevice.d = Constants.deviceName as string;
        }
        else
            throw new Error("You cannot create second DeviceManager instance.");
    }
    static get instance(){
        if(!DeviceManager._instance)
            DeviceManager._instance = new DeviceManager();
        return DeviceManager._instance;
    }

    async initializeCurrentDevice():Promise<boolean>{
        if(!this._initialized)
            AppState.addEventListener('change',(nextAppState) => {
                if (nextAppState === 'active') 
                    this.gettingFront();
                else
                    this.gettingBackground();
            });
        this.gettingFront();
        
        const isIdAvailable = await this.checkDeviceIdFromSecureStorage();
        this.currentDevice.t = await this.registerOrGetPNTokenAsync();
        if(isIdAvailable === true && this.currentDevice.t !== undefined){
            const result = await Functions.instance.updateDeviceTokenOnDb(this.currentDevice.dId,this.currentDevice.t);
        }
        else if(isIdAvailable === false){
            const deviceId = await Functions.instance.createDeviceAndSaveToDb(this.currentDevice);
            if(deviceId){
                try{
                    await SecureStore.setItemAsync('dId',deviceId);
                }
                catch(err){
                    return false;
                }
                this.currentDevice.dId = deviceId;
            }
            else
                return false;
        }
        this._initialized = true;
        return true;
    }

    async attachUserToDevice():Promise<boolean>{
        let result = false;
        if(this.currentDevice.uid !== undefined)
            result = await Functions.instance.attachUserToDevice(this.currentDevice.dId,this.currentDevice.uid);
        else
            result = await Functions.instance.attachUserToDevice(this.currentDevice.dId);
        return result
    }

    async gettingFront(){
        ConnectionManager.instance.paused = false;
        this.isRunningInFrontOfScreen = true;
        Notifications.setBadgeNumberAsync(0);
        if(Platform.OS === "android"){
            Notifications.dismissAllNotificationsAsync();
        }
    }

    async gettingBackground(){
        ConnectionManager.instance.paused = true;
        this.isRunningInFrontOfScreen = false;
    }

    async checkDeviceIdFromSecureStorage():Promise<boolean>{
        try{
            this.currentDevice.dId = await SecureStore.getItemAsync('dId') || undefined;
        }
        catch(err){
            return false;
        }

        if(this.currentDevice.dId){
            return true;
        }

        return false;
    }

    async registerOrGetPNTokenAsync():Promise<string | undefined>{
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            return undefined;
        }
        let result = undefined;
        try{
            result = await Notifications.getExpoPushTokenAsync();
        }
        catch(err){
            return undefined;
        }
        
        return result;
    }

    deviceInfo():string{
        return this.currentDevice.all();
    }
}