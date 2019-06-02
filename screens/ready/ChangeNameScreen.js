import React from 'react';
import { View, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TextBox from '../../components/texts/TextBox';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import Firebase from '../../core/Firebase';
import SpinnerContainer from '../../components/views/SpinnerContainer';
import TextBlock from '../../components/texts/TextBlock';
import SoftLine from '../../components/shapes/SoftLine';
import UsersManager from '../../core/UsersManager';
export default class EditAboutScreen extends React.Component {
    static navigationOptions = {
        headerTitleStyle: {fontWeight:'200',fontFamily:'nunito-semibold',fontSize:22},
        title: `Düzenle`
    };

    constructor(props){
        super(props);
        this._primaryPress = this._primaryPress.bind(this);
        this._onAboutTextChange = this._onAboutTextChange.bind(this);
        this.state={initialText:UsersManager.instance.me.displayName};

    }



    componentWillMount(){
        this.changeNameFunction = this.props.navigation.getParam('callBack',undefined);
    }
    
    _primaryPress(event){
        var callback = this.changeNameFunction;
        SpinnerContainer.getInstance().showSpinner();


        UsersManager.instance.setDisplayName(this.state.initialText).then((data)=>{
            SpinnerContainer.getInstance().hideSpinner(()=>{
                if(callback)
                    callback();
                this.props.navigation.goBack();
                
            }
        )}).catch(
        (error)=>{
            SpinnerContainer.getInstance().hideSpinner(null);
        });
    }

    newLineCounter=0;

    _onAboutTextChange(value){
        if(value.length>46)
            return;
        var length = value.split("\n").length;
        if(length>1)
            return;
        this.setState({initialText:value});
    }

    render() {
        return(
            <ScrollView style={StyleSheet.mainContainer}>
                <View style={styles.userContainer}>
                    <View>
                        <TextBox autoFocus={true} maxLength={255} textAlignVertical='top' dark value={this.state.initialText} onChangeText={this._onAboutTextChange}></TextBox>
                    </View>
                </View>
                <View style={{paddingTop:24 ,flex:1, justifyContent:'flex-end', alignItems:'center', paddingBottom:24}}>
                    <PrimaryButton title="Kaydet" onPress={this._primaryPress} />
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
        marginTop:24
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
