import React from 'react';
import { Animated, View, StyleSheet, ActivityIndicator } from 'react-native';
import { PrimaryButton } from '../buttons';
import {texts} from '../../constants/language';

interface Props{

}

interface State{
    fadeAnim:any;
    visible:boolean;
    buttonVisible:boolean;
    color:string;
    darkButton:boolean;
}

export default class SpinnerContainer extends React.Component<Props,State>{
    static _instance:SpinnerContainer;
    _counter = 0;
    _isOpen=false;
    _fadeOut:any;
    _fadeIn:any;
    _closeTimer:any=0;
    _cancelAction:Function | undefined;
    constructor(props:Props){
        super(props);
        this.showSpinner = this.showSpinner.bind(this);
        this.hideSpinner = this.hideSpinner.bind(this);
        this.closePressed = this.closePressed.bind(this);
        this.state = {
            fadeAnim: new Animated.Value(0),
            visible:false,
            buttonVisible:false,
            color:'#283ad8',
            darkButton:true
        }
        SpinnerContainer._instance=this;
        this._fadeIn = Animated.timing(
            this.state.fadeAnim,{
                toValue:1,
                duration:300
            }
        )
        this._fadeOut = Animated.timing(
            this.state.fadeAnim,{
                toValue:0,
                duration:300,
            }
        )
    }

    static get instance():SpinnerContainer{
        return SpinnerContainer._instance;
    }

    componentWillUnmount(){
        this.clearTimer();
    }

    clearTimer(){
        if(this._closeTimer){
            clearTimeout(this._closeTimer);
            this._closeTimer = 0;
        }
    }

    closePressed(event:any){
        this.hideSpinner(()=>{
            if(this._cancelAction)
                this._cancelAction();
        });
    }

    showSpinner(cancelAction:Function, color:string = "#283ad8",darkButton:boolean = true){
        if(this._counter==0){
            this._cancelAction = cancelAction;
            this.setState({visible:true,color:color,darkButton:darkButton});
            this._fadeIn.start();
            this._isOpen = true;
            this._closeTimer = setTimeout(()=>{
                this.setState({buttonVisible:true});
            },5000);
        }
        this._counter ++;
    }

    hideSpinner(action?:any){
        this._counter--;
        if(this._counter == 0){
            this._fadeOut.start(()=>{
                this.clearTimer();
                this.setState({visible:false, buttonVisible:false});
                if(action)
                    action();
                this._cancelAction = undefined;
                this._isOpen = false;
            });
        }
        else if(this._counter<0){
            //
            throw new Error("An error occured. You can notify us for this error on Kabin Contact Screen with this code: 1001");
        }
    }



    render(){
        let { darkButton, buttonVisible,visible,fadeAnim, color } = this.state;
        if(!visible)
            return null;
        else if(!buttonVisible)
            return(
                <Animated.View style={{...styles.container,opacity:fadeAnim}}>
                    <View style={styles.block}>
                        
                    </View>
                    <ActivityIndicator size="large" color={color}>

                    </ActivityIndicator>
                </Animated.View>
            );
        else if(visible && buttonVisible)
            return(
                <Animated.View style={{...styles.container,opacity:fadeAnim}}>
                    <View style={styles.block}>
                        
                    </View>
                    <ActivityIndicator size="large" color={color}>

                    </ActivityIndicator>
                    <Animated.View style={{position:'absolute',alignItems:'stretch', justifyContent:'flex-end',flex:1,bottom:16,top:0,right:0,left:0, margin:16, opacity:fadeAnim}}>
                        <PrimaryButton darkTheme={darkButton} onPress={this.closePressed} title={texts.buttons.cancel} ></PrimaryButton>
                    </Animated.View>
                </Animated.View>
            )
    }
}
const styles = StyleSheet.create({
    block:{
        flex:1,
        position:'absolute',
        justifyContent:'flex-start',
        alignItems:'flex-end',
        top:0,
        left:0,
        bottom:0,
        right:0,
        opacity:.3,
        backgroundColor:'black',
    },
    spinner:{
    },
    container:{
        position:'absolute',
        top:0,
        right:0,
        bottom:0,
        left:0,
        flex:1,
        justifyContent:'center',
        opacity:0
    }
})
