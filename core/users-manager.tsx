import AppUser from "../model/app-user";
import Functions from "./firebase/functions";
import Auth from "./firebase/auth";

export default class UsersManager{
    static _instance:UsersManager;
    constructor(){
        if(!UsersManager._instance){
            UsersManager._instance = this;
        }
        else
            throw new Error("You cannot create second UsersManager instance!");
    }
    static get instance(){
        if(!UsersManager._instance)
            UsersManager._instance = new UsersManager();
        return UsersManager._instance;
    }
}
