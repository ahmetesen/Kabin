import React from 'react';
import {Animated, View, StyleSheet, ActivityIndicator } from 'react-native';
export default class SpinnerContainer extends React.Component{
    state = {
        fadeAnim: new Animated.Value(0),
        visible:false
    }
    constructor(props){
        super(props);
        this.showSpinner = this.showSpinner.bind(this);
        this.hideSpinner = this.hideSpinner.bind(this);
    }

    _fadeIn= Animated.timing(
        this.state.fadeAnim,{
            toValue:1,
            duration:300
        }
    )
    _fadeOut= Animated.timing(
        this.state.fadeAnim,{
            toValue:0,
            duration:300,
        }
    )

    _fadeOut

    componentDidMount(){
    }

    showSpinner(){
        this.setState({visible:true});
        this._fadeIn.start();
    }

    hideSpinner(action){
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
                    <View style={styles.block}>

                    </View>
                    <ActivityIndicator size="large" color="blue">

                    </ActivityIndicator>
                </Animated.View>
            );
    }
}
const styles = StyleSheet.create({
    block:{
        flex:1,
        position:'absolute',
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
