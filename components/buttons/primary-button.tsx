import React, { Component } from 'react';
import {StyleSheet, GestureResponderEvent} from 'react-native';
import {Button} from 'react-native-elements';
import { primaryColor } from '../styles/global';

type Props={
    darkTheme?:boolean;
    onPress:import('react').EventHandler<GestureResponderEvent>;
    title:string;
    disabled?:boolean;
}

export default class PrimaryButton extends Component<Props>{

    _onPress = (event:GestureResponderEvent)=>{
        if(this.props.onPress)
            this.props.onPress(event);
    }

    render(){
        return(
            <Button 
                type='clear' 
                containerStyle={this.props.darkTheme?styles.containerDarkTheme:styles.containerLightTheme}
                buttonStyle={this.props.darkTheme?styles.buttonDarkTheme:styles.buttonLightTheme}
                titleStyle={this.props.darkTheme?styles.titleDarkTheme:styles.titleLightTheme} 
                onPress={this._onPress} title={this.props.title}
            />
        )
    }
}

const styles = StyleSheet.create({
    containerDarkTheme:{
        backgroundColor:primaryColor,
    },
    buttonDarkTheme:{
        backgroundColor: primaryColor,
        borderRadius:4,
        margin:4,
        padding:4
    },
    titleDarkTheme:{
        fontFamily:'nunito-bold',
        color:'white'
    },
    containerLightTheme:{
        backgroundColor:'#FFFFFF',
    },
    buttonLightTheme:{
        backgroundColor: '#FFFFFF',
        borderRadius:4,
        margin:4,
        padding:4
    },
    titleLightTheme:{
        fontFamily:'nunito-bold',
        color:primaryColor
    }
});