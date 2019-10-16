
import Storage from "../core/Firebase/Storage";

export class AppUser{
    displayName:string | undefined;
    email:string | undefined;
    _avatar:string | undefined;
    about:string | undefined;
    position:string | undefined;
    uid: string | undefined;
    emailVerified:boolean|undefined;

    constructor() {
        
    }

    get avatar():Promise<string|Error>{
        return new Promise((resolve,reject)=>{
            if(!this.uid)
                return reject(new Error("User id is not defined"));
            if(this._avatar)
                return resolve(this._avatar);
            else{
                return Storage.instance.getAvatarUrl(this.uid).then((url)=>{
                    return resolve(url);
                }).catch((error)=>{
                    return reject(error);
                });
            }
        });
    }
}

