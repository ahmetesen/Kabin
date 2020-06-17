import React, {Component} from 'react';
import {View, StyleSheet, Text, StyleProp, ViewStyle} from 'react-native';
const color="#DDDDDD";

interface Props{
    title?:String;
    style?:StyleProp<ViewStyle>;
}
interface State{

}
export default class Hr extends Component<Props, State>{
    constructor(props:Props){
        super(props);

    }
    render(){
        let titleText = (this.props.title)?<Text style={styles.point}>{this.props.title}</Text>:<Text style={styles.point}>:</Text>
        return(
            <View style={[styles.container,this.props.style]}>
                <View style={styles.line}>

                </View>
                {titleText}
                <View style={styles.line}>

                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container:{
        flexDirection:'row',
        justifyContent:'space-evenly',
        alignItems:'center'
    },
    line:{
        borderBottomColor: color,
        borderBottomWidth: 1,
        height:1,
        flex:.5
    },
    point:{
        color:color,
        fontSize:16,
        fontFamily: 'nunito-semibold',
        marginHorizontal:8
    }
})