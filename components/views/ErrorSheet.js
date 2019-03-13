import React from 'react';
import {Animated, View, StyleSheet, Vibration } from 'react-native';
import TextBlock from '../texts/TextBlock';


export default class ErrorSheet extends React.Component{
    static INSTANTIATED = false;
    static _errorSheetInstance;
    static getInstance(){
        if(_errorSheetInstance)
            return _errorSheetInstance;
    }

    state = {
        fadeAnim: new Animated.Value(0),
        visible:false,
        message:"Error Notification"
    }
    constructor(props){
        if(!ErrorSheet.INSTANTIATED){
            super(props);
            ErrorSheet.INSTANTIATED=true;
            _errorSheetInstance = this;
        }
        else
            throw new Error("You cannot create second instance of Push Sheet!");
    }

    _fadeIn= Animated.timing(
        this.state.fadeAnim,{
            toValue:1,
            duration:100
        }
    )
    _fadeOut= Animated.timing(
        this.state.fadeAnim,{
            toValue:0,
            duration:100,
        }
    )

    showSheet(message){
        this.setState({visible:true,message:message});
        this._fadeIn.start();
        Vibration.vibrate(100);
    }

    hideSheet(action){
        this._fadeOut.start(()=>{
            this.setState({visible:false});
            if(action)
                action();
        });
    }

    render(){
        let { visible,fadeAnim } = this.state;
        if(!visible)
            return null;
        else
            return(
                <Animated.View style={{...styles.container,opacity:fadeAnim}}>
                    <TextBlock text>
                        {this.state.message}
                    </TextBlock>
                </Animated.View>
            );
    }
}

const styles = StyleSheet.create({
    container:{
        position:'absolute',
        backgroundColor:'#FF3545',
        top:0,
        right:0,
        left:0,
        justifyContent:'flex-start',
        alignItems:'stretch',
        opacity:0,
        paddingLeft:32,
        paddingRight:32,
        paddingBottom:16,
        paddingTop:48
    }
});