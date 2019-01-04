import React from 'react';
import PrimaryButton from '../components/buttons/PrimaryButton';
import SecondaryButton from '../components/buttons/SecondaryButton';
import TextBlock from '../components/texts/TextBlock';
import CarouselContainer from '../components/views/CarouselContainer' ;
import { StyleSheet, View, Text } from 'react-native';
import GradientContainer from '../components/views/GradientContainer';
export default class LandingScreen extends React.Component{
    constructor(props){
        super(props);
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
                    <View style={styles.buttonContainer}>
                        <PrimaryButton title="Hadi Başlayalım"></PrimaryButton>
                        <SecondaryButton title="Giriş Yap"></SecondaryButton>
                    </View>
                </View>
            </GradientContainer>
        );
    }
}

const entries=[
    {
        title:'Ekibini Bul', 
        description:'Sıradaki uçuş arkadaşlarını bul ve onlarla konuş.'
    },
    {
        title: 'Destinasyonunu Gör',
        description:'Destinasyonun hakkında bilgi al, yapılan yorumları gör.'
    },
    {
        title: 'Geçmiş Uçuşlar',
        description:'Hem kendinin, hem arkadaşlarının geçmiş uçuşlarını gör.'
    }
];

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'center'
    },
    logoContainer:{
        flex:.4,
        justifyContent:'center'
    },
    carouselContainer:{
        flex:.2,
        justifyContent:'flex-end'
    },
    buttonContainer: {
        flex: .4,
        justifyContent:'center'
    }
});