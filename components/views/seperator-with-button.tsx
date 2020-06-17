import React, { EventHandler, Component } from 'react';
import { StyleSheet, View, GestureResponderEvent} from 'react-native';
import TextBlock from '../texts/text-block';
import { SecondaryButton } from '../buttons';
import Hr from '../shapes/hr';
import { i18n } from '../../constants/language';
type Props = {
    seperatorText:string;
    buttonText:string;
    clickAction:EventHandler<GestureResponderEvent>;
}

export default class SeperatorWithButton extends Component<Props>{
    
    _secondaryPress=(event: GestureResponderEvent)=>{
        if(this.props.clickAction)
            this.props.clickAction(event);
    }

    render(){
        return(
            <View style={{marginTop:12}}>
                <Hr title={this.props.seperatorText}></Hr>
                <SecondaryButton onPress={this._secondaryPress} title={this.props.buttonText}></SecondaryButton>
            </View>
        )
    }
}