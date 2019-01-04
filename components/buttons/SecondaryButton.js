import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

export default class SecondaryButton extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <Button title={this.props.title} titleStyle={styles.title} props={this.props} buttonStyle={styles.button}>
                {this.props.children}
            </Button>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: 'transparent',
        margin:8,
        padding:8
    },
    title:{
        fontFamily:'nunito-semibold',
        color:'white'
    }
})