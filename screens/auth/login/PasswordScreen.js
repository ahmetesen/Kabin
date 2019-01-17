import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import TextBlock from '../../../components/texts/TextBlock';
import GradientContainer from '../../../components/views/GradientContainer';
import SpinnerContainer from '../../../components/views/SpinnerContainer';
import TextBox from '../../../components/texts/TextBox';
import Hr from '../../../components/shapes/Hr';
import SecondaryButton from '../../../components/buttons/SecondaryButton';
import {styles} from '../create/style';
import Firebase from '../../../core/Firebase';
import LinkButton from '../../../components/buttons/LinkButton';
export default class CreatePasswordScreen extends React.Component{
    _initialState={
        name:'',
        email:'',
        password:'',
        errorMessage:''
    }
    constructor(props){
        super(props);
        this.state = this._initialState;
        this._onPasswordTextChange = this._onPasswordTextChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._secondaryPress = this._secondaryPress.bind(this);
        this._linkPress = this._linkPress.bind(this);
    }
    componentWillMount(){
        email = this.props.navigation.getParam('email','ahmetesen88@gmail.com');
        this.setState({email:email});
    }
    componentDidMount(){
    }
    _onPasswordTextChange(value){
        this.setState({password:value});
        if(value.length<6 && value.length>0)
            this.setState({errorMessage:"Şifren en az altı karakterden oluşuyor."});
        else
            this.setState({errorMessage:""});

    }
    _signUserIn(){
        SpinnerContainer.getInstance().showSpinner();
        Firebase.getInstance().signInWithEmailAndPassword(this.state.email,this.state.password,
            (user)=>{
                SpinnerContainer.getInstance().hideSpinner(()=>{
                    if(user.emailVerified)
                        this.props.navigation.navigate('Main');
                    else
                        this.props.navigation.navigate("Activation",{name:this.state.name,email:this.state.email});
                    console.log(user);
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
        if(this.state.password ==""){
            return;
        }
        else if(this.state.password.length>5)
            this._signUserIn();
    }
    _secondaryPress(event){
        this.props.navigation.navigate('Name');
    }
    _linkPress(event){
        SpinnerContainer.getInstance().showSpinner();
        Firebase.getInstance().passwordReset(this.state.email,()=>{
            this.setState({errorMessage:"Şifre sıfırlama epostası gönderildi."});
            SpinnerContainer.getInstance().hideSpinner();
        },(error)=>{
            SpinnerContainer.getInstance().hideSpinner(()=>{
                this.setState({errorMessage:error});
            });
        });
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
                            <TextBlock big>Şifreni girer misin?</TextBlock>
                        </View>
                        <View style={styles.textBoxContainer}>
                            <TextBox
                                onChangeText={this._onPasswordTextChange}
                                onSubmitEditing={this._onSubmit}
                                type='password'
                                value={this.state.password}
                                errorMessage={this.state.errorMessage}
                                returnKeyType="next"
                                autoFocus={true}
                                shake={true}
                                secureTextEntry={true}
                                placeholder='Şifren?'
                            />
                            <View style={{flexDirection:'row', justifyContent:'flex-start', alignItems:'center', marginLeft:8}}>
                                <TextBlock small>Hatırlamıyor musun?</TextBlock>
                                <LinkButton onPress={this._linkPress} title="Şifremi Unuttum"></LinkButton>
                            </View>
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