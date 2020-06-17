import {AppLoading} from 'expo';
import ErrorManager from './core/error-manager';
import * as Font from 'expo-font';
import * as Icon from '@expo/vector-icons';
import { DefaultNavigationProp } from './constants/nav-params';
import { View, Text } from 'react-native';
import React, { Component } from 'react';
type Props = {
    navigation: DefaultNavigationProp;
}
type State = {
    loadComplete:Boolean;
}
export default class AppLoad extends Component<Props,State> {
    
    state = {
        loadComplete:false
    }

    componentDidUpdate(){
        if(this.state.loadComplete)
            this.props.navigation.navigate("PreLanding");
    }

    assetsLoaded(){
        this.setState({loadComplete:true})
    }
    render(){
        if(this.state.loadComplete){
            return(
                <View>
                    <Text>Deneme</Text>
                </View>
            )
        }
        else
            return(
                <AppLoading
                    startAsync={this._loadResourcesAsync}
                    onError={this._handleLoadingError}
                    onFinish={this._handleFinishLoading}
                />
            );
    }
  
    _handleLoadingError(error:Error){
        ErrorManager.instance.logErrors("_handleLoadingError",error.message);
    };
  
    _handleFinishLoading = () => {
        this.assetsLoaded();
    };
  
    async _loadResourcesAsync():Promise<any>{
        return Promise.all([
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
    }
}