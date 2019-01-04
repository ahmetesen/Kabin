import React from 'react';
import { StyleSheet } from 'react-native';
import {Input} from 'react-native-elements';
export default class TextBox extends React.Component{

    constructor(props){
        super(props);
        //this.state = initialState;
    }
    
    render(){
        return(
            <Input
                style={styles.componentStyle}
                containerStyle={styles.containerStyle}
                inputContainerStyle={styles.inputContainerStyle}
                placeholder=''
                shake={true}
                errorStyle={styles.errorStyle}
                inputStyle={styles.inputStyle}
                placeholderTextColor={styles.placeHolderStyle.color}
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
        padding:0
    },    
    inputContainerStyle:{
        margin:0,
        padding:0
    },
    inputStyle:{
        color:'#FFFFFF',
        fontFamily: 'nunito-light',
        fontSize: 18
    },
    placeHolderStyle:{
        color:'#F9F9F9',
    },
    errorStyle:{
        color:'#FF3545'
    }
});

const initialState = {
    placeholderValue:'',
    inputValue:'',
    errorValue:'',   
}