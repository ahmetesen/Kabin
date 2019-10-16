import React, { EventHandler } from 'react';
import {StyleSheet, GestureResponderEvent} from 'react-native';
import {Button} from 'react-native-elements';

interface Props{
    onPress:EventHandler<any>;
    title:string;
    dark?:Boolean;
}

interface State{
    
}

export default class LinkButton extends React.Component<Props,State>{
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
            <Button onPress={this._onPress} title={this.props.title} titleStyle={(this.props.dark)?styles.titleDark:styles.title} buttonStyle={styles.button}>
                {this.props.children}
            </Button>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: 'transparent',
        margin:0,
        padding:0,
        borderWidth:0
    },
    title:{
        fontFamily:'nunito-light',
        color:'white',
        fontSize:14,
        textDecorationLine: 'underline'
    },
    titleDark:{
        fontFamily:'nunito-light',
        color:'black',
        fontSize:14,
        textDecorationLine: 'underline'
    }
})