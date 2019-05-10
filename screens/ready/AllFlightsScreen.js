import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Firebase from '../../core/Firebase';
import SpinnerContainer from '../../components/views/SpinnerContainer';
import UsersManager from '../../core/UsersManager';
import TextBlock from '../../components/texts/TextBlock';
import { msToDate } from '../../helpers/DateHelper';
import FlightItem from '../../components/views/FlightItem';
export default class AllFlightsScreen extends React.Component {
    static navigationOptions = {
        headerTitleStyle: {fontWeight:'200',fontFamily:'nunito-semibold',fontSize:22},
        title: `Tüm Uçuşlarım`
    };

    constructor(props){
        super(props);
        this._flightList = [];
        this._onIconPress = this._onIconPress.bind(this);
        this._onNamePress = this._onNamePress.bind(this);
    }

    componentWillMount(){
        var rawList = UsersManager.instance.rooms;
        for (var key in rawList) {
            if(rawList[key].deleted || key == 'Z' || key == 0)
                continue;
            rawList[key].key = key;
            rawList[key].name = key.split('+')[1];
            if(rawList[key].archived)
                rawList[key].name += " (Arşivlendi)";
            rawList[key].date = key.split('+')[0];
            if(rawList[key].date.length==8){
                var year = rawList[key].date.substr(0,4);
                var month = rawList[key].date.substr(4,2);
                var day = rawList[key].date.substr(6,2);
                rawList[key].formattedDate = day+"."+month+"."+year;
            }
            else{
                rawList[key].formattedDate = msToDate(rawList[key].date);
            }
            
            this._flightList.push(rawList[key]);
        }
        this._flightList.reverse();
    }

    componentDidMount(){
        
    }

    _onNamePress(id){
        
    }

    _onIconPress(id){
        SpinnerContainer.getInstance().showSpinner();
        Firebase.getInstance().dearchiveFlight(id).then(()=>{
            var obj = this._flightList.find(function(item){
                return item.key === id;
            });
            obj.archived = false;
            obj.name = id.split('+')[1];
            this.forceUpdate();
            SpinnerContainer.getInstance().hideSpinner(null);
        }).catch((error)=>{
            SpinnerContainer.getInstance().hideSpinner(null);
            //TODO: Handle Error
        });
    }

    render() {
        var listItems = [];
        this._flightList.forEach((item)=>{
            listItems.push(<FlightItem
                namePress={this._onNamePress} 
                iconPress={this._onIconPress}
                key={listItems.length} 
                id={item.key} displayName={item.name} archived={item.archived} formattedDate={item.formattedDate}/>)
        })
        return(
            <ScrollView style={StyleSheet.mainContainer}>
                {listItems.length>0?listItems:(
                    <View style={{flex:1, paddingTop:24, alignItems:'center'}}>
                        <TextBlock low dark>Henüz hiç uçuş eklemedin.</TextBlock>
                    </View>
                    )
                }
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    mainContainer:{
        justifyContent:'flex-start',
        alignItems:'stretch',
    },
    userContainer:{
        alignItems:'stretch',
        
    },
    titleContainer:{
        alignItems:'flex-start',
        paddingTop:16,
        paddingHorizontal:12
    },
    itemContainer:{
        alignItems:'center',
        flexDirection: 'row',
        flex:1,
        paddingTop:12,
        paddingHorizontal:12
    },
    arrowView:{
        flex:.1,
        justifyContent:'center',
        alignItems:'flex-end',
        minHeight:40
    },
});
