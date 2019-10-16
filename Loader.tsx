import React from 'react';
import {AppLoading, Notifications} from 'expo';
import {Platform, AppStateStatus} from 'react-native';
import ErrorManager from './core/ErrorManager';
import {AppState} from 'react-native';
import { Asset } from 'expo-asset';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { User } from 'firebase';
import Auth from './core/Firebase/Auth';
import UsersManager from './core/UsersManager';
import { AppUser } from './models/AppUser';
import DeviceManager from './core/DeviceManager';
interface Props{
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
interface State{

}
export default class Loader extends React.Component<Props,State> {
    collectedLoaders=0;
    startPage = "Landing";
    constructor(props:Props){
        super(props);
        this._handleFinishLoading = this._handleFinishLoading.bind(this);
        this._authStateChange = this._authStateChange.bind(this);
    }

    componentDidMount(){
        if(Platform.OS==="android")
            Notifications.dismissAllNotificationsAsync();
        Notifications.setBadgeNumberAsync(0);
        AppState.addEventListener("change",this._handleStateChange);
    }

    _handleStateChange(nextAppState:AppStateStatus){
        if(nextAppState === 'active') {
            Notifications.setBadgeNumberAsync(0);
            if(Platform.OS === "android"){
                Notifications.dismissAllNotificationsAsync();
            }
        }
    }

    _checkStateChangedAndUnsubscribe:any;

    componentWillMount(){
        //Auth.instance.addAuthStateChangeEvent(this._authStateChange);
        this._authStateChange(null);
    }

    async _authStateChange(user:User|null){
        //Auth.instance.removeAuthStateChangeEvent(this._authStateChange);
        let uid:string|null = null;
        if(user && user.emailVerified){
            uid = user.uid;

            this.startPage = "Main";
            let me = new AppUser();
            me.uid = user.uid;
            //TODO:Save User to UsersManager -> me
        }
        await DeviceManager.instance.saveDeviceWithTokenToServer();
        this.assetsLoaded();
    }

    assetsLoaded(){
        if(this.collectedLoaders>0)
        {
            this.collectedLoaders=0;
            this.props.navigation.navigate(this.startPage);
        }
        this.collectedLoaders++;
    }
    render(){
        return(
            <AppLoading
                startAsync={this._loadResourcesAsync}
                onError={this._handleLoadingError}
                onFinish={this._handleFinishLoading}
            />
        );
    }
  
    _handleLoadingError = (error:Error) => {
        ErrorManager.instance.logErrors("_handleLoadingError",error.message);
    };
  
    _handleFinishLoading = () => {
        this.assetsLoaded();
    };
  
    _loadResourcesAsync = ():any => {
        return Promise.all([
                Asset.loadAsync([
            ]),
            Font.loadAsync({
                ...Icon.Ionicons.font,
                ...Icon.Feather.font,
                ...Icon.FontAwesome.font,
                'nunito': require('./assets/fonts/Nunito-Regular.ttf'),
                'nunito-light': require('./assets/fonts/Nunito-Light.ttf'),
                'nunito-lightitalic': require('./assets/fonts/Nunito-LightItalic.ttf'),
                'nunito-semibold': require('./assets/fonts/Nunito-SemiBold.ttf'),
                'nunito-bold':require('./assets/fonts/Nunito-Bold.ttf'),
                'nunito-black': require('./assets/fonts/Nunito-Black.ttf')
            }),
        ]);
    };
}