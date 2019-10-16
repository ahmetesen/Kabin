import React from 'react';
import {View, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
interface Props{

}
export default class GradientContainer extends React.Component<Props>{
    constructor(props:Props){
        super(props);
    }

    render(){
        return(
            <LinearGradient style={styles.linearGradient} start={[1,0]} end={[0,1]} colors={['#4DA6F8','#5263FC']} >
                {this.props.children}
            </LinearGradient>
        )
    }
}
const styles = StyleSheet.create({
    linearGradient:{
        flex:1,
        paddingHorizontal:16,
        paddingBottom:28,
    }
})
