import React, {Component, EventHandler } from 'react';
import {GestureResponderEvent, View, StyleSheet} from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons'; 
import { primaryColor } from '../styles/global';

type Props = {
    onHomePress?:EventHandler<GestureResponderEvent>;
    onProfilePress?:EventHandler<GestureResponderEvent>;
    onSettingsPress?:EventHandler<GestureResponderEvent>;
    active:"Home" | "Profile" | "Settings";
}

export default class FooterBar extends Component<Props>{
    _profilePress = (event: GestureResponderEvent) => {
        if(this.props.onProfilePress)
            this.props.onProfilePress(event);
    }

    _settingsPress = (event: GestureResponderEvent) => {
        if(this.props.onSettingsPress)
            this.props.onSettingsPress(event);
    }

    _homePress = (event: GestureResponderEvent) => {
        if(this.props.onHomePress)
            this.props.onHomePress(event);
    }
    
    render(){
        const iconSize = 28;
        const baseColor= '#333333';
        return(
            <View style={style.container}>
                <View style={style.bar}>
                    <TouchableWithoutFeedback onPress={this._profilePress}>
                        <FontAwesome name="user-o" size={iconSize} color={(this.props.active==='Profile')?primaryColor:baseColor} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={style.bar}>
                    <TouchableWithoutFeedback onPress={this._homePress}>
                        <Ionicons name="ios-chatbubbles" size={iconSize} color={(this.props.active==='Home')?primaryColor:baseColor} />
                    </TouchableWithoutFeedback>
                </View>
                <View style={style.bar}>
                    <TouchableWithoutFeedback onPress={this._settingsPress}>
                        <Feather name="settings" size={iconSize} color={(this.props.active==='Settings')?primaryColor:baseColor} />
                    </TouchableWithoutFeedback>
                </View>
            </View>
        );
    }
}

const style = StyleSheet.create({
    container:{
        flexDirection:'row',
        height:80,
        paddingBottom:20,
        paddingTop:0,
        backgroundColor:'#FFFFFF'
    },
    bar:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    }
})