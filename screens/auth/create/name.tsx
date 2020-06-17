import React,{Component} from 'react';
import { View, TextInputSubmitEditingEventData, NativeSyntheticEvent, GestureResponderEvent} from 'react-native';
import GradientContainer from '../../../components/views/gradient-container';
import TextBox from '../../../components/texts/text-box';
import { PrimaryButton } from '../../../components/buttons';
import { DefaultNavigationProp } from '../../../constants/nav-params';
import { i18n } from '../../../constants/language';
import SeperatorWithButton from '../../../components/views/seperator-with-button';
import {styles} from '../styles';
type State={
    name:string;
    errorMessage:string;
}
type Props={
    navigation: DefaultNavigationProp;
}
export default class Name extends Component<Props,State>{
    state = {
        name:"",
        errorMessage:""
    }

    _onNameTextChange=(value:string)=>{
        if(value.length>46)
            return;
        this.setState({name:value});
        if(this.state.name =="")
            this.setState({errorMessage:""});
    }
    _onSubmit=(e:NativeSyntheticEvent<TextInputSubmitEditingEventData>)=>{
        this.nameComplete();
    }

    _primaryPress=(event:GestureResponderEvent)=>{
        this.nameComplete();
    }

    nameComplete(){
        if(this.state.name ==""){
            this.setState({errorMessage:i18n.t('name_error_message')});
            return;
        }
        else
            this.props.navigation.navigate("CreateEmail",{name:this.state.name});
    }

    _secondaryPress=(event:GestureResponderEvent)=>{
        this.props.navigation.navigate('Email');
    }

    _backPress=(event:GestureResponderEvent)=>{
        this.props.navigation.goBack();
    }

    render(){
        return(
            <GradientContainer needScroll={true} title={i18n.t('name_title')} backPress={this._backPress}>
                <View style={styles.textBoxContainer}>
                    <TextBox
                        onChangeText={this._onNameTextChange}
                        onSubmitEditing={this._onSubmit}
                        value={this.state.name}
                        errorMessage={this.state.errorMessage}
                        returnKeyType="next"
                        placeholder={i18n.t('name_inputplaceholder')}
                        textContentType="name"
                        autoCapitalize="words"
                    />
                </View>
                <View style={styles.footerContainer}>
                    <PrimaryButton onPress={this._primaryPress} title={i18n.t('buttons_continue')}></PrimaryButton>
                    <SeperatorWithButton 
                        seperatorText={i18n.t('seperator_alreadysigned')}
                        buttonText={i18n.t('buttons_login')}
                        clickAction={this._secondaryPress}
                    ></SeperatorWithButton>
                </View>
            </GradientContainer>
        );
    }
}