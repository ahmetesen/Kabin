import React from 'react';
import { View } from 'react-native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import Firebase from '../../core/Firebase';
import SpinnerContainer from '../../components/views/SpinnerContainer';
import { StackActions, NavigationActions } from 'react-navigation';
import { Feather } from '@expo/vector-icons';


export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        
      };

    constructor(props){
        super(props);
        this._primaryPress = this._primaryPress.bind(this);
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
    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
        * content, we just wanted to give you a quick view of your config */
        return(
            <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                <PrimaryButton title="Çıkış Yap" onPress={this._primaryPress} />
            </View>
        );
    }
}
