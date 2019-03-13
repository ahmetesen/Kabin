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
        title: `Hakkımda`
    };

    constructor(props){
        super(props);
        this._primaryPress = this._primaryPress.bind(this);
        this._onAboutTextChange = this._onAboutTextChange.bind(this);
        this.state={initialText:Firebase.getInstance().activeUser.about};

    }



    componentWillMount(){
        this.changeAboutFunction = this.props.navigation.getParam('callBack',undefined);
    }
    
    _primaryPress(event){
        var callback = this.changeAboutFunction;
        SpinnerContainer.getInstance().showSpinner();
        Firebase.getInstance().saveAboutText(this.state.initialText).then((data)=>{
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
        var length = value.split("\n").length;
        if(length>4)
            return;
        this.setState({initialText:value});
    }

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
        * content, we just wanted to give you a quick view of your config */
        return(
            <ScrollView style={StyleSheet.mainContainer}>
                <View style={styles.userContainer}>
                    <View style={styles.titleContainer}>
                        <TextBlock big bold blue>
                            {Firebase.getInstance().auth.currentUser.displayName}
                        </TextBlock>
                    </View>
                    <View style={styles.itemContainer}>
                        <View style={{flex:.9}}>
                            <TextBlock dark bold>
                                Hakkımda
                            </TextBlock>
                        </View>
                    </View>
                    <View>
                        <TextBox autoFocus={true} maxLength={255} textAlignVertical='top' multiline={true} dark value={this.state.initialText} onChangeText={this._onAboutTextChange}></TextBox>
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
