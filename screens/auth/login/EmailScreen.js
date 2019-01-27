import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import TextBlock from '../../../components/texts/TextBlock';
import GradientContainer from '../../../components/views/GradientContainer';
import TextBox from '../../../components/texts/TextBox';
import Hr from '../../../components/shapes/Hr';
import SecondaryButton from '../../../components/buttons/SecondaryButton';
import {styles} from '../create/style';
import Firebase from '../../../core/Firebase';
export default class CreateEmailScreen extends React.Component{
    _initialState={
        email:'',
        errorMessage:''
    };
    constructor(props){
        super(props);
        this.state = this._initialState;
        this._onMailTextChange = this._onMailTextChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._secondaryPress = this._secondaryPress.bind(this);
    }
    _onMailTextChange(value){
        this.setState({email:value.toLowerCase(),errorMessage:""});

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
    _onSubmit(e){
        if(this.state.email ==""){
            this.setState({errorMessage:"Bir epostan olmalı?"});
            return;
        }
        else if(this._validateEmail())
            this.props.navigation.navigate("Password",{email:this.state.email});
    }
    _secondaryPress(event){
        this.props.navigation.navigate('Name');
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
                            <TextBlock big>Hoş geldin</TextBlock>
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
                                placeholder='Eposta adresin nedir?'
                            />
                        </View>
                        <View style={styles.infoContainer}>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={styles.footerContainer}>
                        <Hr title="Henüz kaydolmadın mı?"></Hr>
                        <SecondaryButton title="Üye Ol" onPress={this._secondaryPress}></SecondaryButton>
                    </View>
                </View>
            </GradientContainer>
        );
    }
}