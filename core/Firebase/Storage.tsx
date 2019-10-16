import FirebaseCore from "./FirebaseCore";

export default class Storage{
    static _instance:Storage;
    //_storage
    constructor() {
        if(!Storage._instance)
            Storage._instance = this;
        else{
            throw new Error("Firebase/Storage is already initialized!");
        }
    }
    static get instance():Storage{
        if(!Storage._instance)
            Storage._instance = new Storage();
            
        return Storage._instance;
    }

    getAvatarUrl(id:string):Promise<any>{
        //TODO: ASYNC | change this to async method
        return new Promise((resolve,reject)=>{
            return FirebaseCore.instance.storage.ref('avatars/users/'+id).getDownloadURL().then((url)=>{
                if(url && url !== "")
                    return resolve(url);
                else
                    reject("no available url");
            }).catch((err)=>{
                return reject(err);
            })
        });
    }
}