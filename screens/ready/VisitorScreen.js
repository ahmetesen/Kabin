import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import SpinnerContainer from '../../components/views/SpinnerContainer';
import {Avatar} from 'react-native-elements';
import TextBlock from '../../components/texts/TextBlock';
import UsersManager from '../../core/UsersManager';

export default class VisitorScreen extends React.Component {
    static navigationOptions = ({ navigation }) => {
        const {state} = navigation;
        if(!state.params)
            state.params = {title:"Ben"};
        return {
            headerTitleStyle: {color:'#283AD8',fontWeight:'200',fontFamily:'nunito-semibold',fontSize:22},
            title: `${state.params.title}`
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
        shortenedName:'ójò',
        id:'',
        allFlights:null
    }

    constructor(props){
        super(props);
        this.state = this._initialState;
    }

    shortenName(param){
        var names = param.split(' ');
        var name = this._initialState.shortenedName;
        if(names.length>1){
            name = names[0][0]+names[names.length-1][0];
        }
        else if(name.length>0){
            name = names[0][0]+names[0][1];
        }
        return name;
    }

    totalFlightCount = 0;
    totalTogetherFlightCount = 0;
    uniqueFlights = [];
    togetherFlights = [];

    _id="";

    async componentWillMount(){
        this._id = this.props.navigation.getParam('id',"");
        SpinnerContainer.getInstance().showSpinner();
        var result = await UsersManager.instance.getProfileDetails(this._id);
        SpinnerContainer.getInstance().hideSpinner();
        if(result && result.data && result.data.user){
            var displayName = result.data.user.displayName;
            var about = result.data.user.about;
            var rooms = result.data.user.rooms;
            
            var rawFlights = [];
            rooms.forEach((item)=>{
                if(UsersManager.instance.rooms[item])
                    this.togetherFlights.push(item);
                rawFlights.push(item.split('+')[1]);
            });
            this.totalTogetherFlightCount = this.togetherFlights.length;
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
            this.changeTitle(displayName);
            var shortName= this.shortenName(displayName);
            this.setState({
                displayName:displayName,
                about:about,
                shortenedName:shortName
            })
            UsersManager.instance.getAvatar(this._id).then((data)=>{
                var avatar = {
                    uri:
                    data.avatar,
                };
                this.setState({
                    uri:avatar
                });
            }).catch((error)=>{

            });
        }
    }

    render() {
        var _avatar = this.state.uri===''?(<Avatar size='xlarge' title={this.state.shortenedName} rounded />)
        :(<Avatar size='xlarge' source={this.state.uri} rounded />);
        var keyCounter = 0;
        var flightItems = this.uniqueFlights.map((item)=>{
            keyCounter++;
            var text = item.code;

            if(item.count>1)
                text += " ("+item.count+" kez)";
            return(<TextBlock key={keyCounter} black bold style={{marginTop:12, marginLeft:0}}>{text}</TextBlock>);

            
        });
        var togetherFlightItems = this.togetherFlights.map((item)=>{
            var items = "20190101+TK122";
            var splitted = item.split('+');
            var rawDate = splitted[0];
            var flightCode = splitted[1];
            var year = rawDate.substr(0,4);
            var month = rawDate.substr(4,2);
            var day = rawDate.substr(6,2);
            var text = flightCode+" - "+day+"/"+month+"/"+year;
            return(<TextBlock key={keyCounter} black bold style={{marginTop:12, marginLeft:0}}>{text}</TextBlock>);
        });
        return(
            <ScrollView>
                <View style={{flex:1,alignItems:'stretch', justifyContent:'flex-start', paddingTop:8, paddingRight:12}}>
                    <View style={{alignItems:'center', marginTop:12}}>
                        {_avatar}
                    </View>
                    <View style={{marginTop:24, marginLeft:12}}>
                        <TextBlock blue bold alignContent='center'>
                            Hakkında
                        </TextBlock>
                        <TextBlock low style={{marginTop:12}}>
                            {this.state.about}
                        </TextBlock>
                    </View>
                    <View style={{marginTop:20, marginLeft:12}}>
                        <TextBlock blue bold alignContent='center'>
                            Beraber Uçuşlarımız
                        </TextBlock>
                        <TextBlock low style={{marginTop:12}}>Bugüne kadar toplam {this.totalTogetherFlightCount} uçuşta birlikte görev aldık:</TextBlock>
                        {togetherFlightItems}
                    </View>
                    <View style={{marginTop:20, marginLeft:12}}>
                        <TextBlock blue bold alignContent='center'>
                            Katıldığı Tüm Uçuşlar
                        </TextBlock>
                        <TextBlock low style={{marginTop:12}}>{this.state.displayName} bugüne kadar toplam {this.totalFlightCount} uçuşa katıldı:</TextBlock>
                        {flightItems}
                    </View>
                </View>
            </ScrollView>
        );
    }
}
