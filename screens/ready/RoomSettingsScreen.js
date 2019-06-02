import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import Firebase from '../../core/Firebase';
import UsersManager from '../../core/UsersManager';
import SpinnerContainer from '../../components/views/SpinnerContainer';
import ListItem from '../../components/views/ListItem';
import TextBlock from '../../components/texts/TextBlock';
import SoftLine from '../../components/shapes/SoftLine'
export default class RoomScreen extends React.Component {
    static navigationOptions = ({navigation})=>({
        title: `${navigation.state.params.title}`,
        headerTitleStyle: {fontWeight:'200',fontFamily:'nunito-semibold',fontSize:22}
    });

    constructor(props){
        super(props);
        this._userList = [];
        this._onNamePress = this._onNamePress.bind(this);
    }

    componentWillMount(){
        
    }

    componentDidMount(){
        var rawList = [];
        var roomName = this.props.navigation.getParam('room',undefined);
        this._userList = [];
        SpinnerContainer.getInstance().showSpinner();
        Firebase.getInstance().getAllusersOfTheRoom(roomName).then((users)=>{
            SpinnerContainer.getInstance().hideSpinner(()=>{
                users.forEach((userId)=>{
                    if(userId == '0')
                        return;
                    UsersManager.instance.getUserName(userId).then((user)=>{
                        this._userList.push({id:user.newKey,displayName:user.displayName});
                        this.setState({userList:this._userList});
                    }).catch((error)=>{
                        //TODO: log these errors if happens
                    });
                });
            });
        }).catch((error)=>{
            //TODO: Handle Errors!
        });
    }

    _onNamePress(id,title){
        if(id === Firebase.getInstance().auth.currentUser.uid)
            return;
        this.props.navigation.navigate('Visitor',{id,title});
        //TODO: Go to profile when user click on the name.
    }

    render() {
        var listItems = [];

        this._userList.forEach((item)=>{
            listItems.push(<ListItem icon={(<TextBlock> </TextBlock>)} namePress={this._onNamePress} key={listItems.length} id={item.id} displayName={item.displayName}/>)
        })
        return(
            <ScrollView>
                <View style={styles.mainContainer}>
                    <TextBlock style={{marginTop:24,margin:12}} bold dark>Bu uçuştaki görevliler:</TextBlock>
                    <SoftLine></SoftLine>
                    {listItems.length>1?listItems:(
                        <View style={{flex:1, paddingTop:24, alignItems:'center'}}>
                            <TextBlock low dark>Henüz bu uçuşta senden başka kimse yok.</TextBlock>
                        </View>
                        )
                    }
                </View>
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