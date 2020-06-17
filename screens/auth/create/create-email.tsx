import React,{Component} from 'react';
import { View, TextInputSubmitEditingEventData, NativeSyntheticEvent, GestureResponderEvent, Alert } from 'react-native';
import GradientContainer from '../../../components/views/gradient-container';
import TextBox from '../../../components/texts/text-box';
import { PrimaryButton, LinkButton } from '../../../components/buttons';
import { DefaultNavigationProp, RootStackParamList } from '../../../constants/nav-params';
import { i18n } from '../../../constants/language';
import SeperatorWithButton from '../../../components/views/seperator-with-button';
import {styles} from '../styles';
import { RouteProp } from '@react-navigation/native';
import WebModalContainer from '../../../components/views/web-modal-container';
import SpinnerContainer from '../../../components/views/spinner-container';
import Functions from '../../../core/firebase/functions';
import ConnectionManager from '../../../core/connection-manager';

type State={
    name:string;
    email:string;
    errorMessage:string;
};

type Props={
    navigation: DefaultNavigationProp;
    route:RouteProp<RootStackParamList, 'CreateEmail'>;
};

export default class CreateEmail extends Component<Props,State>{
    state = {
        name:'',
        email:'',
        errorMessage:''
    }

    _backPress=(event: GestureResponderEvent) => {
        this.props.navigation.goBack();
    }

    _primaryPress = (event: GestureResponderEvent) => {
        this._createEmailComplete();
    }

    _secondaryPress = (event:GestureResponderEvent) => {
        this.props.navigation.navigate('Email');
    }

    _onMailTextChange = (value:string) => {
        this.setState({email:value,errorMessage:""});
    }

    _onSubmit = (e:NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        this._createEmailComplete();
    }

    _createEmailComplete = async () => {
        const isConnected = ConnectionManager.instance.checkConnection();
        if(!isConnected)
            return;
        if(this._validateEmail() === false)
            return;
        SpinnerContainer.instance.showSpinner(()=>{
            this.setState({errorMessage:i18n.t('errors_defaultErrorTitle')});
        })
        const response = await Functions.instance.checkIfEmailValid(this.state.email);
        SpinnerContainer.instance.hideSpinner();
        if(response === undefined){
            this.setState({errorMessage:i18n.t('errors_defaultErrorTitle')});
        }
        else{
            if(response.statusCode === 200){
                this.props.navigation.navigate("CreatePassword",{name:this.props.route.params.name,email:this.state.email});
                //TODO: success
            }
            else{
                if(response.errorType === "popup")
                {
                    Alert.alert(i18n.t('errors_defaultErrorTitle'),i18n.t(response.param));
                }
                else
                {
                    this.setState({errorMessage:i18n.t(response.param)});
                }
            }
        }
    }

    _eulaClick = (event:GestureResponderEvent) => {
        WebModalContainer.instance.openModal(i18n.t('mail_privacy_link'));
    }

    _validateEmail = ():boolean => {
        var email = this.state.email;
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = reg.test(String(email).toLowerCase());
        var errorMessage="";
        if(valid){
            return true;
        }
        else
            errorMessage=i18n.t('mail_clientvalidation_error_message');
        this.setState({errorMessage:errorMessage});
        return false;
    }

    render(){
        const welcomeText:string = i18n.t('createemail_title_pt1') + this.props.route.params.name + i18n.t('createemail_title_pt2')
        return(
            <GradientContainer title={welcomeText} backPress={this._backPress} needScroll={true}>
                <View style={styles.textBoxContainer}>
                    <TextBox
                        onChangeText={this._onMailTextChange}
                        onSubmitEditing={this._onSubmit}
                        errorMessage={this.state.errorMessage}
                        returnKeyType="next"
                        placeholder={i18n.t('createemail_placeholder')}
                        textContentType="emailAddress"
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                </View>
                <View>
                    <LinkButton title={i18n.t('mail_privacy_text')} onPress={this._eulaClick}></LinkButton>
                </View>
                <View style={styles.footerContainer}>
                    <PrimaryButton onPress={this._primaryPress} title={i18n.t('buttons_continue')}></PrimaryButton>
                    <SeperatorWithButton 
                        seperatorText={i18n.t('seperator_alreadysigned')}
                        buttonText={i18n.t('buttons_login')}
                        clickAction={this._secondaryPress}
                    ></SeperatorWithButton>
                </View>
            </GradientContainer>
        )
    }
}