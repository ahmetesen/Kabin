import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TextBlock from '../texts/TextBlock';

export default class RoomListView extends React.Component{

    _initialState={
        lastMessage:"",
        timeStamp:0,
        isAlive:false,
        mustShown:false,
        readYet:false,
        image:"",
    };

    constructor(props){
        super(props);
        this.state = this._initialState;
        this._onPress = this._onPress.bind(this);
    }

    _onPress(event){
        if(this.props.onItemPress)
            this.props.onItemPress(this.props.title);
    }

    render(){
        // if(!this.props.mustShown)
        //     return null;
        var title="";
        if(this.props.title == 'Z')
            title = "Reklam";
        else if(this.props.title == 0)
            title = "Kabin İletişim"
        else{
            title = this.props.title.split('+')[1];
        }
        return(
            <View style={{flex:1}}>
                <TouchableWithoutFeedback onPress={this._onPress} >
                    <View style={styles.containerView}>
                        <View style={styles.textView}>
                            <View style={{flex:.5, flexDirection:'row', justifyContent:'flex-end', alignItems:'stretch'}}>
                                <View style={{flex:.5, justifyContent:'center', alignItems:'flex-start'}}>
                                    <TextBlock 
                                        blue={this.props.isAlive ? true : false}
                                        black={this.props.isAlive ? false : true}                                
                                        big
                                        bold
                                        numberOfLines={1} >{title}</TextBlock>
                                </View>
                                <View style={{ flex:.5, justifyContent:'center', alignItems:'flex-end'}}>
                                    <TextBlock low numberOfLines={0}>{this.props.timeStamp}</TextBlock>
                                </View>
                            </View>
                            <View style={{flex:.5, justifyContent:'center'}}>
                                <TextBlock style={{flex:.5}} low 
                                    black={this.props.readYet ? false:true}
                                    numberOfLines={1}>{this.props.lastMessage}</TextBlock>
                            </View>
                        </View>
                        <View style={styles.arrowView}>
                            <Ionicons name="ios-arrow-forward" size={36} color='#878787' />
                        </View>
                    </View>
                </TouchableWithoutFeedback>
                <View
                    style={{
                        borderBottomColor: '#878787',
                        borderBottomWidth: .5,
                    }}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    containerView:{
        flex:1,
        height:100,
        padding:12,
        flexDirection:'row'
    },
    textView:{
        flex:.9,
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    arrowView:{
        flex:.1,
        justifyContent:'center',
        alignItems:'flex-end'
    },
    roomName:{

    }
})