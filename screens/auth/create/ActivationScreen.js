import React from 'react';
import { View, AppState } from 'react-native';
import TextBlock from '../../../components/texts/TextBlock';
import GradientContainer from '../../../components/views/GradientContainer';
import SpinnerContainer from '../../../components/views/SpinnerContainer';
import Hr from '../../../components/shapes/Hr';
import SecondaryButton from '../../../components/buttons/SecondaryButton';
import {styles} from './style';
import Firebase from '../../../core/Firebase';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
export default class ActivationScreen extends React.Component{
    _initialState={
        name:'',
        email:'',
        response:'',
        appState:AppState.currentState
    }
    constructor(props){
        super(props);
        this.state = this._initialState;
        this._secondaryPress = this._secondaryPress.bind(this);
        this._handleAppStateChange = this._handleAppStateChange.bind(this);
        this._primaryPress = this._primaryPress.bind(this);
    }

    componentWillMount(){
        name = this.props.navigation.getParam('name','');
        email = this.props.navigation.getParam('email','');
        this.setState({name:name, email:email});
    }
    componentDidMount(){
        AppState.addEventListener('change', this._handleAppStateChange);
    }
    componentWillUnmount(){
        AppState.removeEventListener('change', this._handleAppStateChange);
    }
    _reloadUser(){
        SpinnerContainer.getInstance().showSpinner();
        Firebase.getInstance().reloadUserData(()=>{
            if(Firebase.getInstance().auth.currentUser.emailVerified)
                SpinnerContainer.getInstance().hideSpinner(()=>{
                    this.props.navigation.navigate('Main');
                });
                
        },
        (fail)=>{
            this.setState({response:fail});
            SpinnerContainer.getInstance().hideSpinner(null);
        });
    }
    _handleAppStateChange(nextAppState){
        if (this.state.appState.match(/inactive|background/) && nextAppState === 'active') {
            this._reloadUser();
        }
        this.setState({appState:nextAppState});
    }

    _primaryPress(event){
        this._reloadUser();
    }

    _secondaryPress(event){
        this.setState({response:''});
        SpinnerContainer.getInstance().showSpinner();
        Firebase.getInstance().sendEmailVerification(
            ()=>{
                this.setState({response:'Epostan tekrar gönderildi.'});
                SpinnerContainer.getInstance().hideSpinner(null);
            },
            (error)=>{
                SpinnerContainer.getInstance().hideSpinner(null);
                this.setState({response:error});
            }
        );
    }
    render(){
        return(
            <GradientContainer>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <TextBlock logo>Kabin</TextBlock>
                    </View>
                    <View behavior='padding' style={styles.keyboardAvoidingViewStyle}>
                        <View style={styles.titleContainer}>
                            <TextBlock big>
                                E-posta kutunu kontrol etmelisin.
                            </TextBlock>
                        </View>
                        <View style={styles.textBoxContainer}>
                            <TextBlock>Gönderdiğimiz epostadaki linke tıkladıktan sonra uygulamaya geri gelebilirsin.</TextBlock>
                            <TextBlock>{this.state.response}</TextBlock>
                        </View>
                        <View style={{...styles.infoContainer,alignItems:'center'}}>
                            <PrimaryButton onPress={this._primaryPress} title="Linke tıkladım"></PrimaryButton>
                        </View>
                    </View>
                    <View style={styles.footerContainer}>
                        <Hr title="Eposta gelmedi mi?"></Hr>
                        <SecondaryButton onPress={this._primaryPress} title="Tekrar Gönder" onPress={this._secondaryPress}></SecondaryButton>
                    </View>
                </View>
            </GradientContainer>
        );
    }
}