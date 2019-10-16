import * as React from 'react';
import {View, NetInfo, StatusBar} from 'react-native';
import {createAppContainer, createStackNavigator, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import {FontAwesome, Ionicons, Feather} from '@expo/vector-icons';
import { Text, Button } from 'react-native-elements';
import WebModalContainer from './components/views/WebModalContainer';
import ErrorSheet from './components/views/ErrorSheet';
import SpinnerContainer from './components/views/SpinnerContainer';
import PushSheet from './components/views/PushSheet';

import {ActivationScreen,CreateEmailScreen,NameScreen, CreatePasswordScreen} from './screens/auth/create';
import { EmailScreen, PasswordScreen } from './screens/auth/login';
import {HomeScreen, ProfileScreen, SettingsScreen, EditAboutScreen, ChangeNameScreen, AddFlightScreen, BlockedUsersScreen, AllFlightsScreen, RoomSettingsScreen, VisitorScreen } from './screens/ready';
import LandingScreen from './screens/LandingScreen';
import RoomScreen from './screens/ready/RoomScreen';
import AdScreen from './screens/ready/AdScreen';
import PlaygroundContainer from './components/views/PlaygroundContainer';
import Loader from './Loader';
import {tabHeaderStyle} from './components/styles/global';
import {texts} from './constants/language';


var playgroundMode = false;

// #region stacks region
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
            headerTitle:'Ben',
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
    RoomSettings:{
        screen:RoomSettingsScreen
    },
    Visitor:{
        screen:VisitorScreen
    },
    Ad:{
        screen:AdScreen
    },
    EditAbout:{
        screen:EditAboutScreen
    },
    ChangeName:{
        screen:ChangeNameScreen
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
        Loader:Loader,
        Auth: AuthStack,
        Main: LoggedNavigator
    },
    {
        initialRouteName: 'Loader',
    }
);

// #endregion

const AppContainer = createAppContainer(AppNavigator);

interface Props {
}

interface State {
}

export default class TopView extends React.Component<Props, State>{
    constructor(props:Props){
        super(props);
        this.handleFirstConnectivityChange = this.handleFirstConnectivityChange.bind(this);
        this.testPressed = this.testPressed.bind(this);
        this.secondPressed = this.secondPressed.bind(this);
    }
    componentDidMount(){
        if(!playgroundMode){
            this.checkConnection();
            NetInfo.addEventListener('connectionChange',this.handleFirstConnectivityChange);
        }
    }

    checkConnection(){
        if(!NetInfo.isConnected)
        {
            var title = texts.errors.connectionError.title;
            var message = texts.errors.connectionError.message;
            ErrorSheet.instance.showSheet(title,message);
        }
        else{
            ErrorSheet.instance.hideSheet(null);
        }
    }

    componentWillUnmount(){
        NetInfo.removeEventListener('connectionChange',this.handleFirstConnectivityChange);
    }

    handleFirstConnectivityChange(connectionInfo:any) {
        this.checkConnection();
    }

    testPressed(e:any):void{
        SpinnerContainer.instance.showSpinner(()=>{});
    }

    secondPressed(e:any){
        SpinnerContainer.instance.hideSpinner(null);
    }

    render(){
        if(playgroundMode){
            return(
                <PlaygroundContainer style={{flex:1}}>
                    <View style={{flex:1, backgroundColor:'#0000FF', justifyContent:'center',alignItems:'center',position:'absolute', top:0,right:0,left:0,bottom:0}}>
                        <Text>TestScreen</Text>
                        <Button onPress={this.testPressed} title="Primary"></Button>
                        <Button onPress={this.secondPressed} title="Secondary"></Button>
                    </View>
                </PlaygroundContainer>
            );
        }
        else{
            return(
                <View style={{flex:1}}>
                    <AppContainer/>
                    <WebModalContainer/>
                    <SpinnerContainer/>
                    <ErrorSheet/>
                    <PushSheet/>
                    <StatusBar barStyle="dark-content"/> 
                </View>
            );
        }
    }
}