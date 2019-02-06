import React from 'react';
import {AppLoading, Asset, Font, Icon} from 'expo';
import {View} from 'react-native';
import {Button, createAppContainer, createStackNavigator, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import {ActivationScreen,CreateEmailScreen,NameScreen, CreatePasswordScreen} from './screens/auth/create';
import { EmailScreen, PasswordScreen } from './screens/auth/login';
import {HomeScreen, ProfileScreen, SettingsScreen, AddFlightScreen } from './screens/ready';
import ErrorManager from './core/ErrorManager';
import LandingScreen from './screens/LandingScreen';
import Firebase from './core/Firebase';
import {FontAwesome} from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import {tabHeaderStyle} from './components/styles/global'
import SpinnerContainer from './components/views/SpinnerContainer';
import RoomScreen from './screens/ready/RoomScreen';
import AdScreen from './screens/ready/AdScreen';

class App extends React.Component {
    collectedLoaders=0;
    startPage = "Landing";
    constructor(props){
        super(props);
        this._handleFinishLoading = this._handleFinishLoading.bind(this);
    }
    componentWillMount(){
        Firebase.initializeApp();
        checkStateChangedAndUnsubscribe = Firebase.getInstance().auth.onAuthStateChanged((user)=>{
            //TODO: Kullanıcı verification mail'ini onayladı mı check et.
            if(user)
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
        Profile: {
            screen:ProfileStack,
        },
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
    Ad:{
        screen:AdScreen
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
    render(){
        return(
            <View style={{flex:1}}>
                <AppContainer/>
                <SpinnerContainer/>
            </View>
        )
    }
}


//export default appContainer;