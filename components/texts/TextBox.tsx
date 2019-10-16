import React from 'react';
import { StyleSheet, StyleProp, TextStyle } from 'react-native';
import {Input, InputProps} from 'react-native-elements';
interface Props extends InputProps{
    style?:StyleProp<TextStyle>;
    dark?:boolean;

}
export default class TextBox extends React.Component<Props>{
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
                placeholder=''
                shake={true}
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
        width:'100%',
    },    
    inputContainerStyle:{
        borderBottomColor:'white',
        margin:0,
        padding:0
    },
    inputStyle:{
        color:'#FFFFFF',
        fontFamily: 'nunito-light',
        fontSize: 18
    },
    inputDarkStyle:{
        color:'#333333',
        fontFamily: 'nunito-light',
        fontSize: 18
    },

    placeHolderStyle:{
        color:'#DDDDDD',
    },
    placeHolderDarkStyle:{
        color:'#666666',
    },
    errorStyle:{
        color:'#FFA7AE',
        fontSize:16
    },
    errorDarkStyle:{
        color:'#FF3545',
        fontSize:16
    }
});