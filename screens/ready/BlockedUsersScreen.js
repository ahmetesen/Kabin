
import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Firebase from '../../core/Firebase';
import SpinnerContainer from '../../components/views/SpinnerContainer';
import UsersManager from '../../core/UsersManager';
import ListItem from '../../components/views/ListItem';
import TextBlock from '../../components/texts/TextBlock';
export default class BlockedUsersScreen extends React.Component {
    static navigationOptions = {
        headerTitleStyle: {fontWeight:'200',fontFamily:'nunito-semibold',},
        title: `Engelli Kullanıcılar`
    };

    constructor(props){
        super(props);
        this._blockedList = [];
        this._onIconPress = this._onIconPress.bind(this);
        this._onNamePress = this._onNamePress.bind(this);
    }

    componentWillMount(){
        
    }

    componentDidMount(){
        var rawList = UsersManager.instance.blockedUsers;
        this._blockedList = [];
        for (var key in rawList) {
            if(rawList[key]==true){
                UsersManager.instance.getUserName(key).then((user)=>{
                    this._blockedList.push({id:user.newKey,displayName:user.displayName});
                    this.setState({blockedList:this._blockedList});
                }).catch((error)=>{
                    //TODO: log these errors if happens
                });
            }
        }
    }
    
    unblockPress(targetId){
        SpinnerContainer.getInstance().showSpinner();
        Firebase.getInstance().unblockSelectedUser(targetId).then(()=>{
            UsersManager.instance.removeFromBlockedList(targetId);
            this._blockedList = this._blockedList.filter((user)=>user.id != targetId);
            this.setState({blockedList:this._blockedList});
            SpinnerContainer.getInstance().hideSpinner(null);
        }).catch(
        ()=>{
            SpinnerContainer.getInstance().hideSpinner(null);
        });
    }

    _onNamePress(id){
        
    }

    _onIconPress(id){
        this.unblockPress(id);
    }

    render() {
        var listItems = [];

        this._blockedList.forEach((item)=>{
            listItems.push(<ListItem namePress={this._onNamePress} iconPress={this._onIconPress} key={listItems.length} id={item.id} displayName={item.displayName}/>)
        })
        return(
            <ScrollView style={StyleSheet.mainContainer}>
                {listItems.length>0?listItems:(
                    <View style={{flex:1, paddingTop:24, alignItems:'center'}}>
                        <TextBlock low dark>Kimseyi engellemedin.</TextBlock>
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
