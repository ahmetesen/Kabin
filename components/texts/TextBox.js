import React from 'react';
import { StyleSheet } from 'react-native';
import {Input} from 'react-native-elements';
export default class TextBox extends React.Component{

    constructor(props){
        super(props);
    }

    focus(){
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
                errorStyle={styles.errorStyle}
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
        borderBottomColor:'transparent',
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
    }
});

const initialState = {
    placeholderValue:'',
    inputValue:'',
    errorValue:'',   
}