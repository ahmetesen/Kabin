import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

export default class LinkButton extends React.Component{
    constructor(props){
        super(props);
        this._onPress = this._onPress.bind(this);
    }

    _onPress(event){
        if(this.props.onPress)
            this.props.onPress(event);
    }

    render(){
        return(
            <Button onPress={this._onPress} title={this.props.title} titleStyle={styles.title} props={this.props} buttonStyle={styles.button}>
                {this.props.children}
            </Button>
        )
    }
}

const styles = StyleSheet.create({
    button:{
        backgroundColor: 'transparent',
        margin:0,
        padding:0,
        borderWidth:0
    },
    title:{
        fontFamily:'nunito-light',
        color:'white',
        fontSize:14,
        textDecorationLine: 'underline'
    }
})