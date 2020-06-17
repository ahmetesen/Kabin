import React, {Component} from 'react';
import GradientContainer from '../components/views/gradient-container';
import { DefaultNavigationProp } from '../constants/nav-params';
import { View, StyleSheet, GestureResponderEvent } from 'react-native';
import { i18n } from '../constants/language';
import ErrorManager from '../core/error-manager';
import CarouselContainer from '../components/views/carousel-container';
import { PrimaryButton } from '../components/buttons';
import {MaterialCommunityIcons,FontAwesome} from '@expo/vector-icons';
import ConnectionManager from '../core/connection-manager';
import SeperatorWithButton from '../components/views/seperator-with-button';

type Props = {
    navigation: DefaultNavigationProp;
}

type State = {
}


export default class PreLanding extends Component<Props,State> {
    
    componentDidMount(){
        
    }

    _primaryPress=(event:GestureResponderEvent)=>{
        const isConnected = ConnectionManager.instance.checkConnection();
        if(!isConnected)
            return;
        this.props.navigation.navigate('Name');
    }
    _secondaryPress=(event:GestureResponderEvent)=>{
        const isConnected = ConnectionManager.instance.checkConnection();
        if(!isConnected)
            return;
        this.props.navigation.navigate('Email');
    }

    sendEmail(){
        ErrorManager.instance.sendEmail(i18n.t('prelanding_email_bodypt1'),'Prelanding_showWarning');
    }

    render(){
        return(
            <GradientContainer needScroll={false}>
                <View style={styles.carouselContainer}>
                    <CarouselContainer entries={rotator}></CarouselContainer>
                </View>
                <View style={styles.footerContainer}>
                    <PrimaryButton onPress={this._primaryPress} title={i18n.t('start_button_primary')}></PrimaryButton>
                    <SeperatorWithButton 
                        seperatorText={i18n.t('seperator_alreadysigned')} 
                        buttonText={i18n.t('buttons_login')}
                        clickAction={this._secondaryPress}>
                    </SeperatorWithButton>
                </View>
            </GradientContainer>
        )
    }
}

const styles = StyleSheet.create({
    
    carouselContainer:{
        flex:1,
        justifyContent:'flex-start',
        alignItems:'stretch',
    },
    footerContainer: {
        marginTop:16
    }
});

const rotator=[
    {
        title:i18n.t('landing_rotators_first_title'),
        description:i18n.t('landing_rotators_first_description'),
        icon: <MaterialCommunityIcons name="account-search" size={96} color='#FFFFFF' />
    },
    {
        title:i18n.t('landing_rotators_second_title'),
        description:i18n.t('landing_rotators_second_description'),
        icon: <FontAwesome name="paper-plane" size={96} color='#FFFFFF' />
    },
    {
        title:i18n.t('landing_rotators_third_title'),
        description:i18n.t('landing_rotators_third_description'),
        icon: <FontAwesome name="history" size={96} color='#FFFFFF' />
    }
];