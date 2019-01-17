import React from 'react';
import {View, StyleSheet} from 'react-native';
export default class TabNavContainer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <View props={this.props} style={[styles.style,this.props.style]} >
                {this.props.children}
            </View>
        )
    }
}

const styles = StyleSheet.create({
    style:{
        padding:16
    }
})