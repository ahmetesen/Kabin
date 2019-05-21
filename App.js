import React from 'react';
import {AppLoading, Asset, Font, Icon, Notifications} from 'expo';
import {View, NetInfo, StatusBar} from 'react-native';
import {createAppContainer, createStackNavigator, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import {ActivationScreen,CreateEmailScreen,NameScreen, CreatePasswordScreen} from './screens/auth/create';
import { EmailScreen, PasswordScreen } from './screens/auth/login';
import {HomeScreen, ProfileScreen, SettingsScreen, EditAboutScreen, AddFlightScreen, BlockedUsersScreen, AllFlightsScreen, RoomSettingsScreen } from './screens/ready';
import ErrorManager from './core/ErrorManager';
import LandingScreen from './screens/LandingScreen';
import Firebase from './core/Firebase';
import {FontAwesome, Ionicons, Feather} from '@expo/vector-icons';
import {tabHeaderStyle} from './components/styles/global'
import SpinnerContainer from './components/views/SpinnerContainer';
import RoomScreen from './screens/ready/RoomScreen';
import AdScreen from './screens/ready/AdScreen';
import PushSheet from './components/views/PushSheet';
import ErrorSheet from './components/views/ErrorSheet';
import WebModalContainer from './components/views/WebModalContainer';
import PlaygroundContainer from './components/views/PlaygroundContainer';
import { Platform } from 'expo-core';
import {AppState} from 'react-native';

var playgroundMode = false;
class App extends React.Component {
    collectedLoaders=0;
    startPage = "Landing";
    constructor(props){
        super(props);
        this._handleFinishLoading = this._handleFinishLoading.bind(this);
    }

    componentDidMount(){
        Notifications.dismissAllNotificationsAsync();
        Notifications.setBadgeNumberAsync(0);
        AppState.addEventListener("change",this._handleStateChange);
    }

    _handleStateChange(nextAppState){
        if(nextAppState === 'active') {
            Notifications.setBadgeNumberAsync(0);
            if(Platform.OS === "android"){
                Notifications.dismissAllNotificationsAsync();
            }
        }
    }

    componentWillMount(){
        Firebase.initializeApp();
        checkStateChangedAndUnsubscribe = Firebase.getInstance().auth.onAuthStateChanged((user)=>{
            if(user && user.emailVerified)
                this.startPage = "Main";
            checkStateChangedAndUnsubscribe();
            this.loaderCollected();
        });
    }

    loaderCollected(){
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
  
    _handleLoadingError = error => {
        ErrorManager.getInstance().logErrors(error);
    };
  
    _handleFinishLoading = () => {
        this.loaderCollected();
    };
  
    _loadResourcesAsync = async () => {
        return Promise.all([
                Asset.loadAsync([
            ]),
            Font.loadAsync({
                ...Icon.Ionicons.font,
                'nunito': require('./assets/fonts/Nunito-Regular.ttf'),
                'nunito-light': require('./assets/fonts/Nunito-Light.ttf'),
                'nunito-lightitalic': require('./assets/fonts/Nunito-LightItalic.ttf'),
                'nunito-semibold': require('./assets/fonts/Nunito-SemiBold.ttf'),
                'nunito-black': require('./assets/fonts/Nunito-Black.ttf')
            }),
        ]);
    };
}

const AuthStack = createStackNavigator(
    {
        Landing: LandingScreen,
        Name: NameScreen, 
        CreateEmail:CreateEmailScreen, 
        CreatePassword:CreatePasswordScreen, 
        Activation: ActivationScreen,
        Email: EmailScreen,
        Password: PasswordScreen
    },
    {
        headerMode:'none'
    }
);

const ProfileStack = createStackNavigator(
    {
        profilePage:ProfileScreen
    },
    {        
        defaultNavigationOptions:{
            headerTitle:'Profil',
            headerTitleStyle:{
                ...tabHeaderStyle,
            }
            
        },
        navigationOptions:{
            tabBarIcon: ({ tintColor }) => (
                <FontAwesome name="user-o" size={32} color={tintColor} />
            )
        }
    }
);

const HomeStack = createStackNavigator(
    {
        homePage:HomeScreen
    },
    {        
        defaultNavigationOptions:{
            headerTitle:'Kabin',
            headerTitleStyle:{
                ...tabHeaderStyle,
                fontSize:36,
                fontFamily:'nunito-black'
            }

        },
        navigationOptions:{
            tabBarIcon: ({ tintColor }) => (
                <Ionicons name="ios-chatbubbles" size={32} color={tintColor} />
            ),
        }
    }
);

const SettingsStack = createStackNavigator(
    {
        settingsPage:SettingsScreen
    },
    {
        defaultNavigationOptions:{
            headerTitle:'Ayarlar',
            headerTitleStyle:tabHeaderStyle
        },
        navigationOptions:{
            tabBarIcon: ({ tintColor }) => (
                <Feather name="settings" size={32} color={tintColor} />
            ),
        }
    }
);

const LoggedTab = createBottomTabNavigator(
    {
        /*Profile: {
            screen:ProfileStack,
        },*/
        Home: {
            screen:HomeStack,
        },
        Settings: {
            screen:SettingsStack
        }
    },
    {
        initialRouteName: 'Home',
        tabBarOptions:{
            showLabel:false,
            activeTintColor:"#283AD8",
        }
    },
);

const LoggedNavigator = createStackNavigator({
    Logged:{
        screen:LoggedTab,
        navigationOptions:{
            header:null
        }
    },
    AddFlight:{
        screen:AddFlightScreen
    },
    Room:{
        screen:RoomScreen
    },
    RoomSettings:{
        screen:RoomSettingsScreen
    },
    Ad:{
        screen:AdScreen
    },
    EditAbout:{
        screen:EditAboutScreen
    },
    BlockedUsers:{
        screen:BlockedUsersScreen
    },
    AllFlights:{
        screen:AllFlightsScreen
    }
},{
    initialRouteName: 'Logged',
    defaultNavigationOptions:{
        headerBackTitle:null,
        headerTintColor:'#283AD8',
    }
});


const AppNavigator = createSwitchNavigator({
        App:App,
        Auth: AuthStack,
        Main: LoggedNavigator
    },
    {
        initialRouteName: 'App',
    }
);

const AppContainer = createAppContainer(AppNavigator);

export default class TopView extends React.Component{
    constructor(props){
        super(props);
        this.handleFirstConnectivityChange = this.handleFirstConnectivityChange.bind(this);
    }
    componentDidMount(){
        if(!playgroundMode){
            this.showConnectionError();
            NetInfo.addEventListener('connectionChange', this.handleFirstConnectivityChange);
        }
    }

    showConnectionError(){
        if(!NetInfo.isConnected)
        {
            ErrorSheet.getInstance().showSheet("İnternet bağlantınla ilgili bir problem varmış gibi görünüyor. Eğer uygulamayla ilgili sorun yaşıyorsan bize web sitemizdeki iletişim formundan ulaş.");
        }
        else{
            ErrorSheet.getInstance().hideSheet();
        }
    }

    componentWillUnmount(){
        NetInfo.removeEventListener('connectionChange', this.handleFirstConnectivityChange);
    }

    handleFirstConnectivityChange(connectionInfo) {
        this.showConnectionError();
    }

    render(){
        if(playgroundMode){
            return(
                <PlaygroundContainer style={{flex:1}}>

                </PlaygroundContainer>
            )
        }
        else
            return(
                <View style={{flex:1}}>
                    <StatusBar barStyle="dark-content"/> 
                    <AppContainer/>
                    <SpinnerContainer/>
                    <ErrorSheet/>
                    <PushSheet/>
                    <WebModalContainer/>
                </View>
            )
    }
}


//export default appContainer;