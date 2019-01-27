import React from 'react';
import {View, Alert, ScrollView} from 'react-native';
import TextBlock from '../../components/texts/TextBlock';
import {PrimaryButton} from '../../components/buttons'
import { Ionicons } from '@expo/vector-icons';
import {Profile} from '../../components/icons/icons';
import TabNavContainer from '../../components/views/TabNavContainer';
import SpinnerContainer from '../../components/views/SpinnerContainer';
import Firebase from '../../core/Firebase';
import RoomListView from '../../components/views/RoomListView';

export default class HomeScreen extends React.Component {
    _initialState = {
        user:null
    }
    static navigationOptions = ({navigation})=>{
        return{
            headerRight:(
                <Ionicons style={{marginRight:16}} onPress={navigation.getParam('_primaryPressed')} name="md-add" size={32} color='#283AD8' />
            ),
            
        }
    };
    constructor(props){
        super(props);
        this._primaryPressed = this._primaryPressed.bind(this);
        this.state = this._initialState;
    }

    componentWillMount(){
        this.props.navigation.setParams({ _primaryPressed: this._primaryPressed });
        this.getUserData();
    }

    getUserData(){
        SpinnerContainer.getInstance().showSpinner();
        Firebase.getInstance().getUser((user)=>{
            SpinnerContainer.getInstance().hideSpinner(()=>{
                Firebase.getInstance().activeUser = user;
                this.setState({user:user});
            });
        },
        (error)=>{
            SpinnerContainer.getInstance().hideSpinner();
            Alert.alert(
                'Bir hata oluştu :(',
                "İstersen uygulamayı kapatabilir ya da tekrar deneyebilirsin.\n\nHata detayı: "+error,
                [
                    {
                        text:'Tekrar dene', 
                        onPress:()=>{
                            this.getUserData();
                        }
                    }
                ],{
                    cancelable:false
                }
            );
        });
    }

    _primaryPressed(event){
        this.props.navigation.navigate('AddFlight');
    }

    render() {
        if(!this.state.user)
            return null;
        else{
            var chatRooms = this.state.user.rooms;
            const RoomsContainer = Object.keys(chatRooms).map(key =>{
                //message = chatRooms[key].lastMessage;
                return (<RoomListView key={key} title={key} lastMessage={chatRooms[key].lastMessage} timeStamp={chatRooms[key].timeStamp} isAlive={chatRooms[key].isAlive} mustShown={chatRooms[key].mustShown} readYet={chatRooms[key].readYet} image={chatRooms[key].image} ></RoomListView>);
            });
            RoomsContainer.sort();
            return (
                <TabNavContainer style={{flex:1,backgroundColor:'#F9F9F9'}}>
                    <View style={{marginTop:4}}>
                        {RoomsContainer}
                    </View>
                    <View style={{marginTop:16,justifyContent:'center', alignItems:'center'}}>
                        <TextBlock dark>Bir sonraki uçuşunu ekle{'\n'}ve uçuş kabinine katıl...</TextBlock>
                        <PrimaryButton title="Uçuş Ekle" onPress={this._primaryPressed}/>
                    </View>
                </TabNavContainer>
            );
        }
    }
}