import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
export default class TabNavContainer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <ScrollView props={this.props} style={this.props.style} contentContainerStyle={[styles.containerStyle,this.props.contentContainerStyle]} >
                {this.props.children}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle:{
        padding:0
    }
})