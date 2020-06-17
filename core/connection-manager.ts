import * as Network from 'expo-network';
import { Alert } from 'react-native';
import { i18n } from '../constants/language';

export default class ConnectionManager{
    isOnline:Boolean | undefined;
    isConnected:Boolean | undefined;
    _timer:Date = new Date();
    _locked:Boolean = false;
    _delayMilliseconds = 3000;
    private static _instance:ConnectionManager;
    _listeningStarted:Boolean = false;
    private _paused: boolean = false;
    
    public get paused(): boolean {
        return this._paused;
    }
    public set paused(value: boolean) {
        this._paused = value;
    }

    constructor() {
        if(!ConnectionManager._instance)
            ConnectionManager._instance = this;
        else{
            throw new Error("ConnectionManager is already initialized!");
        }
    }

    static get instance():ConnectionManager{
        if(!ConnectionManager._instance)
            ConnectionManager._instance = new ConnectionManager(); 
        return ConnectionManager._instance;
    }

    showConnectionWarning() {
        Alert.alert(
            i18n.t('errors_connectionError_title'),
            i18n.t('errors_connectionError_message'),
        );
    }

    async startListening(){
        if(this._listeningStarted)
            return;
        this._listeningStarted = true;
        this._checkConnection();        
        setInterval(async ()=>{
            await this._checkConnection();
        },this._delayMilliseconds);
    }

    

    async _checkConnection(){
        if(this._locked || this._paused)
            return null;
        this._locked = true;
        try{
            const result = await Network.getNetworkStateAsync();
            this.isConnected = result.isConnected;
            this.isOnline = result.isInternetReachable;
            this._locked = false;
        }
        catch(err){
            this._locked = false;
        }
    }

    checkConnection():boolean{
        if(this.isOnline && this.isOnline===true)
            return true;
        else{
            this.showConnectionWarning();
            return false;
        }
    }
}