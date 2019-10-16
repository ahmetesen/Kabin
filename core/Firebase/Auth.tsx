import FirebaseCore from "./FirebaseCore";
import { User } from "firebase";

export default class Auth{
    static _instance:Auth;
    _events:Array<(user:User|null)=>any> = [];
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
}