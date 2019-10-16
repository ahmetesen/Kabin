import React, { EventHandler } from 'react';
import {StyleSheet, GestureResponderEvent} from 'react-native';
import {Button} from 'react-native-elements';

interface Props{
    darkTheme?:boolean;
    onPress:EventHandler<GestureResponderEvent>;
    title:string;
}

interface State{

}

export default class PrimaryButton extends React.Component<Props,State>{

    constructor(props:Props){
        super(props);
        this._onPress = this._onPress.bind(this);
    }

    componentWillMount(){
    }

    _onPress(event:GestureResponderEvent){
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
        backgroundColor:'#283ad8',
    },
    buttonDarkTheme:{
        backgroundColor: '#283ad8',
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
        color:'#283ad8'
    }
});