import React from 'react';
import {StyleSheet} from 'react-native';
import {Button} from 'react-native-elements';

export default class PrimaryButton extends React.Component{
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
            <Button type='clear' containerStyle={styles.container} onPress={this._onPress} title={this.props.title} titleStyle={styles.title} props={this.props} buttonStyle={styles.button} />
        )
    }
}

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#FF3545',
    },
    button:{
        backgroundColor: '#FF3545',
        borderRadius:4,
        margin:8,
        padding:8
    },
    title:{
        fontFamily:'nunito-semibold',
        color:'white'
    }
});