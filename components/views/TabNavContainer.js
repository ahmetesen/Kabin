import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
export default class TabNavContainer extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return (
            <ScrollView props={this.props} contentContainerStyle={[styles.style,this.props.contentContainerStyle]} >
                {this.props.children}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    style:{
        padding:0,
        backgroundColor:'#F9F9F9'
    }
})