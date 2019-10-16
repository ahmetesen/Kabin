import React from 'react';
import { View, KeyboardAvoidingView, GestureResponderEvent } from 'react-native';
import TextBlock from '../../../components/texts/TextBlock';
import GradientContainer from '../../../components/views/GradientContainer';
import SpinnerContainer from '../../../components/views/SpinnerContainer';
import TextBox from '../../../components/texts/TextBox';
import Hr from '../../../components/shapes/Hr';
import SecondaryButton from '../../../components/buttons/SecondaryButton';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import {styles} from './style';
import Firebase from '../../../core/Firebase';
import { LinkButton } from '../../../components/buttons';
import WebModalContainer from '../../../components/views/WebModalContainer';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import { texts } from '../../../constants/language';
interface Props{
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
interface State{
    name:string;
    email:string;
    errorMessage:string;
}
export default class CreateEmailScreen extends React.Component<Props,State>{
    spinnerCancelled = false;
    constructor(props:Props){
        super(props);
        this.state = {
            name:'',
            email:'',
            errorMessage:''
        };
        this._onMailTextChange = this._onMailTextChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._primaryPress = this._primaryPress.bind(this);
        this._secondaryPress = this._secondaryPress.bind(this);
        this._eulaClick = this._eulaClick.bind(this);
    }
    componentWillMount(){
        let name = this.props.navigation.getParam('name',texts.createEmailScreen.defaultName);
        this.setState({name:name});
    }
    _onMailTextChange(value:string){
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
                errorMessage=texts.createEmailScreen.firmMailError;
        }
        else
            errorMessage=texts.createEmailScreen.mailError;
        this.setState({errorMessage:errorMessage});
        return false;
    }
    _checkIsUserLoggedAlready(){
        SpinnerContainer.instance.showSpinner(()=>{
            this.spinnerCancelled = true;
        });
        Firebase.getInstance().checkUserIsAlreadyExist(this.state.email,
            ()=>{
                if(this.spinnerCancelled)
                    return;
                this._checkEmailIsValid().then(()=>{
                    SpinnerContainer.instance.hideSpinner(()=>{
                        this.props.navigation.navigate("CreatePassword",{name:this.state.name,email:this.state.email});
                    });
                }).catch((error)=>{
                    if(this.spinnerCancelled)
                        return;
                    SpinnerContainer.instance.hideSpinner(()=>{
                        this.setState({errorMessage:error});
                    });
                });
            },
            (response)=>{
                SpinnerContainer.instance.hideSpinner(()=>{
                    this.setState({errorMessage:response});
                });
                
            }
        );
    }

    _checkEmailIsValid(){
        var email = this.state.email;
        var domainPart = email.split('@')[1];
        var baseDomain = domainPart.split('.')[0];
        return new Promise((resolve,reject)=>{
            return Firebase.getInstance().validateEmail({emailDomain:baseDomain}).then((response)=>{
                if(response.data && response.data.statusCode && response.data.statusCode === 200){
                    return resolve();
                }
                else if(response.data && response.data.statusCode && response.data.statusCode === 400)
                    return reject(response.data.error)
                else
                    return reject("")
            }).catch((error)=>{
                return reject(error.error);
            });
        });
    }

    _onSubmit(e:any){
        this._createEmailComplete();
    }

    _createEmailComplete(){
        if(this.state.email ==""){
            this.setState({errorMessage:texts.createEmailScreen.emptyMailError});
            return;
        }
        else if(this._validateEmail()){
            // TODO: Check if user is email valid.
            this._checkIsUserLoggedAlready();
        }
    }

    _primaryPress(event:GestureResponderEvent){
        this._createEmailComplete();
    }

    _secondaryPress(event:GestureResponderEvent){
        this.props.navigation.navigate('Email');
    }

    _eulaClick(event:GestureResponderEvent){
        WebModalContainer.instance.openModal(texts.createEmailScreen.privacyLink);
        SpinnerContainer.instance.showSpinner(()=>{
            WebModalContainer.instance.closeModal();
        });
    }

    render(){
        return(
            <GradientContainer>
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <TextBlock logo>{texts.logo}</TextBlock>
                    </View>
                    <View style={styles.titleContainer}>
                        <TextBlock big bold>
                            {this.state.name} {texts.createEmailScreen.welcome}
                        </TextBlock>
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
                            placeholder={texts.createEmailScreen.inputPlaceholder}
                        />
                    </View>
                    <KeyboardAvoidingView behavior='padding' style={{
                        flex:1,
                        alignItems:'stretch',
                        justifyContent:'flex-end'
                    }}>
                        <LinkButton title={texts.createEmailScreen.privacyLinkText} onPress={this._eulaClick}></LinkButton>
                        <View style={{paddingVertical:16}}>
                            <PrimaryButton title={texts.createEmailScreen.buttons.primary} onPress={this._primaryPress}/>
                        </View>
                    </KeyboardAvoidingView>
                    <Hr title={texts.createEmailScreen.seperator}></Hr>
                    <SecondaryButton title={texts.createEmailScreen.buttons.secondary} onPress={this._secondaryPress}></SecondaryButton>
                </View>
            </GradientContainer>
        );
    }
}