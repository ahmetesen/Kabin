import React, {Component} from 'react';
import { View, GestureResponderEvent, TextInputSubmitEditingEventData, NativeSyntheticEvent } from 'react-native';
import GradientContainer from '../../../components/views/gradient-container';
import TextBox from '../../../components/texts/text-box';
import PrimaryButton from '../../../components/buttons/primary-button';
import {styles} from '../styles';
import { DefaultNavigationProp, RootStackParamList } from '../../../constants/nav-params';
import { RouteProp } from '@react-navigation/native';
import { i18n } from '../../../constants/language';
import SeperatorWithButton from '../../../components/views/seperator-with-button';

type State={
    email:string;
    errorMessage:string;
}
type Props={
    navigation: DefaultNavigationProp;
    route:RouteProp<RootStackParamList, 'Email'>;
}

export default class Email extends Component<Props,State>{
    state={
        email:'',
        errorMessage:''
    };

    _backPress=(event: GestureResponderEvent) => {
        this.props.navigation.goBack();
    }
    
    _onMailTextChange = (value:string) => {
        this.setState({email:value.toLowerCase(),errorMessage:""});

    }
    _validateEmail(){
        var email = this.state.email;
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = reg.test(String(email).toLowerCase());
        var errorMessage="";
        if(valid && email.includes('@')){
            errorMessage="";
            return true;
        }

        errorMessage= i18n.t('mail_clientvalidation_error_message');
        this.setState({errorMessage:errorMessage});
        return false;
    }

    _onMailComplete(){
        if(this.state.email ==""){
            this.setState({errorMessage:i18n.t('mail_empty_error_message')});
            return;
        }
        else if(this._validateEmail())
            this.props.navigation.navigate("Password",{email:this.state.email});
    }

    _onSubmit = (evt:NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        this._onMailComplete();
    }

    _primaryPress = (event:GestureResponderEvent) => {
        this._onMailComplete();
    }

    _secondaryPress = (event:GestureResponderEvent) => {
        this.props.navigation.navigate('Name');
    }

    render(){
        return(
            <GradientContainer needScroll={true} title={i18n.t('mail_welcome_text')} backPress={this._backPress} >

                <View style={styles.textBoxContainer}>
                    <TextBox
                        onChangeText={this._onMailTextChange}
                        onSubmitEditing={this._onSubmit}
                        errorMessage={this.state.errorMessage}
                        returnKeyType="next"
                        placeholder={i18n.t('mail_placeholder')}
                        textContentType="emailAddress"
                        autoCapitalize="none"
                    />
                </View>
                <View style={styles.footerContainer}>
                    <PrimaryButton onPress={this._primaryPress} title={i18n.t('buttons_continue')}></PrimaryButton>
                    <SeperatorWithButton 
                        seperatorText={i18n.t('seperator_new_user')}
                        buttonText={i18n.t('buttons_signup')}
                        clickAction={this._secondaryPress}
                    ></SeperatorWithButton>
                </View>
            </GradientContainer>
        );
    }
}