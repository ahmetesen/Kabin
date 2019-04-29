import Firebase from "./Firebase";

export default class UsersManager{
    static INSTANTIATED = false;
    constructor(){
        
        if(!UsersManager.INSTANTIATED){
            this.version=0;
            UsersManager.INSTANTIATED=true;
        }
        else
            throw new Error("You cannot create instance via constructor.");
    }
    users={};
    blockedUsers = {};
    rooms={};
    me={
        about:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec laoreet pretium vestibulum. Morbi quis rhoncus mauris. Mauris diam tortor, auctor at sem vitae, interdum commodo turpis. ",
    };

    checkIfBlocked(key){
        if(UsersManager.instance.blockedUsers[key])
            return UsersManager.instance.blockedUsers[key];
        else
            return false;
    }

    setMeAfterLoggedIn(key,displayName){
        UsersManager.instance.me = {
            id:key,
            displayName:displayName
        };
    }

    pushToBlockedList(key,value){
        if(!UsersManager.instance.checkIfBlocked(key))
            UsersManager.instance.blockedUsers[key] = value;
    }

    removeFromBlockedList(key){
        if(UsersManager.instance.blockedUsers[key])
            UsersManager.instance.blockedUsers[key] = false;
    }

    getUserName(key){
        return new Promise((resolve,reject)=>{
            if(UsersManager.instance.users[key])
                return resolve({displayName:UsersManager.instance.users[key],newKey:key});
            else{
                return Firebase.getInstance().getName(key,(name) => {
                    UsersManager.instance.users[key]=name;
                    return resolve({displayName:name,newKey:key});
                },(error)=>{
                    return reject(error);
                })
            }
        });
    }
}

UsersManager.instance = new UsersManager();