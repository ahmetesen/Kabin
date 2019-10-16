import React from 'react';
import {Animated, View, StyleSheet, Vibration, TouchableWithoutFeedback } from 'react-native';
import { Text } from 'react-native-elements';


export default class ErrorSheet extends React.Component{
    state = {
        fadeAnim: new Animated.Value(0),
        visible:false,
        title:'Error',
        message:"Error Message"
    }
    static _instance:ErrorSheet;

    static get instance():ErrorSheet{
        return ErrorSheet._instance;
    }

    isOpen = false;
    constructor(props:any){
        super(props);
        ErrorSheet._instance = this;
        this.pressed = this.pressed.bind(this);
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

    showSheet(title:string, message:string){
        this.setState({visible:true, title:title,message:message});
        this._fadeIn.start();
        Vibration.vibrate(100);
        this.isOpen = true;
    }

    hideSheet(action:any){
        this._fadeOut.start(()=>{
            this.setState({visible:false});
            if(action)
                action();
            this.isOpen = false;
        });
    }

    pressed(event:any){
        this.hideSheet(null);
    }

    render(){
        let { visible,fadeAnim } = this.state;
        if(!visible)
            return null;
        else
            return(
                
                <Animated.View style={{...styles.container,opacity:fadeAnim}}>
                    <TouchableWithoutFeedback onPress={this.pressed}>
                        <View style={styles.content}>
                            <Text style={{color:'#FFFFFF'}}>
                                {this.state.title}
                            </Text>
                            <Text style={{color:'#FFFFFF'}}>
                                {this.state.message}
                            </Text>
                        </View>
                    </TouchableWithoutFeedback>
                </Animated.View>
                
            );
    }
}

const styles = StyleSheet.create({
    content:{
        flex:1,
        paddingLeft:32,
        paddingRight:32,
        paddingBottom:16,
        paddingTop:48
    },
    container:{
        position:'absolute',
        backgroundColor:'#FF3545',
        top:0,
        right:0,
        left:0,
        opacity:0,
    }
});