import React,{Component} from 'react';
import GradientContainer from '../components/views/gradient-container';
import { DefaultNavigationProp } from '../constants/nav-params';
import SpinnerContainer from '../components/views/spinner-container';
import { Alert } from 'react-native';
import { i18n } from '../constants/language';
import DeviceManager from '../core/device-manager';
import { setLoggedIn, setLoggedOut, setVerified } from '../store/login-slice';
import { connect } from 'react-redux';
import ErrorManager from '../core/error-manager';
import Auth from '../core/firebase/auth';
import { User } from 'firebase';

type Props = {
    navigation: DefaultNavigationProp;
    setLoggedIn:typeof setLoggedIn;
    setLoggedOut: typeof setLoggedOut;
    setVerified: typeof setVerified;
}

type State = {
    error:Boolean
}

const mapDispatchToProps = { setLoggedIn, setLoggedOut, setVerified };

class PreLandingComponent extends Component<Props,State> {

    async componentDidMount(){
        SpinnerContainer.instance.showSpinner(()=>{
            this.showWarning();
        },true);
        const response = await DeviceManager.instance.initializeCurrentDevice();
        SpinnerContainer.instance.hideSpinner();
        if(!response)
            this.showWarning();
        if(Auth.instance.currentUser === null)
            Auth.instance.addAuthStateChangeEvent(this._authStateChange);
        else{
            this._alreadyLoggedIn(Auth.instance.currentUser);
        }
        
    }

    _authStateChange=(user:User | null)=>{
        Auth.instance.removeAuthStateChangeEvent(this._authStateChange);
        if(user)
            this._alreadyLoggedIn(user);
        else
            this.props.setLoggedOut();
    }

    _alreadyLoggedIn=(user:User)=>{
        if(user.emailVerified===true)
            this.props.setVerified();
        else
            this.props.setLoggedIn();
    }

    showWarning(){
        Alert.alert(
            i18n.t('prelanding_notLoadWarning_title'),
            i18n.t('prelanding_notLoadWarning_description'),
            [
                {
                    text: i18n.t('prelanding_notLoadWarning_firstButton'), 
                    onPress: () => this.retryLoad() },
                {
                    text: i18n.t('prelanding_notLoadWarning_secondButton'),
                    onPress: () => this.sendEmail(),
                    style: 'default',
                },
            ],
            {
                cancelable: false 
            }
        );
    }

    retryLoad(){
        this.componentDidMount();
    }

    sendEmail(){
        ErrorManager.instance.sendEmail(i18n.t('prelanding_email_bodypt1'),'Prelanding_showWarning');
    }

    render(){
        return(
            <GradientContainer needScroll={false}>
            </GradientContainer>
        )
    }
}

const PreLanding = connect(null,mapDispatchToProps)(PreLandingComponent);
export default PreLanding;