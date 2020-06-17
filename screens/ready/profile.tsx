import GradientContainer from '../../components/views/gradient-container';
import React, {Component} from 'react';
import TextBlock from '../../components/texts/text-block';
import { PrimaryButton } from '../../components/buttons';
import { GestureResponderEvent, View } from 'react-native';
import Auth from '../../core/firebase/auth';
import { setLoggedOut } from '../../store/login-slice';
import { connect } from 'react-redux';
import { DefaultNavigationProp } from '../../constants/nav-params';
import WhiteContainer from '../../components/views/white-container';
import FooterBar from '../../components/buttons/footer-bar';

type Props = {
    setLoggedOut: typeof setLoggedOut;
    navigation: DefaultNavigationProp;
}

type State = {
}

const mapDispatchToProps = { setLoggedOut };

class ProfileComponent extends Component<Props,State> {

    _signoutPress = async (event: GestureResponderEvent) => {
        
    }

    _homePress = (event: GestureResponderEvent) => {
        this.props.navigation.replace("Home");
    }

    _settingsPress = (event: GestureResponderEvent) => {
        this.props.navigation.replace("Settings");
    }

    render(){
        return(
            <View style={{flex:1}}>
                <WhiteContainer needScroll={false}>
                    <View style={{flex:1, justifyContent:'space-between'}}>
                        <TextBlock>{Auth.instance.currentUser?.displayName}</TextBlock>
                    </View>
                </WhiteContainer>
                <FooterBar active='Profile' onHomePress={this._homePress} onSettingsPress={this._settingsPress} ></FooterBar>
            </View>
        )
    }
}

const Profile = connect(null,mapDispatchToProps)(ProfileComponent);
export default Profile;