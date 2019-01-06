import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import {TEST_PASSWORD} from '../../constants/global-strings';

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

export default class Firebase {
    activeUser=null;
    static _instance;
    constructor(){
        if(Firebase._instance)
            throw new Error('firebase is already instantiated');
        app.initializeApp(config);
        this.auth = app.auth();
        this.db = app.database();
        Firebase._instance = this;
        this.auth.onAuthStateChanged((user)=>{
            if(user)
                activeUser = user;
            else
                activeUser = null;
        });
    }

    static getInstance(){
        if(Firebase._instance == null)
            Firebase._instance = new Firebase();
        return Firebase._instance;
    }

    reloadUserData(success,fail){
        activeUser.reload().then(()=>{
            activeUser = app.auth().currentUser;
            success(activeUser)
        }).catch((error)=>{
            fail(errorTextBuilder(error.code,"reloadUserData"));
        })
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

    logOut(success,fail){
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

    user(uid){
        this.db.ref('users/${uid}');
    }

    users(){
        this.db.ref('users');
    }

    logError(log)
    {
        throw new Error(new Date().toString()+" - error:"+log);
        //TODO: post all errors
    }
}
