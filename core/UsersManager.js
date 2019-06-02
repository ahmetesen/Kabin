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
    avatars={};
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

    setMeAfterLoggedIn(key,user){
        UsersManager.instance.me = {
            uid:key,
            displayName:user.displayName,
            about:user.about
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

    setDisplayName(displayName){
        return new Promise((resolve,reject)=>{
            return Firebase.getInstance().setDisplayName(displayName).then(()=>{
                UsersManager.instance.me.displayName = displayName;
                return resolve();
            }).catch((error)=>{
                return reject(error);
            })
        });
    }

    setAbout(about){
        return new Promise((resolve,reject)=>{
            return Firebase.getInstance().saveAboutText(about).then(()=>{
                UsersManager.instance.me.about = about;
                return resolve();
            }).catch((error)=>{
                return reject(error);
            })
        });
    }

    setMyAvatar(avatar,localUri){
        return new Promise((resolve,reject)=>{
            Firebase.getInstance().setProfilePicture(avatar).then(()=>{
                UsersManager.instance.avatars[UsersManager.instance.me.uid]=localUri;
                return resolve();
            }).catch((error)=>{
                return reject(error);
            })
        });
    }

    getAvatar(key){
        return new Promise((resolve,reject)=>{
            if(UsersManager.instance.avatars[key])
                return resolve({avatar:UsersManager.instance.avatars[key],newKey:key});
            else{
                return Firebase.getInstance().getAvatar(key).then((avatar) => {
                    UsersManager.instance.avatars[key]=avatar;
                    return resolve({avatar:avatar,newKey:key});
                }).catch((error)=>{
                    return reject(error);
                });
            }
        });
    }

    getMyAvatar(){
        return new Promise((resolve,reject)=>{
            return UsersManager.instance.getAvatar(UsersManager.instance.me.uid).then((avatar)=>{
                return resolve(avatar);
            }).catch((error)=>{
                return reject(error);
            });
        });
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

    getProfileDetails(key){
        return new Promise((resolve,reject)=>{
            return Firebase.getInstance().getProfileDetails(key).then((data)=>{
                return resolve(data);
            }).catch((error)=>{
                return reject(error);
            });
        })
    }
}

UsersManager.instance = new UsersManager();