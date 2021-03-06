import React from 'react';
import {View, KeyboardAvoidingView, Platform, Clipboard,TouchableOpacity} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
import Firebase from '../../core/Firebase';
import UsersManager from '../../core/UsersManager';
import SpinnerContainer from '../../components/views/SpinnerContainer';
import TextBlock from '../../components/texts/TextBlock';
export default class RoomScreen extends React.Component {
    static navigationOptions = ({navigation})=>({
        title: `${navigation.state.params.title}`,
        headerTitle:<TouchableOpacity onPress={(evt)=>{
            navigation.navigate('RoomSettings',{title:navigation.state.params.title,room:navigation.state.params.room});
        }}>
            <TextBlock big bold blue>
                {navigation.state.params.title}
            </TextBlock>
        </TouchableOpacity>
        ,
        headerTitleStyle: {fontWeight:'200',fontFamily:'nunito-semibold',fontSize:22}
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
        this.avatarPressed = this.avatarPressed.bind(this);
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
                        user: this._messages[this._messages.length-1].user,
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
            return UsersManager.instance.getUserName(value.sender).then((user)=>{
                var sysId = 0;
                if(this._roomData == "0")
                    sysId = -1;

                if(value.hiddenFrom){
                    for(subKey in value.hiddenFrom){
                        if(value.hiddenFrom[subKey]==this._currentUser){
                            return resolve();
                        }
                        else
                            continue;
                    }
                }

                if(UsersManager.instance.checkIfBlocked(value.sender))
                    return resolve();
                //TODO: user eğer chatteki son mesajı silerse, db'deki users/ altındaki ilgili chat odasının lastMessage property'sini de güncellemem gerekiyor.

                UsersManager.instance.getAvatar(value.sender).then((data)=>{
                    this._messages.push({
                        _id:key,
                        text:value.message,
                        createdAt:new Date(value.messageDate),
                        system: (value.sender==sysId)?true:false,
                        user:{
                            name: user.displayName,
                            _id:value.sender,
                            avatar:data.avatar
                        },
                    });
                    return resolve();
                }).catch((error)=>{
                    this._messages.push({
                        _id:key,
                        text:value.message,
                        createdAt:new Date(value.messageDate),
                        system: (value.sender==sysId)?true:false,
                        user:{
                            name: user.displayName,
                            _id:value.sender
                        },
                    });
                    return resolve();
                });
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
            let options = [];
            if(message.user._id == this._currentUser)
                options = [
                    'Kopyala',
                    'Benden sil',
                    'İptal',
                ];
            else
                options = [
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
                        if(message.user._id == this._currentUser)
                            break;
                        else
                            this.reportMessageOrUser(this._roomData,message._id);
                    break;
                    case 3:
                        this.blockUser(message.user._id);
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
            SpinnerContainer.getInstance().hideSpinner(null);
            //TODO
        });
    }

    blockUser(targetId){
        SpinnerContainer.getInstance().showSpinner();
        Firebase.getInstance().blockSelectedUser(targetId).then(()=>{
            SpinnerContainer.getInstance().hideSpinner(null);
            UsersManager.instance.pushToBlockedList(targetId, true);

            this.setState((previousState) =>{
                return {
                    loading:false, 
                    messages: previousState.messages.filter(message => {
                        return !UsersManager.instance.checkIfBlocked(message.user._id)
                    }) 
                }
            });


        }).catch((error)=>{
            //TODO
            SpinnerContainer.getInstance().hideSpinner(null);
        });
    }

    avatarPressed(user){
        if(user._id === "0" || user._id === 0)
            return;
        this.props.navigation.navigate('Visitor',{id:user._id,title:user.name});
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
                        onPressAvatar={this.avatarPressed}
                        placeholder="Mesaj yaz..."
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