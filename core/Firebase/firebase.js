import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';
import {TEST_PASSWORD} from '../../constants/global-strings';
import PushSheet from '../../components/views/PushSheet';
import { Permissions, Notifications } from 'expo';

const signInWithEmailAndPasswordErrors = {
    "auth/invalid-email":"E-posta adresinde bir hata var. Kontrol eder misin?",
    "auth/user-disabled":"Hesabın bloke olmuş :( Bizimle iletişime geçer misin?",
    "auth/user-not-found":"Giriş yapabilmen için üye olman gerekir. ",
    "auth/wrong-password":"Parolanı hatalı girdin. Kontrol eder misin?",
    "other":"Daha sonra tekrar dener misin? Bir hata oluşmuş ve bunu kontrol edeceğiz.",
    "restrictedPassword":"Bu parolayı kullanmaman gerekir. Yakın bir zamanda parolanı değiştirip sana e-posta göndereceğiz."
};

const createUserWithEmailAndPasswordErrors = {
    "auth/email-already-in-use":"Eposta adresin maalesef kullanımda. Eposta adresini kontrol eder misin?",
    "auth/invalid-email":"Eposta adresinde bir hata olabilir mi? Bir kontrol et istersen. ",
    "auth/operation-not-allowed":"Bir hata oluştu. Engellenmiş de olabilirsin.",
    "auth/weak-password":"Şifren yeterince güçlü değil. 111 falan mı yaptın? Farklı birşeyler deneyebilir misin?",
    "other":"Daha sonra tekrar dener misin? Bir hata oluşmuş ve bunu kontrol edeceğiz.",
    "auth/argument-error":"Şifren geçerli bir şifre değil. Karakterlerde bir problem olabilir mi?"
};

const sendEmailVerificationErrors = {
    "other":"Eposta gönderilirken bir hata oluştu :("
};

const checkUserIsAlreadyExistErrors = {
    ...signInWithEmailAndPasswordErrors,
    "auth/wrong-password":"Sen zaten üyesin, giriş yapabilirsin."
};

const updateProfileErrors = {
    "other":"Kullanıcı adı verilirken bir hata oluştu :("
};

const reloadUserDataErrors = {
    "other":"Kullanıcı bilgisi getirilirken bir hata oluştu :("
};

const passwordResetErrors = {
    "other":"Parola sıfırlama maili sırasında bir hata oluştu :("
};

const logOutErrors = {
    "other":"Çıkış sırasında bir hata oluştu :("
};

const firebaseErrors = {
    signInWithEmailAndPassword: signInWithEmailAndPasswordErrors,
    checkUserIsAlreadyExist: checkUserIsAlreadyExistErrors,
    createUserWithEmailAndPassword: createUserWithEmailAndPasswordErrors,
    sendEmailVerification:sendEmailVerificationErrors,
    updateProfile:updateProfileErrors,
    reloadUserData:reloadUserDataErrors,
    logOut:logOutErrors,
    passwordReset:passwordResetErrors,
    genericError:"Bu hatayı hiç beklemiyorduk. Kontrol edeceğiz. Daha sonra tekrar dener misiniz?"
};

function errorTextBuilder(error, methodName){
    if(firebaseErrors[methodName]){
        if(firebaseErrors[methodName][error])
            return firebaseErrors[methodName][error];
        else
            return firebaseErrors[methodName]['other'];
    }
    else
        return firebaseErrors.genericError;

}

const config = {
  apiKey: 'AIzaSyBQn5eEA_v6_g2t_jviSE5kuWVIScgUOwg',
  authDomain: 'kabin-64963.firebaseapp.com',
  databaseURL: 'https://kabin-64963.firebaseio.com',
  projectId: 'kabin-64963',
  storageBucket: 'kabin-64963.appspot.com',
  messagingSenderId: '625321362515',
};

const prodConfig = {
    apiKey: 'AIzaSyBQn5eEA_v6_g2t_jviSE5kuWVIScgUOwg',
    authDomain: 'kabin-64963.firebaseapp.com',
    databaseURL: 'https://kabin-64963.firebaseio.com',
    projectId: 'kabin-64963',
    storageBucket: 'kabin-64963.appspot.com',
    messagingSenderId: '625321362515',
  };

export default class Firebase {
    _lastSentMessage = "";
    activeUser=null;
    static _instance;
    _initializeCompletedAction = null;
    constructor(){
        if(Firebase._instance)
            throw new Error('firebase is already instantiated');
        app.initializeApp(config);
        this.refreshAllFbInstances();
    }
    static getInstance(){
        if(Firebase._instance == null)
            throw new Error("You must initialize Firebase with Firebase.initializeApp(initializedAction)");
        return Firebase._instance;
    }
    static initializeApp(initializedAction=null){
        if(Firebase._instance != null)
            throw new Error("You have already initialized Firebase. You can use Firebase.getInstance()");
        else
            Firebase._instance = new Firebase();        
    }

    async refreshAllFbInstances(){
        this.auth = app.auth();
        this.funcs = app.functions();
        this.db = app.database();
        //this.funcs.useFunctionsEmulator("http://localhost:8010")
        this.addOrJoinRoom = this.funcs.httpsCallable('addOrJoinRoom');
        this.saveNewUser = this.funcs.httpsCallable('saveNewUser');
        this.getNameOfUser = this.funcs.httpsCallable('getNameOfUser');
        this.sendNewMessage = this.funcs.httpsCallable('sendNewMessage');
        this.userSeesMessages = this.funcs.httpsCallable('userSeesMessages');
        this.getAdDetails = this.funcs.httpsCallable('getAdDetails');
        this.adClick = this.funcs.httpsCallable('adClick');
        this.setPushToken = this.funcs.httpsCallable('setPushToken');
        this.deleteMessage = this.funcs.httpsCallable('deleteMessage');
        this.reportUserOrMessage = this.funcs.httpsCallable('reportUserOrMessage');
        this.blockUser = this.funcs.httpsCallable('blockUser');
        this.unblockUser = this.funcs.httpsCallable('unblockUser');
        this.saveAbout = this.funcs.httpsCallable('saveAbout');
        Firebase._instance = this;
    }

    reloadUserData(success,fail){
        this.auth.currentUser.reload().then(()=>{
            success()
        }).catch((error)=>{
            fail(errorTextBuilder(error.code,"reloadUserData"));
        })
    }

    getName(uid,success,fail){
        if(uid.toString().length>0){
            this.getNameOfUser({uid}).then((result)=>{
                if(result.data.name)
                    success(result.data.name);
                else
                    fail("no users found");
            }).catch((error)=>{
                fail(error);
            });
        }
    }

    getAllMessagesOfTheRoom(roomName){
        if(roomName == '0'){
            roomName = "bot-"+this.auth.currentUser.uid;
        }
        return new Promise((resolve,reject)=>{
            this.db.ref('rooms/'+roomName+'/messages').once('value',(snapShot)=>{
                if(snapShot)
                    return resolve(snapShot.val());
                else
                    return reject(new Error("no message here"));
            },(error)=>{
                return reject(error);
            });
        });
    }

    addRoom(timeStamp,flightCode,success,fail){
        var displayName = this.auth.currentUser.displayName;
        this.addOrJoinRoom({timeStamp,flightCode,displayName}).then((result) => {
            success(result);
        }).catch((error)=>{
            fail(error.message);
        });
    }

    getActiveUserEmail(){
        return this.auth.currentUser.email;
    }

    async getUser(success,fail){
        await this.registerForPushNotificationsAsync();
        var displayName = this.auth.currentUser.displayName;
        this.saveNewUser({displayName,token:this._pushToken}).then((result)=>{
            if(result)
            {
                this._userPushToken = result.data.user.token;
                
                success(result.data.user);
            }
        }).catch((error)=>{
            if(error)
                if(error.error)
                    fail(error.error);
                else
                    fail(error.message);
        });
    }

    checkUserIsAlreadyExist(email,success,fail){
        return this.auth.signInWithEmailAndPassword(email,TEST_PASSWORD).then(
            (response)=>{
                let errorText = firebaseErrors.signInWithEmailAndPassword.restrictedPassword;
                Firebase.getInstance().logError(email+" - "+errorText);
                fail(errorText);
            },
            (response)=>{
                if(response.code === "auth/user-not-found")
                    success();
                else
                    fail(errorTextBuilder(response.code,"checkUserIsAlreadyExist"));
            }
        );

    }

    signInWithEmailAndPassword(email,password,success,fail){
        var value = this.auth.signInWithEmailAndPassword(email,password).then((userCredential)=>{
            if(userCredential.user)
                success(userCredential.user);
            else
                fail(errorTextBuilder("","signInWithEmailAndPassword"));
        }).catch((error)=>{
            fail(errorTextBuilder(error.code,"signInWithEmailAndPassword"));
        });
        return value;
    }

    sendEmailVerification(success,fail){
        this.auth.currentUser.sendEmailVerification().then(function(){
            success();
        }).catch(function(error){
            fail(errorTextBuilder(error.code,"sendEmailVerification"));
        })
    }

    createUserWithEmailAndPassword(displayName, email,password,success,fail){
        return this.auth.createUserWithEmailAndPassword(email,password).then(
            (response)=>{
                this.auth.currentUser.updateProfile({
                    displayName:displayName
                }).then(function(){
                    Firebase.getInstance().sendEmailVerification(success,fail);
                }).catch(function(error){
                    fail(errorTextBuilder(error.code,"updateProfile"));
                })
            },
            (response) => {
                fail(errorTextBuilder(response.code,"createUserWithEmailAndPassword"));
            }
        );
    }

    registerForAllRoomsOfCurrentUser(action){
        this.db.ref('users/'+this.auth.currentUser.uid+'/rooms').on('child_changed',(snapShot)=>{
            if(snapShot){
                var value = snapShot.val();
                action(snapShot.key,value);
                if(value.readYet === true)
                    return;
                var message = value.lastMessage;
                if(message === Firebase.getInstance()._lastSentMessage)
                    return;
                var title = "";
                if(snapShot.key == "0")
                    title = "Kabinbot"
                else
                    title = snapShot.key.split('+')[1];
                PushSheet.getInstance().showSheet(title+" - "+message);
            }
        });
    }

    startListenRoom(roomName, action){
        if(roomName == '0'){
            roomName = "bot-"+this.auth.currentUser.uid;
        }
        this.db.ref('rooms/'+roomName+'/messages').endAt().limitToLast(1).on('child_added',(snapShot)=>{
            if(snapShot){
                action(snapShot.key,snapShot.val());
            }
        });
    }

    stopListenRoom(roomName){
        this.db.ref('rooms/'+roomName+'/messages').off('child_added');
    }

    sendMessage(roomName,message){
        if(roomName == '0'){
            roomName = "bot-"+this.auth.currentUser.uid;
        }
        return new Promise((resolve,reject)=>{
            Firebase.getInstance()._lastSentMessage = message;
            this.sendNewMessage({roomName,message}).then(()=>{
                return resolve();
            }).catch((error)=>{
                Firebase.getInstance()._lastSentMessage="";
                return reject(error);
            })
        });
    }

    deleteMessageFromList(roomName, messageId){
        return new Promise((resolve,reject)=>{
            if(roomName == '0')
                roomName = "bot-"+this.auth.currentUser.uid;
            this.deleteMessage({
                uid:this.auth.currentUser.uid,
                messageId: messageId,
                roomName: roomName
            }).then((data)=>{
                return resolve();
            }).catch((error)=>{
                return reject(error);
            })
        });
    }

    reportUser(roomName,messageId){
        return new Promise((resolve,reject)=>{
            return this.reportUserOrMessage({
                roomName:roomName,
                messageId:messageId
            }).then((response)=>{
                if(response.data.statusCode == 200)
                    return resolve();
                else
                    return reject(response.data.error)
            }).catch((error)=>{
                return reject(error);
            })
        })
    }

    blockSelectedUser(targetId){
        return new Promise((resolve,reject)=>{
            this.blockUser({targetId}).then(()=>{
                return resolve();
            }).catch((error)=>{
                return reject(error);
            });
        });
    }

    unblockSelectedUser(targetId){
        return new Promise((resolve,reject)=>{
            this.unblockUser({targetId}).then(()=>{
                return resolve();
            }).catch((error)=>{
                return reject(error);
            });
        });
    }

    saveAboutText(text){
        return new Promise((resolve,reject)=>{
            this.saveAbout({about:text}).then((data)=>{
                Firebase.getInstance().activeUser.about = text;
                return resolve(data);
            }).catch((error)=>{
                return reject(error);
            })
        });
    }

    currentUserSeesAllMessage(roomName){
        return new Promise((resolve,reject)=>{
            this.userSeesMessages({roomName}).then(()=>{
                return resolve();
            }).catch((error)=>{
                return reject(error);
            })
        });
    }

    getActiveAdDetails(adId){
        return new Promise((resolve,reject)=>{
            this.getAdDetails({adId}).then((response)=>{
                return resolve(response.data.ad);
            }).catch((error)=>{
                return reject(error);
            });
        })
    }

    setAdClick(adId){
        return new Promise((resolve,reject)=>{
            this.adClick({adId}).then(()=>{
                return resolve();
            }).catch((error)=>{
                return reject(error);
            });
        });
    }

    logOut(success,fail){
        this.db.ref('users/'+this.auth.currentUser.uid+'/rooms').off('child_changed');
        this.auth.signOut().then(()=>{
            success();
        }).catch((error)=>{
            fail(errorTextBuilder(error.code,"logOut"));
        });
    }

    passwordReset(email,success,fail){
        this.auth.sendPasswordResetEmail(email).then(()=>{
            success();
        }).catch((error)=>{
            fail(errorTextBuilder(error.code,"passwordReset"));
        });
    }

    changePassword(password){
        var value = this.auth.currentUser.updatePassword(password);
        return value;
    }

    logError(log)
    {
        throw new Error(new Date().toString()+" - error:"+log);
        //TODO: post all errors
    }

    _pushToken = "";
    _userPushToken="";

    async registerForPushNotificationsAsync() {
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            return;
        }

        await Notifications.getExpoPushTokenAsync().then((data)=>{
            Firebase.getInstance()._pushToken = data;
        }).catch((error)=>{
        });
    }

    sendPushToken(){
        if(this._pushToken!=="" && this._pushToken !== this._userPushToken){
            return new Promise((resolve,reject)=>{
                this.setPushToken({token:this._pushToken}).then(()=>{
                    return resolve();
                }).catch((error)=>{
                    return reject(error);
                });
            });
        }
    }
}
