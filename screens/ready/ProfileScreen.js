import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import SpinnerContainer from '../../components/views/SpinnerContainer';
import {Avatar} from 'react-native-elements';
import TextBlock from '../../components/texts/TextBlock';
import {ImagePicker, Permissions} from 'expo';
import UsersManager from '../../core/UsersManager';
import LinkButton from '../../components/buttons/LinkButton';
import SoftLine from '../../components/shapes/SoftLine';

export default class ProfileScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        if(!state.params)
            state.params = {title:"Ben"};
        return {
            headerTitleStyle: {color:'#283AD8',fontWeight:'200',fontFamily:'nunito-semibold',fontSize:22},
            title: `${state.params.title}`,
            headerTitle:
                <View style={{flex:1, alignItems:'center'}}>
                    <TextBlock big bold blue>
                        {state.params.title}
                    </TextBlock>
                </View>
        };
    };
      
    changeTitle = (titleText) => {
        const {setParams} = this.props.navigation;
        setParams({ title: titleText });
    }

    _initialState={
        title:'',
        uri:'',
        displayName:'',
        about:'',
        shortenedName:'Ben',
        allFlights:null
    }

    constructor(props){
        super(props);
        this._initialState.shortenedName = this.shortenName();
        this.state = this._initialState;
        this._editAvatarButtonPress = this._editAvatarButtonPress.bind(this);
        this._changeNamePress = this._changeNamePress.bind(this);
        this.changeNameCallback = this.changeNameCallback.bind(this);
        this.changeTitle = this.changeTitle.bind(this);
        this._editAboutButtonPress = this._editAboutButtonPress.bind(this);
        this.changeAboutCallback = this.changeAboutCallback.bind(this);
    }

    shortenName(){
        var names = UsersManager.instance.me.displayName.split(' ');
        var name = 'Ben';
        if(names.length>1){
            name = names[0][0]+names[names.length-1][0];
        }
        else if(name.length>0){
            name = names[0][0]+names[0][1];
        }
        else{
            name = 'Ben';
        }
        return name;
    }

    totalFlightCount = 0;
    uniqueFlights = [];

    componentWillMount(){
        this.changeTitle(UsersManager.instance.me.displayName);
        UsersManager.instance.getMyAvatar().then((data)=>{
            var avatar = {
                uri:
                  data.avatar,
              };
            this.setState({
                uri:avatar
            });
        }).catch((error)=>{

        });

        var rawFlights = [];
        for (var key in UsersManager.instance.rooms) {
            if(key == 'Z' || key == 0)
                continue;
                rawFlights.push(key.split('+')[1]);
        }
        this.totalFlightCount = rawFlights.length;
        rawFlights.sort();

        for(var i = 0; i< rawFlights.length;i++){
            if(this.uniqueFlights.length>0 && this.uniqueFlights[this.uniqueFlights.length-1].code === rawFlights[i]){
                this.uniqueFlights[this.uniqueFlights.length-1].count++;
            }
            else{
                this.uniqueFlights.push({
                    code:rawFlights[i],
                    count:1
                });
            }
        }
    }

    async _editAvatarButtonPress(event){
        const { status: existingStatus } = await Permissions.getAsync(
            Permissions.CAMERA_ROLL
        );
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
            const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            finalStatus = status;
        }
        if (finalStatus !== 'granted') {
            return;
        }
        SpinnerContainer.getInstance().showSpinner();
        
        var result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes:'Images',
            allowsEditing:true,
            aspect:[1,1],
            base64:true,
        });

        if(result && result.cancelled === false){
            
            const blob = await new Promise((resolve, reject) => {
                const xhr = new XMLHttpRequest();
                xhr.onload = function() {
                  resolve(xhr.response);
                };
                xhr.onerror = function(e) {
                  console.log(e);
                  reject(new TypeError('Network request failed'));
                };
                xhr.responseType = 'blob';
                xhr.open('GET', result.uri, true);
                xhr.send(null);
            });


            UsersManager.instance.setMyAvatar(blob).then(()=>{
                SpinnerContainer.getInstance().hideSpinner(()=>{
                    blob.close();
                    var uri = {
                        uri:
                          result.uri,
                      };
                    this.setState({
                        uri:uri
                    });
                });
            }).catch((error)=>{
                SpinnerContainer.getInstance().hideSpinner();
            });
            
        }
        else{
            SpinnerContainer.getInstance().hideSpinner();
        }
    }

    _changeNamePress(event){
        this.props.navigation.navigate('ChangeName', {callBack:this.changeNameCallback});
    }

    _editAboutButtonPress(event){
        this.props.navigation.navigate('EditAbout', {callBack:this.changeAboutCallback});
    }
    
    changeAboutCallback(){
        this.setState({
            about: UsersManager.instance.me.about
        });
    }
    
    changeNameCallback(){
        this.changeTitle(UsersManager.instance.me.displayName);
        this.setState({
            displayName: UsersManager.instance.me.displayName,
            shortenedName:this.shortenName()
        });
    }

    render() {
        var _avatar = this.state.uri===''?(<Avatar onEditPress={this._editAvatarButtonPress} size='xlarge' title={this.state.shortenedName} showEditButton={true} rounded />)
        :(<Avatar onEditPress={this._editAvatarButtonPress} size='xlarge' source={this.state.uri} showEditButton={true} rounded />);
        var keyCounter = 0;
        var flightItems = this.uniqueFlights.map((item)=>{
            keyCounter++;
            var text = item.code;

            if(item.count>1)
                text += " ("+item.count+" kez)";
            return(<TextBlock key={keyCounter} black bold style={{marginTop:12, marginLeft:0}}>{text}</TextBlock>);

            
        })
        return(
            <ScrollView>
                <View style={{flex:1,alignItems:'stretch', justifyContent:'flex-start', paddingTop:8}}>
                    <View style={{alignItems:'center', marginTop:12}}>
                        {_avatar}
                    </View>
                    <TouchableOpacity onPress={this._editAboutButtonPress}>
                        <View style={{marginTop:24, marginLeft:12}}>
                            <TextBlock blue bold alignContent='center'>
                                Hakkımda
                            </TextBlock>
                            <TextBlock low style={{marginTop:12}}>
                                {UsersManager.instance.me.about}
                            </TextBlock>
                        </View>
                    </TouchableOpacity>
                    <View style={{marginTop:16, marginLeft:12, marginBottom:12}}>
                        <TextBlock blue bold alignContent='center'>
                            Katıldığım Tüm Uçuşlar
                        </TextBlock>
                        <TextBlock low style={{marginTop:12}}>Bugüne kadar toplam {this.totalFlightCount} uçuşa katıldın:</TextBlock>
                        {flightItems}
                    </View>
                    <View style={{justifyContent:'flex-start',alignItems:'flex-start', marginLeft:12, marginTop:8}}>
                        <TouchableOpacity onPress={this._changeNamePress}>
                            <TextBlock low>Adımı Değiştirmek İstiyorum</TextBlock>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        );
    }
}
