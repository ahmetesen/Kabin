import React from 'react';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import TextBlock from '../components/texts/TextBlock';
import CarouselContainer from '../components/views/CarouselContainer' ;
import { StyleSheet, View } from 'react-native';
import GradientContainer from '../components/views/GradientContainer';
import {MaterialCommunityIcons,FontAwesome} from '@expo/vector-icons'
export default class LandingScreen extends React.Component{
    constructor(props){
        super(props);
        this._secondaryPress = this._secondaryPress.bind(this);
        this._primaryPress = this._primaryPress.bind(this);
    }

    _primaryPress(event){
        this.props.navigation.navigate('Name');
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
                    <View style={styles.carouselContainer}>
                        <CarouselContainer entries={entries} />
                    </View>
                    <View style={styles.footerContainer}>
                        <PrimaryButton onPress={this._primaryPress} title="Hadi Başlayalım"></PrimaryButton>
                        <SecondaryButton onPress={this._secondaryPress} title="Giriş Yap"></SecondaryButton>
                    </View>
                </View>
            </GradientContainer>
        );
    }
}

const entries=[
    {
        title:'Ekibini Bul', 
        description:'Sıradaki uçuş arkadaşlarını bul ve onlarla konuş.',
        icon: <MaterialCommunityIcons name="account-search" size={96} color='#283AD8' />
    },
    {
        title: 'Destinasyonunu Gör',
        description:'Destinasyonun hakkında bilgi al, yapılan yorumları gör.',
        icon: <FontAwesome name="paper-plane" size={96} color='#283AD8' />
    },
    {
        title: 'Geçmiş Uçuşlar',
        description:'Hem kendinin, hem arkadaşlarının geçmiş uçuşlarını gör.',
        icon: <FontAwesome name="history" size={96} color='#283AD8' />
    }
];

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    logoContainer:{
        height:100,
        justifyContent:'flex-end'
    },
    carouselContainer:{
        flex:1,
        justifyContent:'center'
    },
    footerContainer: {
        height:160,
        justifyContent:'flex-start'
    }
});