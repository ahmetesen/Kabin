import { DefaultNavigationProp, RootStackParamList } from "../../../constants/nav-params";
import { RouteProp } from "@react-navigation/native";
import React, { Component } from "react";
import GradientContainer from "../../../components/views/gradient-container";
import { GestureResponderEvent, View, NativeSyntheticEvent, TextInputSubmitEditingEventData } from "react-native";
import { i18n } from "../../../constants/language";
import {styles} from '../styles';
import TextBox from "../../../components/texts/text-box";
import TextBlock from "../../../components/texts/text-block";
import { PrimaryButton } from "../../../components/buttons";
import SeperatorWithButton from "../../../components/views/seperator-with-button";
import SpinnerContainer from "../../../components/views/spinner-container";
import Auth from "../../../core/firebase/auth";
import { setLoggedIn } from "../../../store/login-slice";
import { connect } from "react-redux";
import DeviceManager from "../../../core/device-manager";
import UsersManager from "../../../core/users-manager";

type State={
    password:string;
    errorMessage:string;
};
type Props={
    navigation: DefaultNavigationProp;
    route:RouteProp<RootStackParamList, 'CreatePassword'>;
    setLoggedIn: typeof setLoggedIn;
};

const mapDispatchToProps = { setLoggedIn };

class CreatePasswordComponent extends Component<Props,State>{

    state = {
        password:'',
        errorMessage:''
    };

    _onPasswordTextChange = (value:string) => {
        this.setState({password:value});
        this._showCharValidationError(value);
    }

    _showCharValidationError = (value:string) => {
        if(this.state.password.length<5)
            this.setState({errorMessage:i18n.t('password_char_error')});
        else
            this.setState({errorMessage:""});
    }

    _signUserUp = async () => {
        this._showCharValidationError(this.state.password);
        SpinnerContainer.instance.showSpinner(()=>{
            this.setState({errorMessage:i18n.t('errors_defaultErrorTitle')});
        });

        const result = await Auth.instance.signup(this.props.route.params.name,this.props.route.params.email,this.state.password);
        const attached = await DeviceManager.instance.attachUserToDevice();
        if(result===''){
            if(attached === false || Auth.instance.currentUser === null){
                this.setState({errorMessage:i18n.t('errors_defaultErrorTitle')});
                return;
            }
            const verificationText = await Auth.instance.sendVerificationEmail();
            if(verificationText === '')
                this.props.setLoggedIn();
            else
                this.setState({errorMessage:i18n.t(verificationText)});
        }
        else
            this.setState({errorMessage:i18n.t(result)});
        SpinnerContainer.instance.hideSpinner();
    }

    _backPressed = (event: GestureResponderEvent) => {
        this.props.navigation.goBack();
    };

    _createPasswordComplete(){
        this._signUserUp();
    }
    _onSubmit = (ev:NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        this._createPasswordComplete();
    }
    _primaryPress = (ev:GestureResponderEvent) => {
        this._createPasswordComplete();
    }
    _secondaryPress = (ev:GestureResponderEvent) => {
        this.props.navigation.navigate('Email');
    }
    
    render(){
        const title = this.props.route.params.name + '\n'+i18n.t('password_title');
        return(
            <GradientContainer needScroll={true} backPress={this._backPressed} title={title}>
                <View style={styles.textBoxContainer}>
                    <TextBox
                        onChangeText={this._onPasswordTextChange}
                        onSubmitEditing={this._onSubmit}
                        textContentType="password"
                        value={this.state.password}
                        errorMessage={this.state.errorMessage}
                        returnKeyType="next"
                        secureTextEntry={true}
                        placeholder={i18n.t('password_placeholder')}
                        autoCapitalize="none"
                    />
                </View>
                <View>
                    <TextBlock small>{i18n.t('password_subinfo')}</TextBlock>
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
        );
    }
}

const CreatePassword = connect(null,mapDispatchToProps)(CreatePasswordComponent);
export default CreatePassword;