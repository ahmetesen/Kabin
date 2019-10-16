import React from 'react';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import TextBlock from '../components/texts/TextBlock';
import Hr from '../components/shapes/Hr';
import CarouselContainer from '../components/views/CarouselContainer' ;
import { StyleSheet, View, GestureResponderEvent,KeyboardAvoidingView } from 'react-native';
import { NavigationScreenProp, NavigationState, NavigationParams } from 'react-navigation';
import GradientContainer from '../components/views/GradientContainer';
import {texts} from '../constants/language';
interface Props{
    navigation: NavigationScreenProp<NavigationState, NavigationParams>;
}
interface State{

}
export default class LandingScreen extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);
        this._secondaryPress = this._secondaryPress.bind(this);
        this._primaryPress = this._primaryPress.bind(this);
    }

    _primaryPress(event:GestureResponderEvent){
        this.props.navigation.navigate('Name');
    }
    _secondaryPress(event:GestureResponderEvent){
        this.props.navigation.navigate('Email');
    }
    render(){
        return(
            <GradientContainer>
                <View style={style.container}>
                    <View style={style.logoContainer}>
                        <TextBlock logo>{texts.logo}</TextBlock>
                    </View>
                    <View style={style.carouselContainer}>
                        <CarouselContainer entries={texts.landing.rotators} />
                    </View>
                    <KeyboardAvoidingView behavior='padding' style={{
                        alignItems:'stretch',
                        justifyContent:'flex-end'
                    }}>
                        <View style={{marginBottom:16}}>
                            <PrimaryButton onPress={this._primaryPress} title={texts.landing.buttons.primary}></PrimaryButton>
                        </View>
                    </KeyboardAvoidingView>
                    <View>
                        <Hr title={texts.landing.seperator}></Hr>
                        <SecondaryButton onPress={this._secondaryPress} title={texts.landing.buttons.secondary}></SecondaryButton>
                    </View>
                </View>
            </GradientContainer>
        );
    }
}

const style = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'stretch',
    },
    logoContainer:{
        height:100,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    carouselContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    footerContainer: {
        height:120,
        justifyContent:'flex-start'
    }
});