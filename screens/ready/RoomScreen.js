import React from 'react';
import {View, KeyboardAvoidingView, Platform, Clipboard} from 'react-native';
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
        this._longPress = this._longPress.bind(this);
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
        });
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

                if(value.hiddenFrom && value.hiddenFrom == this._currentUser)
                    return resolve();

                //TODO: user eğer chatteki son mesajı silerse, db'deki users/ altındaki ilgili chat odasının lastMessage property'sini de güncellemem gerekiyor.

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
    _longPress(context,message){
        var k = context;
        if (message.text) {
            const options = [
                'Kopyala',
                'Benden sil',
                'Şikayet et',
                'Kişiyi engelle',
                'İptal',
            ];
            const cancelButtonIndex = options.length - 1;
            context.actionSheet().showActionSheetWithOptions({
                options,
                cancelButtonIndex,
            },
            (buttonIndex) => {
                switch (buttonIndex) {
                    case 0:
                        Clipboard.setString(message.text);
                    break;
                    case 1:
                        this.deleteMessage(this._roomData,message._id);
                    break;
                    case 2:
                        this.reportMessageOrUser(this._roomData,message._id);
                    break;
                        
                }
            });
        }
    }

    reportMessageOrUser(roomName, messageId){
        SpinnerContainer.getInstance().showSpinner();
        Firebase.getInstance().reportUser(roomName,messageId).then(()=>{
            SpinnerContainer.getInstance().hideSpinner(null);
        }).catch((error)=>{
            //TODO: Handle this error
            SpinnerContainer.getInstance().hideSpinner(null);
        });
    }

    deleteMessage(roomId, messageId){
        SpinnerContainer.getInstance().showSpinner();
        Firebase.getInstance().deleteMessageFromList(roomId,messageId).then((data)=>{
            this.setState((previousState) =>{
                return {
                    loading:false, 
                    messages: previousState.messages.filter(message => message._id !== messageId) 
                }
            });
            SpinnerContainer.getInstance().hideSpinner(null);
        }).catch((error)=>{

        })
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
                    renderUsernameOnMessage={true}
                    onLongPress={this._longPress}
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