import React, { EventHandler, Component } from 'react';
import {StyleSheet, View, GestureResponderEvent, EmitterSubscription, Keyboard, Platform, KeyboardEventName, SafeAreaView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {containerGlobalStyle} from './container-styles';
import { i18n } from '../../constants/language';
import TextBlock from '../texts/text-block';
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';

type Props = {
    needScroll:boolean,
}
export default class WhiteContainer extends Component<Props>{

    render(){
        return(
            <SafeAreaView style={containerGlobalStyle}>
                {this.props.children}    
            </SafeAreaView>
        )
    }
}
