import { Animated, View, StyleSheet, ActivityIndicator } from 'react-native';
import { PrimaryButton } from '../buttons';
import {i18n} from '../../constants/language';
import React,{ Component } from 'react';
import { primaryColor } from '../styles/global';

interface Props{
}

interface State{
    fadeAnim:Animated.Value;
    visible:boolean;
    buttonVisible:boolean;
    darkTheme:boolean;
    fadeButtonAnim:Animated.Value;
}

export default class SpinnerContainer extends Component<Props,State>{
    static _instance:SpinnerContainer;
    _counter = 0;
    _isOpen=false;
    _fadeOut:any;
    _fadeIn:any;
    _fadeButtonIn:any;
    _closeTimer:any=0;
    _fadeDuration:number = 300;
    _buttonVisibleDuration = 5000;
    _cancelAction:Function | undefined;

    state = {
        fadeAnim: new Animated.Value(0),
        fadeButtonAnim: new Animated.Value(0),
        visible:false,
        buttonVisible:false,
        darkTheme:true
    }

    componentDidMount(){
        SpinnerContainer._instance=this;
        this._fadeIn = Animated.timing(
            this.state.fadeAnim,{
                toValue:1,
                duration:this._fadeDuration
            }
        );
        this._fadeOut = Animated.timing(
            this.state.fadeAnim,{
                toValue:0,
                duration:this._fadeDuration,
            }
        );
        this._fadeButtonIn = Animated.timing(
            this.state.fadeButtonAnim,{
                toValue:1,
                duration:this._fadeDuration,
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

    closePressed=(event:any)=>{
        this.hideSpinner(()=>{
            if(this._cancelAction)
                this._cancelAction();
        });
    }

    showSpinner=(cancelAction:Function,darkTheme:boolean = true)=>{
        if(this._counter==0){
            this._cancelAction = cancelAction;
            this.setState({visible:true,darkTheme:darkTheme,fadeButtonAnim:new Animated.Value(0)});
            this._fadeIn.start();
            this._isOpen = true;
            this._closeTimer = setTimeout(()=>{
                this.setState({buttonVisible:true,fadeButtonAnim:new Animated.Value(1)});
            },this._buttonVisibleDuration);
        }
        this._counter ++;
    }

    hideSpinner=(action?:Function|undefined) => {
        this._counter--;
        if(this._counter == 0){
            this._fadeOut.start(()=>{
                this.clearTimer();
                this.setState({visible:false, fadeButtonAnim:new Animated.Value(0), buttonVisible:false});
                if(action)
                    action();
                this._cancelAction = undefined;
                this._isOpen = false;
            });
        }
        else if(this._counter<0){
            throw new Error("An error occured. You can notify us for this error on Kabin Contact Screen with this code: 1001");
        }
    }

    render(){
        const { darkTheme, buttonVisible,visible,fadeAnim, fadeButtonAnim } = this.state;
        const spinnerColor = darkTheme?'#ffffff':primaryColor;
        if(!visible)
            return null;
        else if(!buttonVisible)
            return(
                <Animated.View style={{...styles.container,opacity:fadeAnim}}>
                    <View style={styles.block}>
                        
                    </View>
                    <ActivityIndicator size="large" color={spinnerColor}>

                    </ActivityIndicator>
                </Animated.View>
            );
        else if(visible && buttonVisible)
            return(
                <Animated.View style={{...styles.container,opacity:fadeAnim}}>
                    <View style={styles.block}>
                        
                    </View>
                    <ActivityIndicator size="large" color={spinnerColor}>

                    </ActivityIndicator>
                    <Animated.View style={{position:'absolute',alignItems:'stretch', justifyContent:'flex-end',flex:1,bottom:16,top:0,right:0,left:0, margin:16, opacity:fadeButtonAnim}}>
                        <PrimaryButton darkTheme={!darkTheme} onPress={this.closePressed} title={i18n.t('buttons_cancel')} ></PrimaryButton>
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