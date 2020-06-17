import React, { Component } from 'react';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';
import {Input, InputProps} from 'react-native-elements';
interface Props extends InputProps{
    style?:StyleProp<TextStyle>;
    dark?:boolean;

}
export default class TextBox extends Component<Props>{
    textInput:Input|null = null;
    constructor(props:Props){
        super(props);
    }

    focus(){
        if(this.textInput)
            this.textInput.focus();
    }
    
    render(){
        return(
            <Input
                ref={(input) => { this.textInput = input; }}
                style={[styles.componentStyle,this.props.style]}
                selectionColor={this.props.dark?'#333333':'#f9f9f9'}
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                errorStyle={this.props.dark?styles.errorDarkStyle:styles.errorStyle}
                inputStyle={this.props.dark?styles.inputDarkStyle:styles.inputStyle}
                placeholderTextColor={this.props.dark?styles.placeHolderDarkStyle.color:styles.placeHolderStyle.color}
                {...this.props}
            />
        );
    }
}

const styles = StyleSheet.create({
    componentStyle:{
    },
    containerStyle:{
        margin:0,
        padding:0,
        width:'100%'

    },    
    inputContainerStyle:{
        borderBottomColor:'white',
        margin:0,
        padding:0
    },
    inputStyle:{
        color:'#FFFFFF',
        padding:0,
        margin:0,
        fontFamily: 'nunito-light',
        fontSize: 16
    },
    inputDarkStyle:{
        color:'#333333',
        fontFamily: 'nunito-light',
        fontSize: 16,
        padding:0,
        margin:0,
        borderWidth:0,
    },

    placeHolderStyle:{
        color:'#DDDDDD',
    },
    placeHolderDarkStyle:{
        color:'#666666',
    },
    errorStyle:{
        color:'#FF96AE',
        fontSize:14
    },
    errorDarkStyle:{
        color:'#FF3545',
        fontSize:14
    }
});