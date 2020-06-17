import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/functions';
import 'firebase/storage';
import 'firebase/firestore';

export default class FirebaseCore{
    _prodConfig = {
        apiKey: 'AIzaSyBQn5eEA_v6_g2t_jviSE5kuWVIScgUOwg',
        authDomain: 'kabin-64963.firebaseapp.com',
        databaseURL: 'https://kabin-64963.firebaseio.com',
        projectId: 'kabin-64963',
        storageBucket: 'kabin-64963.appspot.com',
        messagingSenderId: '625321362515',
    };
    auth:firebase.auth.Auth;
    rtdb:firebase.database.Database;
    fsdb:firebase.firestore.Firestore;
    storage:firebase.storage.Storage;
    functions:firebase.functions.Functions;
    static _instance:FirebaseCore;
    constructor() {
        if(!FirebaseCore._instance)
            FirebaseCore._instance = this;
        else
            throw new Error("FirebaseCore is already initialized!");
        app.initializeApp(this._prodConfig);
        this.auth = app.auth();
        this.rtdb = app.database();
        this.fsdb = app.firestore();
        this.storage = app.storage();
        this.functions = app.functions();
    }
    static get instance():FirebaseCore{
        if(!FirebaseCore._instance)
            FirebaseCore._instance = new FirebaseCore();
        return FirebaseCore._instance;
    }
}