import React,{ Component } from "react";
import GradientContainer from "../../components/views/gradient-container";
import { styles } from "./styles";
import SeperatorWithButton from "../../components/views/seperator-with-button";
import { GestureResponderEvent, View, Alert } from "react-native";
import TextBlock from "../../components/texts/text-block";
import { i18n } from "../../constants/language";
import { DefaultNavigationProp, RootStackParamList } from "../../constants/nav-params";
import { RouteProp } from "@react-navigation/native";
import { connect } from "react-redux";
import { setLoggedOut, setVerified } from "../../store/login-slice";
import Auth from "../../core/firebase/auth";
import SpinnerContainer from "../../components/views/spinner-container";
import ConnectionManager from "../../core/connection-manager";

type Props={
    navigation: DefaultNavigationProp;
    route:RouteProp<RootStackParamList, 'Verification'>;
    setLoggedOut:typeof setLoggedOut;
    setVerified:typeof setVerified;
};

type State = {
    response:string
}

const mapDispatchToProps = { setLoggedOut, setVerified };

class VerificationComponent extends Component<Props,State>{
    state={
        response:''
    }
    
    _mounted = false;
    async componentDidMount(){
        this._mounted = true;
        if(ConnectionManager.instance.checkConnection() === true){
            Auth.instance.stillCheckVerify = true;
            Auth.instance.waitUntilVerified().then((result)=>{
                if(result == true){
                    this.props.setVerified();
                }
                else{
                    if(this._mounted)
                        this.setState({response:i18n.t('errors_defaultErrorTitle')});
                }
            });
        }
    }

    componentWillUnmount(){
        this._mounted = false;
        Auth.instance.stillCheckVerify = false;
    }
    
    _resendClick= async (event: GestureResponderEvent) => {
        SpinnerContainer.instance.showSpinner(()=>{
            this.setState({response:i18n.t('errors_defaultErrorTitle')});
            return;
        });
        const result = await Auth.instance.sendVerificationEmail();
        SpinnerContainer.instance.hideSpinner();
        if(result!=='')
            this.setState({response:i18n.t(result)});
        else
            this.setState({response:i18n.t('verification_email_sent')});
    }
    
    _backPressed = (event: GestureResponderEvent) => {
        Alert.alert(
            i18n.t('verification_back_title'),
            i18n.t('verification_back_description'),
            [
                {
                    text: i18n.t('buttons_cancel') },
                {
                    text: i18n.t('buttons_back'),
                    style: 'default',
                    onPress: () => this._backConfirmed()
                },
            ],
            {
                cancelable: false 
            }
        );
    }

    _backConfirmed = async () => {
        const result = await Auth.instance.logout();
        if(result===''){
            this.props.setLoggedOut();
        }
        else
            this.setState({response:i18n.t(result)});
    }

    render(){
        return(
            <GradientContainer needScroll={false} backPress={this._backPressed} title={i18n.t('verification_title')}>
                    <View style={styles.textBoxContainer}>
                    </View>
                    <View style={styles.footerContainer}>
                        <TextBlock>{i18n.t('verification_email_text')}</TextBlock>
                        <TextBlock>{this.state.response}</TextBlock>
                        <SeperatorWithButton seperatorText={i18n.t('verification_seperator_text')} buttonText={i18n.t('verification_secondary_button_text')} clickAction={this._resendClick}/>
                    </View>
            </GradientContainer>
        )
    }
}

const Verification = connect(null,mapDispatchToProps)(VerificationComponent);
export default Verification;