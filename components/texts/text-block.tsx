import React, { Component } from 'react';
import {StyleSheet, Text, StyleProp, TextStyle} from 'react-native';
import { primaryColor } from '../styles/global';

type Props = {
    logo?:boolean;
    big?:boolean;
    dark?:boolean;
    style?:StyleProp<TextStyle>;
    numberOfLines?: number | undefined;
    blue?:boolean;
    bold?:boolean;
    low?:boolean;
    italic?:boolean;
    small?:boolean;
    black?:boolean;
    logoInverse?:boolean;
}

export default class TextBlock extends Component<Props>{

    render(){
        let style=[];
        style.push(styles.text);
        
        if(this.props.logo)
            style.push(styles.logo);
        if(this.props.logoInverse)
            style.push(styles.logoInverse);
        if(this.props.big)
            style.push(styles.big);
        if(this.props.dark)
            style.push(styles.dark);
        if(this.props.blue)
            style.push(styles.blue);
        if(this.props.bold)
            style.push(styles.bold);
        if(this.props.low)
            style.push(styles.low);
        if(this.props.italic)
            style.push(styles.italic);
        if(this.props.small)
            style.push(styles.small);
        if(this.props.black)
            style.push(styles.black);
        return(
            <Text {...this.props} style={[style,this.props.style]} numberOfLines={this.props.numberOfLines?this.props.numberOfLines:0}>
                {this.props.children}
            </Text>
        );
    }
}
const styles = StyleSheet.create({
    dark: {
        color: '#1D1D1D'
    },
    blue: {
        color: primaryColor,
    },
    text:{
        fontFamily: 'nunito-light',
        fontSize: 16,
        color: '#F9F9F9'
    },
    bold:{
        fontFamily: 'nunito-semibold'
    },
    low:{
        fontFamily: 'nunito-semibold',
        fontSize:12,
        color: '#878787'
    },
    big:{
        fontSize:22
    },
    small:{
        fontSize:12
    },
    italic:{
        fontFamily: 'nunito-lightitalic'
    },
    logo:{
        fontFamily: 'nunito-black',
        fontSize:38,
        color:'white'
    },
    logoInverse:{
        fontFamily: 'nunito-black',
        fontSize:32,
        color:primaryColor
    },
    black: {
        color: '#1D1D1D'
    }
});