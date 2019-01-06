import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import TextBlock from '../../../components/texts/TextBlock';
import GradientContainer from '../../../components/views/GradientContainer';
import SpinnerContainer from '../../../components/views/SpinnerContainer';
import TextBox from '../../../components/texts/TextBox';
import Hr from '../../../components/shapes/Hr';
import SecondaryButton from '../../../components/buttons/SecondaryButton';
import {styles} from './style';
import Firebase from '../../../core/Firebase';
import { StackActions, NavigationActions } from 'react-navigation';
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
    }
    componentWillMount(){
        name = this.props.navigation.getParam('name','Misafir');
        email = this.props.navigation.getParam('email','ahmetesen88@gmail.com');
        this.setState({name:name, email:email});
    }
    _onPasswordTextChange(value){
        this.setState({password:value});
        if(this.state.password.length<5)
            this.setState({errorMessage:"En az altı karakter belirlemen gerekir."});
        else
            this.setState({errorMessage:""});

    }
    _signUserUp(){
        this.spinner.showSpinner();
        Firebase.getInstance().createUserWithEmailAndPassword(this.state.name,this.state.email,this.state.password,
            ()=>{
                
                this.spinner.hideSpinner(()=>{
                    const resetAction = StackActions.reset({
                        index: 1,
                        actions: [
                            NavigationActions.navigate({
                                routeName:'Landing'
                            }),
                            NavigationActions.navigate({
                                routeName: 'Activation', 
                                params:{name:this.state.name,email:this.state.email} 
                            })
                        ]
                    });
                    this.props.navigation.dispatch(resetAction);
                    //this.props.navigation.navigate("Activation",{name:this.state.name,email:this.state.email});
                });
            },
            (response)=>{
                this.spinner.hideSpinner(()=>{
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
            this._signUserUp();
    }
    _secondaryPress(event){
        this.props.navigation.navigate('Email');
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
                            <TextBlock big>{this.state.name},{'\n'}şimdi bir şifre belirleyelim.</TextBlock>
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
                                placeholder='Bir şifre belirle.'
                            />
                        </View>
                        <View style={styles.infoContainer}>
                            <TextBlock small>Şifreni belirledikten sonra sana bir eposta göndereceğiz. Üyeliğini tamamlamak için epostadaki linke tıklaman gerekiyor.</TextBlock>
                        </View>
                    </KeyboardAvoidingView>
                    <View style={styles.footerContainer}>
                        <Hr title="Zaten üye misin?"></Hr>
                        <SecondaryButton title="Giriş Yap" onPress={this._secondaryPress}></SecondaryButton>
                    </View>
                </View>
                <SpinnerContainer ref={ref=>this.spinner = ref}></SpinnerContainer>
            </GradientContainer>
        );
    }
}