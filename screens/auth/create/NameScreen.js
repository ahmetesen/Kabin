import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import TextBlock from '../../../components/texts/TextBlock';
import GradientContainer from '../../../components/views/GradientContainer';
import TextBox from '../../../components/texts/TextBox';
import Hr from '../../../components/shapes/Hr';
import SecondaryButton from '../../../components/buttons/SecondaryButton';
import {styles} from './style';
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
        this._secondaryPress = this._secondaryPress.bind(this);
    }
    _onNameTextChange(value){
        this.setState({name:value});
        if(this.state.name =="")
            this.setState({errorMessage:""});

    }
    _onSubmit(e){
        if(this.state.name ==""){
            //this.setState({errorMessage:"Bir adın olmalı?"});
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
                        <View style={styles.infoContainer}>

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