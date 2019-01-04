import React from 'react';
import {AppLoading, Asset, Font, Icon} from 'expo';
import {createAppContainer, createStackNavigator, createSwitchNavigator} from 'react-navigation';
import {ActivationScreen,CreateEmailScreen,NameScreen, CreatePasswordScreen} from './screens/auth/create';
import { EmailScreen, PasswordScreen } from './screens/auth/login';
import ErrorManager from './core/ErrorManager';
import LandingScreen from './screens/LandingScreen';

class App extends React.Component {

    constructor(props){
        console.log("entering app constructor");
        super(props);
        this._handleFinishLoading = this._handleFinishLoading.bind(this);
    }

    render(){
        console.log("entering app render");
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
        this.props.navigation.navigate('Landing');
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

const CreateUserStack = createStackNavigator({Name: NameScreen, Email:CreateEmailScreen, CreatePassword: CreatePasswordScreen, Activation: ActivationScreen});
const LoginStack = createStackNavigator({Email: EmailScreen, Password: PasswordScreen});
const AppNavigator = createSwitchNavigator({
        App:App,
        Landing: LandingScreen,
        Login:LoginStack,
        CreateUser: CreateUserStack
    },
    {
        initialRouteName: 'App',
    }
);

export default createAppContainer(AppNavigator);