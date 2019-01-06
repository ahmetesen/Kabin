import React from 'react';
import {AppLoading, Asset, Font, Icon} from 'expo';
import {createAppContainer, createStackNavigator, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import {ActivationScreen,CreateEmailScreen,NameScreen, CreatePasswordScreen} from './screens/auth/create';
import { EmailScreen, PasswordScreen } from './screens/auth/login';
import {HomeScreen, ProfileScreen, SettingsScreen } from './screens/ready';
import ErrorManager from './core/ErrorManager';
import LandingScreen from './screens/LandingScreen';

const pagesThatInDevelopment = "Activation"
class App extends React.Component {

    constructor(props){
        super(props);
        this._handleFinishLoading = this._handleFinishLoading.bind(this);
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
        console.log("app loading finished");
        this.props.navigation.navigate(pagesThatInDevelopment);
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

const CreateUserStack = createStackNavigator(
    {
        Name: NameScreen, 
        CreateEmail:CreateEmailScreen, 
        CreatePassword:CreatePasswordScreen, 
        Activation: ActivationScreen
    },
    {
        headerMode:'none'
    }
);
const LoginStack = createStackNavigator({Email: EmailScreen, Password: PasswordScreen});
const MainTab = createBottomTabNavigator({
    Home: HomeScreen,
    Profile: ProfileScreen,
    Settings: SettingsScreen
},
{
    initialRouteName: 'Home',
    defaultNavigationOptions:{
        headerStyle: {
            backgroundColor: '#f4511e',
        },
            headerTintColor: '#fff',
            headerTitleStyle: {
            fontFamily: "nunito-black",
            fontSize:40
        },
    }
});
const AppNavigator = createSwitchNavigator({
        App:App,
        Name:NameScreen,
        Landing: LandingScreen,
        Login:LoginStack,
        CreateUser: CreateUserStack,
        Main: MainTab
    },
    {
        initialRouteName: 'App',
    }
);

export default createAppContainer(AppNavigator);