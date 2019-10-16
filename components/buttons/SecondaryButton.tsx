import React, { EventHandler } from 'react';
import {StyleSheet, GestureResponderEvent} from 'react-native';
import {Button} from 'react-native-elements';

interface Props{
    onPress:EventHandler<GestureResponderEvent>;
    title:string;
    darkTheme?:boolean;
}
interface State{

}
export default class SecondaryButton extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);
        this._onPress = this._onPress.bind(this);
    }

    _onPress(event:GestureResponderEvent){
        if(this.props.onPress)
            this.props.onPress(event);
    }

    render(){
        return(
            <Button onPress={this._onPress} title={this.props.title} titleStyle={this.props.darkTheme?styles.titleDarkTheme:styles.title} buttonStyle={styles.button}>
                {this.props.children}
            </Button>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: 'transparent',
        margin:4,
        padding:4,
        elevation:0
    },
    title:{
        fontFamily:'nunito-bold',
        color:'white'
    },
    titleDarkTheme:{
        fontFamily:'nunito-bold',
        color:'#283ad8'
    }
});