import React from 'react';
import {Image} from 'react-native';
import TextBlock from '../texts/TextBlock';

const darkLogoStyle = {
    display:'block',
    marginLeft:'auto',
    marginRight:'auto'
}

export default class Logo extends Component {
    constructor(props){
        super(props);
        this.isLight = props.isLight;
        this.logo = require('../../assets/images/Logo.png');
    }
    render(){
        return(
                    this.props.isLight?
                        <TextBlock logo>Kabin</TextBlock>
                    :
                        <Image style={darkLogoStyle} alt="Kabin logo" source={this.logo} />    
        );
    }
}