import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    View,
} from 'react-native';
import TextBlock from '../../components/texts/TextBlock';
import SpinnerContainer from '../../components/views/SpinnerContainer';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Home',
    };

    render() {
        return (
            <View style={{flex:1, justifyContent:'flex-start', alignItems:'center'}}>
                <View style={{ height:100, justifyContent:'flex-end', alignItems:'center' }} >
                    <TextBlock blue logo>Kabin</TextBlock>
                </View>
            </View>
        );
    }
}