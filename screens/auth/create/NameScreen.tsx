import React from 'react';
import { View, KeyboardAvoidingView, TextInputSubmitEditingEventData, NativeSyntheticEvent, GestureResponderEvent } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import TextBlock from '../../../components/texts/TextBlock';
import GradientContainer from '../../../components/views/GradientContainer';
import TextBox from '../../../components/texts/TextBox';
import Hr from '../../../components/shapes/Hr';
import SecondaryButton from '../../../components/buttons/SecondaryButton';
import {styles} from './style';
import { PrimaryButton } from '../../../components/buttons';
import { texts } from '../../../constants/language';
interface State{
    name:string;
    errorMessage:string;
}
interface Props{
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
export default class NameScreen extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);
        this.state = {
            name:"",
            errorMessage:""
        };
        this._onNameTextChange = this._onNameTextChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
        this._primaryPress = this._primaryPress.bind(this);
        this._secondaryPress = this._secondaryPress.bind(this);
    }
    _onNameTextChange(value:string){
        if(value.length>46)
            return;
        this.setState({name:value});
        if(this.state.name =="")
            this.setState({errorMessage:""});
    }
    _onSubmit(e:NativeSyntheticEvent<TextInputSubmitEditingEventData>){
        this.nameComplete();
    }

    _primaryPress(event:GestureResponderEvent){
        this.nameComplete();
    }

    nameComplete(){
        if(this.state.name ==""){
            return;
        }
        else
            this.props.navigation.navigate("CreateEmail",{name:this.state.name});
    }

    _secondaryPress(event:GestureResponderEvent){
        this.props.navigation.navigate('Email');
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
                            {texts.nameScreen.title}
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
                            placeholder={texts.nameScreen.inputPlaceholder}
                        />
                    </View>
                    <KeyboardAvoidingView behavior='padding' style={{
                        flex:1,
                        alignItems:'stretch',
                        justifyContent:'flex-end'
                    }}>
                        <View style={{marginBottom:16}}>
                            <PrimaryButton onPress={this._primaryPress} title={texts.nameScreen.buttons.primary}></PrimaryButton>
                        </View>
                    </KeyboardAvoidingView>
                    <Hr title={texts.nameScreen.seperator}></Hr>
                    <SecondaryButton onPress={this._secondaryPress} title={texts.nameScreen.buttons.secondary}></SecondaryButton>
                </View>
            </GradientContainer>
        );
    }
}