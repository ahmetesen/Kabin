import React from 'react';
import { View } from 'react-native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import Firebase from '../../core/Firebase';
import SpinnerContainer from '../../components/views/SpinnerContainer';
import { StackActions, NavigationActions } from 'react-navigation';

export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
    };

    constructor(props){
        super(props);
        this._primaryPress = this._primaryPress.bind(this);
    }

    _primaryPress(event){
        this.spinner.showSpinner();
        Firebase.getInstance().logOut(()=>{
            this.spinner.hideSpinner(()=>{
                this.props.navigation.navigate('Landing');
            }
        )},
        ()=>{
            this.spinner.hideSpinner(null);
        });
    }
    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
        * content, we just wanted to give you a quick view of your config */
        return(
            <View style={{flex:1, justifyContent:'flex-end', alignItems:'center'}}>
                <PrimaryButton title="Çıkış Yap" onPress={this._primaryPress} />
                <SpinnerContainer ref={ref=>this.spinner = ref}></SpinnerContainer>
            </View>
        );
    }
}
