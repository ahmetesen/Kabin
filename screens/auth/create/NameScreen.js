import React from 'react';
import { StyleSheet, View } from 'react-native';
import TextBlock from '../../../components/texts/TextBlock';
import GradientContainer from '../../../components/views/GradientContainer';
import TextBox from '../../../components/texts/TextBox';
export default class NameScreen extends React.Component{
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
                    <View style={styles.inputContainer}>
                        <TextBox
                            shake={true}
                            placeholder='Eposta adresin nedir?'
                        />
                    </View>
                    <View style={styles.footerContainer}>
                    </View>
                </View>
            </GradientContainer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'stretch'
    },
    logoContainer:{
        flex:.4,
        justifyContent:'center',
        alignItems:'center'
    },
    inputContainer:{
        flex:.2,
        alignItems:'stretch'
    },
    footerContainer: {
        flex: .4,
        justifyContent:'center',
        alignItems:'center'
    }
});