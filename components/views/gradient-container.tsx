import React, { EventHandler, Component } from 'react';
import {StyleSheet, View, GestureResponderEvent, EmitterSubscription, Keyboard, Platform, KeyboardEventName } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {containerGlobalStyle} from './container-styles';
import { i18n } from '../../constants/language';
import TextBlock from '../texts/text-block';
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableWithoutFeedback, ScrollView } from 'react-native-gesture-handler';

type Props = {
    backPress?:EventHandler<GestureResponderEvent>,
    title?:string,
    needScroll:boolean,
}

type State = {
    keyboardOpens:boolean,
    enableScroll:boolean
}

export default class GradientContainer extends Component<Props, State>{
    state = {
        keyboardOpens: false,
        enableScroll:false
    }

    _keyboarDidHideListener: EmitterSubscription | undefined;
    _keyboarWillShowListener: EmitterSubscription | undefined;

    

    componentDidMount(){
        let showEvent = 'keyboardWillShow' as KeyboardEventName;
        let hideEvent = 'keyboardWillHide'as KeyboardEventName;
        if(Platform.OS === "android"){
            showEvent = 'keyboardDidShow';
            hideEvent = 'keyboardDidHide';
        }
        this._keyboarWillShowListener = Keyboard.addListener(showEvent,this._keyboardWillShow);
        this._keyboarDidHideListener = Keyboard.addListener(hideEvent,this._keyboardDidHide);
    }

    componentWillUnmount(){
        this._keyboarWillShowListener?.remove();
        this._keyboarDidHideListener?.remove();
    }

    _keyboardWillShow = (e:KeyboardEvent) => {
        this.setState({keyboardOpens:true, enableScroll:true});
      }
    
      _keyboardDidHide = (e:KeyboardEvent) => {
        this.setState({keyboardOpens:false, enableScroll:false});
      }

    backPressed = (event: GestureResponderEvent) => {
        if (this.props.backPress)
            this.props.backPress(event);
    }

    backComponent = () => {
        if(this.props.backPress)
            return (
                <View style={styles.backStyle}>
                    <TouchableWithoutFeedback onPress={this.backPressed}>
                        <AntDesign name="arrowleft" size={28} color="white" />
                    </TouchableWithoutFeedback>
                </View>
            );
        else
            return undefined;
    }

    render(){
        return(
            <LinearGradient style={styles.linearGradient} start={[1,0]} end={[0,1]} colors={['#4DA6F8','#5263FC']} >
                <View style={styles.container}>
                    <View style={styles.logoContainer}>
                        <TextBlock logo>{i18n.t('logo')}</TextBlock>
                    </View>
                    {this.backComponent()}
                    {!this.state.keyboardOpens && this.props.title ?(
                        <View style={{marginBottom:8}}>
                            <TextBlock big bold>
                                {this.props.title}
                            </TextBlock>
                        </View>):undefined
                    }
                    {this.props.needScroll?(
                        <ScrollView keyboardShouldPersistTaps='handled' enabled={this.state.enableScroll}>
                            {this.props.children}
                        </ScrollView>
                    ):this.props.children
                    }
                </View>
                
            </LinearGradient>
        )
    }
}
const styles = StyleSheet.create({
    linearGradient:containerGlobalStyle,
    container: {
        flex:1,
        justifyContent: 'flex-start',
        alignItems:'stretch',
    },
    logoContainer:{
        alignItems:'center',
        marginBottom:24
    },
    backStyle:{
        position:'absolute',
        top:12
    }
})
