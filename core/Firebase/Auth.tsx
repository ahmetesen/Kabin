import FirebaseCore from "./firebase-core";
import { User } from "firebase";
import ConnectionManager from "../connection-manager";
import DeviceManager from "../device-manager";
import Functions from "./functions";

export default class Auth{
    static _instance:Auth;
    _events:Array<(user:User|null)=>any> = [];
    stillCheckVerify:boolean = true;
    constructor() {
        if(!Auth._instance){
            Auth._instance = this;
            FirebaseCore.instance.auth.onAuthStateChanged(this._authStateChanged);
            this._authStateChanged = this._authStateChanged.bind(this);
        }
        else{
            throw new Error("Firebase/Auth is already initialized!");
        }
    }
    static get instance():Auth{
        if(!Auth._instance)
            Auth._instance = new Auth();
        return Auth._instance;
    }

    _authStateChanged(user:User|null){
        if(user)
            DeviceManager.instance.currentDevice.uid = user.uid;
        else
            DeviceManager.instance.currentDevice.uid = undefined;
        Auth.instance._events.forEach((funcs)=>{
            funcs(user);
        })
    }

    addAuthStateChangeEvent(func:(user:User|null)=>any){
        this._events.push(func);
    }

    removeAuthStateChangeEvent(func:(user:User|null)=>any){
        const index = this._events.indexOf(func);
        if (index > -1) {
            this._events.splice(index, 1);
        }
    }

    async waitUntilVerified():Promise<boolean>{
        if(this.currentUser !== null && this.stillCheckVerify === true){
            if(DeviceManager.instance.isRunningInFrontOfScreen === false){
                await this.sleep(1000);
                return await this.waitUntilVerified();
            }
            await this.currentUser.reload();
            if(this.currentUser !== null && this.currentUser.emailVerified === true)
                return true;
            else{
                await this.sleep(1000);
                return await this.waitUntilVerified();
            }
        }
        else
            return false;
    }

    async signup(displayName:string,email:string,password:string):Promise<string>{
        let result:firebase.auth.UserCredential;
        try{
            result = await FirebaseCore.instance.auth.createUserWithEmailAndPassword(email,password);
        }
        catch(err){
            return err.code as string;
        }
        try{
            await Functions.instance.setNewUser(displayName);
        }
        catch(err){
            
        }
        if(result.user)
            return '';
        else
            return 'errors_defaultErrorTitle';
    }

    async remindPassword(email:string):Promise<string>{
        try{
            await FirebaseCore.instance.auth.sendPasswordResetEmail(email);
        }
        catch(error){
            return error.code as string;
        }

        return '';
    }

    async login(email:string, password:string):Promise<string>{
        let result:firebase.auth.UserCredential;
        try{
            result = await FirebaseCore.instance.auth.signInWithEmailAndPassword(email,password);
        }
        catch(error){
            return error.code as string;
        }
        return '';
    }

    async logout():Promise<string>{
        try{
            await FirebaseCore.instance.auth.signOut();
        }
        catch(error){
            return error.code as string;
        }

        return '';
    }

    async sendVerificationEmail():Promise<string>{
        if(this.currentUser === null)
            return 'errors_defaultErrorTitle';
        try{
            await FirebaseCore.instance.auth.currentUser?.sendEmailVerification();
        }
        catch(error){
            return error.code as string;
        }
        return '';
    }

    get currentUser(){
        return FirebaseCore.instance.auth.currentUser;
    }

    async sleep(ms:number){
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}