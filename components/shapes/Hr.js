import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
const color="#DDDDDD";
export default class Hr extends React.Component{
    constructor(props){
        super(props);
        if(this.props.title)
            this.title=this.props.title;
        else
            this.title=":"

    }
    render(){
        return(
            <View style={styles.container}>
                <View style={styles.line}>

                </View>
                <Text style={styles.point}>{this.title}</Text>
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
        margin:16,
        flex:.5
    },
    point:{
        color:color,
        fontSize:16,
        fontFamily: 'nunito-semibold'
    }
})