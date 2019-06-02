import React from 'react';
import { View, ScrollView, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import Firebase from '../../core/Firebase';
import SpinnerContainer from '../../components/views/SpinnerContainer';
import WebModalContainer from '../../components/views/WebModalContainer';
import TextBlock from '../../components/texts/TextBlock';
import SoftLine from '../../components/shapes/SoftLine';
import UsersManager from '../../core/UsersManager';
export default class SettingsScreen extends React.Component {
    static navigationOptions = (navigation)=>({
        headerTitleStyle: {color:'#283AD8',fontWeight:'200',fontFamily:'nunito-semibold',fontSize:22},
        headerTitle:
            <View style={{flex:1, alignItems:'center'}}>
                <TextBlock big bold blue>
                    Ayarlar
                </TextBlock>
            </View>
    });

    constructor(props){
        super(props);
        this._primaryPress = this._primaryPress.bind(this);
        this.onBlockedUsersPress = this.onBlockedUsersPress.bind(this);
        this.goToAllFlights = this.goToAllFlights.bind(this);
        this.onPrivacyPress = this.onPrivacyPress.bind(this);
        this.state={
            about: Firebase.getInstance().activeUser.about
        }
    }

    componentWillMount(){

    }
    
    _primaryPress(event){
        SpinnerContainer.getInstance().showSpinner();
        Firebase.getInstance().logOut(()=>{
            SpinnerContainer.getInstance().hideSpinner(()=>{
                this.props.navigation.navigate('Landing');
            }
        )},
        ()=>{
            SpinnerContainer.getInstance().hideSpinner(null);
        });
    }

    onBlockedUsersPress(event){
        this.props.navigation.navigate('BlockedUsers');
    }

    goToAllFlights(event){
        this.props.navigation.navigate('AllFlights');
    }

    onPrivacyPress(event){
        WebModalContainer.getInstance().openModal('https://kabinapp.firebaseapp.com/gizlilik.html');
        SpinnerContainer.getInstance().showSpinner();
    }

    render() {
        //TODO: {Firebase.getInstance().auth.currentUser.displayName} bunu auth'tan değil, db'den oku.
        return(
            <ScrollView style={StyleSheet.mainContainer}>
                <View style={styles.userContainer}>
                    <TouchableWithoutFeedback onPress={this.goToAllFlights}>
                        <View style={styles.itemContainer}>
                            <TextBlock low style={{flex:.9}}>
                                Tüm Uçuşlarım
                            </TextBlock>
                            <View style={styles.arrowView}>
                                <Ionicons name="ios-arrow-forward" size={36} color='#878787' />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <SoftLine topSpace={12} />
                    <TouchableWithoutFeedback onPress={this.onBlockedUsersPress}>
                        <View style={styles.itemContainer}>
                            <TextBlock low style={{flex:.9}}>
                                Engellediğim Kullanıcılar 
                            </TextBlock>
                            <View style={styles.arrowView}>
                                <Ionicons name="ios-arrow-forward" size={36} color='#878787' />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <SoftLine topSpace={12} />

                    <TouchableWithoutFeedback onPress={this.onPrivacyPress}>
                        <View style={styles.itemContainer}>
                            <TextBlock low style={{flex:.9}}>
                                Kullanıcı sözleşmesi ve Gizlilik 
                            </TextBlock>
                            <View style={styles.arrowView}>
                                <Ionicons name="ios-arrow-forward" size={36} color='#878787' />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <SoftLine topSpace={12} />
                    <View style={styles.itemContainer}>
                        <TextBlock low style={{flex:.8}}>
                            Uygulama sürümü 
                        </TextBlock>
                        <View style={{...styles.arrowView,flex:.2}}>
                            <TextBlock dark>
                                1.4
                            </TextBlock>
                        </View>
                    </View>
                    <SoftLine topSpace={12} />
                    <View style={styles.itemContainer}>
                        <TextBlock low style={{flex:.8}}>
                            İçerik sürümü 
                        </TextBlock>
                        <View style={{...styles.arrowView,flex:.2}}>
                            <TextBlock dark>
                                14
                            </TextBlock>
                        </View>
                    </View>
                    <SoftLine topSpace={12} />
                </View>
                <View style={{paddingTop:24 ,flex:1, justifyContent:'flex-end', alignItems:'center', paddingBottom:24}}>
                    <PrimaryButton title="Çıkış Yap" onPress={this._primaryPress} />
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
