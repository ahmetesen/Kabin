import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import TextBlock from '../../../components/texts/TextBlock';
import GradientContainer from '../../../components/views/GradientContainer';
import TextBox from '../../../components/texts/TextBox';
import Hr from '../../../components/shapes/Hr';
import SecondaryButton from '../../../components/buttons/SecondaryButton';
import {styles} from './style';
import { PrimaryButton } from '../../../components/buttons';
export default class NameScreen extends React.Component{
    _initialState={
        name:'',
        errorMessage:''
    }
    constructor(props){
        super(props);
        this.state = this._initialState;
        this._onNameTextChange = this._onNameTextChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._primaryPress = this._primaryPress.bind(this);
        this._secondaryPress = this._secondaryPress.bind(this);
    }
    _onNameTextChange(value){
        if(value.length>46)
            return;
        this.setState({name:value});
        if(this.state.name =="")
            this.setState({errorMessage:""});
    }
    _onSubmit(e){
        this.nameComplete();
    }

    _primaryPress(event){
        this.nameComplete();
    }

    nameComplete(){
        if(this.state.name ==""){
            return;
        }
        else
            this.props.navigation.navigate("CreateEmail",{name:this.state.name});
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
                            <TextBlock big>
                                Merhaba, sana nasıl hitap edelim?
                            </TextBlock>
                        </View>
                        <View style={styles.textBoxContainer}>
                            <TextBox
                                onChangeText={this._onNameTextChange}
                                onSubmitEditing={this._onSubmit}
                                value={this.state.name}
                                errorMessage={this.state.errorMessage}
                                returnKeyType="next"
                                autoFocus={true}
                                shake={true}
                                placeholder='Adın ve soyadın nedir?'

                            />
                        </View>
                    </KeyboardAvoidingView>
                    <View style={styles.infoContainer}>
                        <PrimaryButton title=" Devam " onPress={this._primaryPress}/>
                    </View>
                    <View style={styles.footerContainer}>
                        <Hr title="Zaten üye misin?"></Hr>
                        <SecondaryButton title="Giriş Yap" onPress={this._secondaryPress}></SecondaryButton>
                    </View>
                </View>
            </GradientContainer>
        );
    }
}