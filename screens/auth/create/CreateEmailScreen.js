import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import TextBlock from '../../../components/texts/TextBlock';
import GradientContainer from '../../../components/views/GradientContainer';
import SpinnerContainer from '../../../components/views/SpinnerContainer';
import TextBox from '../../../components/texts/TextBox';
import Hr from '../../../components/shapes/Hr';
import SecondaryButton from '../../../components/buttons/SecondaryButton';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {styles} from './style';
import Firebase from '../../../core/Firebase';
import { StackActions, NavigationActions } from 'react-navigation';
import { LinkButton } from '../../../components/buttons';
import WebModalContainer from '../../../components/views/WebModalContainer';
export default class CreateEmailScreen extends React.Component{
    _initialState={
        name:'',
        email:'',
        errorMessage:''
    };
    constructor(props){
        super(props);
        this.state = this._initialState;
        this._onMailTextChange = this._onMailTextChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._primaryPress = this._primaryPress.bind(this);
        this._secondaryPress = this._secondaryPress.bind(this);
        this._eulaClick = this._eulaClick.bind(this);
    }
    componentWillMount(){
        name = this.props.navigation.getParam('name','Misafir');
        this.setState({name:name});
    }
    _onMailTextChange(value){
        this.setState({email:value,errorMessage:""});

    }
    _validateEmail(){
        var email = this.state.email;
        var reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        var valid = reg.test(String(email).toLowerCase());
        var errorMessage="";
        if(valid){
            if(email.includes('@')){
                errorMessage="";
                return true;
            }
            else
                errorMessage="Geçerli bir şirket eposta adresi girmen gerekir.";
        }
        else
            errorMessage="Geçerli bir eposta adresi girmen gerekir.";
        this.setState({errorMessage:errorMessage});
        return false;
    }
    _checkIsUserLoggedAlready(){
        SpinnerContainer.getInstance().showSpinner();
        Firebase.getInstance().checkUserIsAlreadyExist(this.state.email,
            ()=>{
                SpinnerContainer.getInstance().hideSpinner(()=>{
                    this.props.navigation.navigate("CreatePassword",{name:this.state.name,email:this.state.email});
                });
            },
            (response)=>{
                SpinnerContainer.getInstance().hideSpinner(()=>{
                    this.setState({errorMessage:response});
                });
                
            }
        );
    }
    _onSubmit(e){
        this._createEmailComplete();
    }

    _createEmailComplete(){
        if(this.state.email ==""){
            this.setState({errorMessage:"Bir epostan olmalı?"});
            return;
        }
        else if(this._validateEmail())
            this._checkIsUserLoggedAlready();
    }

    _primaryPress(event){
        this._createEmailComplete();
    }

    _secondaryPress(event){
        this.props.navigation.navigate('Email');
    }

    _eulaClick(event){
        WebModalContainer.getInstance().openModal('https://kabinapp.firebaseapp.com/gizlilik.html');
        SpinnerContainer.getInstance().showSpinner();
    }

    render(){
        return(
            <GradientContainer>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <TextBlock logo>Kabin</TextBlock>
                    </View>
                    <KeyboardAvoidingView behavior='padding' style={styles.keyboardAvoidingViewStyle}>
                        <View style={styles.titleContainer}>
                            <TextBlock big>Hoş geldin {this.state.name},</TextBlock>
                        </View>
                        <View style={styles.textBoxContainer}>
                            <TextBox
                                onChangeText={this._onMailTextChange}
                                onSubmitEditing={this._onSubmit}
                                value={this.state.email}
                                errorMessage={this.state.errorMessage}
                                returnKeyType="next"
                                autoFocus={true}
                                shake={true}
                                placeholder='E-posta adresin nedir?'
                            />
                        </View>
                        <View>
                            <LinkButton title="Devam ederek, kullanıcı sözleşmesini kabul etmiş sayılırsınız." onPress={this._eulaClick}></LinkButton>
                        </View>
                        <View style={styles.infoContainer}>
                            <PrimaryButton title=" Devam " onPress={this._primaryPress}/>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={styles.footerContainer}>
                        <Hr title="Zaten üye misin?"></Hr>
                        <SecondaryButton title="Giriş Yap" onPress={this._secondaryPress}></SecondaryButton>
                    </View>
                </View>
            </GradientContainer>
        );
    }
}