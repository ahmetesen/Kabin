import Firebase from "./Firebase";

export default class UsersManager{
    _instantiated = false;
    constructor(){
        
        if(!this._instantiated){
            this.version=0;
            this._instantiated=true;
        }
        else
            throw new Error("You cannot create instance via constructor.");
    }
    users={};

    getUserName(key){
        return new Promise((resolve,reject)=>{
            if(UsersManager.instance.users[key])
                return resolve(UsersManager.instance.users[key]);
            else{
                return Firebase.getInstance().getName(key,(name)=>{
                    UsersManager.instance.users[key]=name;
                    return resolve(name);
                },(error)=>{
                    return reject(error);
                })
            }
        });
    }
}
UsersManager.instance = new UsersManager();