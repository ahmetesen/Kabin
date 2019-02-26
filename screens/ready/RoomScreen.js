import React from 'react';
import {View, KeyboardAvoidingView, Platform} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Firebase from '../../core/Firebase';
import UsersManager from '../../core/UsersManager';
import SpinnerContainer from '../../components/views/SpinnerContainer';
export default class RoomScreen extends React.Component {
    static navigationOptions = ({navigation})=>({
        title: `${navigation.state.params.title}`
    });
    _initialState={
        loading:true,
        messages:{}
    }

    _roomData = undefined;
    _currentUser = 0;
    constructor(props){
        super(props);
        this.state = this._initialState;
        this.sendPressed = this.sendPressed.bind(this);
        this.messageIncoming = this.messageIncoming.bind(this);
        this._currentUser = Firebase.getInstance().auth.currentUser.uid;
    }

    _messages = [];

    componentWillMount(){
        this._roomData = this.props.navigation.getParam('room',undefined);
        if(this._roomData){
            SpinnerContainer.getInstance().showSpinner();
            Firebase.getInstance().getAllMessagesOfTheRoom(this._roomData).then((messages)=>{
                var promises = [];
                messages.forEach((message)=>{
                    promises.push(this._createMessageItem(message,messages.indexOf(message)));
                });
                Promise.all(promises).then(()=>{
                    SpinnerContainer.getInstance().hideSpinner(()=>{
                        this._messages.sort(function(a, b) {
                            return b._id - a._id;
                        });
                        this.setState({
                            loading:false,
                            messages:this._messages.slice(0)
                        });
    
                    });
                })
            }).catch((error)=>{
                SpinnerContainer.getInstance().hideSpinner(()=>{
                    console.log(error);
                });
            });
            Firebase.getInstance().startListenRoom(this._roomData,this.messageIncoming);
        }
    }

    _firstChildAttempt = true;

    messageIncoming(key,message){
        if(this._firstChildAttempt){
            this._firstChildAttempt = false;
            return;
        }
        return this._createMessageItem(message,key).then(()=>{

            this.setState((previousState) => {
                return {
                    loading:false,
                    messages: GiftedChat.append(previousState.messages, {
                        _id: this._messages[this._messages.length-1]._id,
                        text: this._messages[this._messages.length-1].text,
                        createdAt: this._messages[this._messages.length-1].messageDate,
                        system:this._messages[this._messages.length-1].system,
                        user: this._messages[this._messages.length-1].user
                    }),
                };
            });
        })
    }

    componentWillUnmount(){
        Firebase.getInstance().stopListenRoom(this._roomData);
        Firebase.getInstance().currentUserSeesAllMessage(this._roomData);
    }

    _createMessageItem(value,key){
        return new Promise((resolve,reject)=>{
            return UsersManager.instance.getUserName(value.sender).then((name)=>{
                var sysId = 0;
                if(this._roomData == "0")
                    sysId = -1;

                this._messages.push({
                    _id:key,
                    text:value.message,
                    createdAt:new Date(value.messageDate),
                    system: (value.sender==sysId)?true:false,
                    user:{
                        name: name,
                        _id:value.sender
                    },
                });

                return resolve();
            }).catch((error)=>{
                return reject(error);
            })
        })
    }

    sendPressed(messages){
        var message = messages[0].text;
        Firebase.getInstance().sendMessage(this._roomData,message);
    }

    render(){
        if(this.state.loading)
            return null;
        else{
            //this._messages.sort(function(a, b) {
                //return b._id - a._id;
            //});
            return(
                <View style={{marginBottom:20, flex:1}}>
                <GiftedChat 
                    onSend={this.sendPressed}
                    messages={this.state.messages}
                    user={{_id:this._currentUser}}
                />
                <KeyboardAvoidingView behavior={ Platform.OS === 'android' ? 'padding' :  null} keyboardVerticalOffset={80} />
                </View>
            )
        }
    }
}