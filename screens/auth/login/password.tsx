import React, { Component } from "react"
import { RootStackParamList, DefaultNavigationProp } from "../../../constants/nav-params"
import { RouteProp } from "@react-navigation/native"
import GradientContainer from "../../../components/views/gradient-container";
import { GestureResponderEvent, View, NativeSyntheticEvent, TextInputSubmitEditingEventData } from "react-native";
import { i18n } from "../../../constants/language";
import { styles } from "../styles";
import { PrimaryButton, LinkButton } from "../../../components/buttons";
import SeperatorWithButton from "../../../components/views/seperator-with-button";
import TextBox from "../../../components/texts/text-box";
import TextBlock from "../../../components/texts/text-block";
import SpinnerContainer from "../../../components/views/spinner-container";
import Auth from "../../../core/firebase/auth";
import { setLoggedIn, setVerified } from "../../../store/login-slice";
import { connect } from "react-redux";
import DeviceManager from "../../../core/device-manager";

type State={
    password:string;
    errorMessage:string;
};

type Props={
    navigation: DefaultNavigationProp;
    route:RouteProp<RootStackParamList, 'Password'>;
    setLoggedIn: typeof setLoggedIn;
    setVerified: typeof setVerified;
};

const mapDispatchToProps = { setLoggedIn, setVerified };

class PasswordComponent extends Component<Props,State>{

    state={
        password:'',
        errorMessage:'',
    };

    _backPressed = (event: GestureResponderEvent) => {
        this.props.navigation.goBack();
    }

    _primaryPress = async (event: GestureResponderEvent) => {
        await this._passwordComplete();
    }
    
    _secondaryPress = (event: GestureResponderEvent) => {
        this.props.navigation.navigate('Name');
    };
    
    _onPasswordTextChange = (value: string) => {
        this.setState({password:value});
    }

    _onSubmit = async (event: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => {
        await this._passwordComplete();
    };

    _passwordComplete = async () => {
        if(this.state.password.length<6){
            this.setState({errorMessage:i18n.t('password_char_error')});
            return;
        }
        SpinnerContainer.instance.showSpinner(()=>{
            this.setState({
                errorMessage:i18n.t('errors_defaultErrorTitle')
            });
        })
        const result = await Auth.instance.login(this.props.route.params.email,this.state.password);
        const attached = await DeviceManager.instance.attachUserToDevice();
        SpinnerContainer.instance.hideSpinner();
        if(result === ''){
            if(attached === false || Auth.instance.currentUser === null){
                this.setState({errorMessage:i18n.t('errors_defaultErrorTitle')});
                return;
            }
            if(Auth.instance.currentUser.emailVerified)
                this.props.setVerified();
            else
                this.props.setLoggedIn();
        }
        else
            this.setState({errorMessage:i18n.t(result)});
    }

    _linkPress= async (event: GestureResponderEvent) => {
        SpinnerContainer.instance.showSpinner(()=>{
            this.setState({errorMessage:i18n.t('errors_defaultErrorTitle')});
            return;
        });
        const result = await Auth.instance.remindPassword(this.props.route.params.email);
            SpinnerContainer.instance.hideSpinner();
        if(result === ''){
            this.setState({errorMessage:i18n.t('password_reset_email')});
        }
        else{
            this.setState({errorMessage:i18n.t(result)});
        }
    };
    
    render(){
        return(
            <GradientContainer needScroll={true} backPress={this._backPressed} title={i18n.t('password_enter_password')}>
                <View style={styles.textBoxContainer}>
                    <TextBox
                        onChangeText={this._onPasswordTextChange}
                        onSubmitEditing={this._onSubmit}
                        textContentType="password"
                        value={this.state.password}
                        errorMessage={this.state.errorMessage}
                        returnKeyType="next"
                        secureTextEntry={true}
                        placeholder={i18n.t('password_enter_placeholder')}
                    />
                </View>
                <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', marginLeft:8}}>
                    <TextBlock small>{i18n.t('password_forgot_text')}</TextBlock>
                        <LinkButton onPress={this._linkPress} title={i18n.t('password_remind_link')}></LinkButton>
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

const Password = connect(null,mapDispatchToProps)(PasswordComponent);
export default Password;