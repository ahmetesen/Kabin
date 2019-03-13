import React from 'react';
import {View, StyleSheet} from 'react-native';
const color="#DDDDDD";
export default class SoftLine extends React.Component{
    render(){
        let topSpace=0;
        if(this.props.topSpace)
            topSpace = this.props.topSpace;
        return(
            <View
                style={{
                    paddingTop:topSpace,
                    borderBottomColor: '#878787',
                    borderBottomWidth: .3,
                }}
            />
        )
    }
}