import React, {Component} from 'react';
import {Image,StyleSheet} from 'react-native';
import TextBlock from '../texts/text-block';

interface Props{
    isLight:boolean;
}

interface State{

}

export default class Logo extends Component<Props,State> {

    logo = require('../../assets/images/Logo.png');
    constructor(props:Props){
        super(props);
    }
    render(){
        return(
                    this.props.isLight?
                        <TextBlock logo>Kabin</TextBlock>
                    :
                        <Image style={style.logo} source={this.logo} />    
        );
    }
}

const style = StyleSheet.create({
    logo:{
        marginLeft:'auto',
        marginRight:'auto'
    }
})