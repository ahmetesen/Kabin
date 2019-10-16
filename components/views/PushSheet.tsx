import React from 'react';
import {Animated, View, StyleSheet, Vibration, TouchableWithoutFeedback } from 'react-native';
import TextBlock from '../texts/TextBlock';


export default class PushSheet extends React.Component{
    static _instance:PushSheet;

    state = {
        fadeAnim: new Animated.Value(0),
        visible:false,
        message:"Push Notification"
    }

    constructor(props){
            super(props);
            PushSheet._instance = this;
            this.closePressed = this.closePressed.bind(this);
    }

    static get instance():PushSheet{
        return PushSheet._instance;
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

    _hideSheetTimeout=null;

    closePressed(event){
        this.hideSheet(null);
    }

    showSheet(message){
        this.setState({visible:true,message:message});
        this._fadeIn.start();
        Vibration.vibrate(100);
        if(this._hideSheetTimeout)
            clearTimeout(this._hideSheetTimeout);
        this._hideSheetTimeout = setTimeout(function(){
            PushSheet.instance.hideSheet(null);
        },4000);
    }

    hideSheet(action){
        this._fadeOut.start(()=>{
            this.setState({visible:false});
            if(action)
                action();
            this.clearTimer();
        });
    }

    componentWillUnmount(){
        this.clearTimer();
    }

    clearTimer(){
        if(this._hideSheetTimeout!==null){
            clearTimeout(this._hideSheetTimeout);
            this._hideSheetTimeout = null;
        }
    }

    render(){
        let { visible,fadeAnim } = this.state;
        if(!visible)
            return null;
        else
            return(
                <Animated.View style={{...styles.container,opacity:fadeAnim}}>
                    <TouchableWithoutFeedback onPress={this.closePressed}>
                        <View style={{flex:1, paddingLeft:32, paddingRight:32,paddingBottom:16,paddingTop:48}}>
                            <TextBlock text>
                                {this.state.message}
                            </TextBlock>
                        </View>
                    </TouchableWithoutFeedback>
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
        opacity:0
    }
});