import React, {Component} from 'react';
import TextBlock from '../../components/texts/text-block';
import { GestureResponderEvent, View } from 'react-native';
import Auth from '../../core/firebase/auth';
import { setLoggedOut } from '../../store/login-slice';
import { connect } from 'react-redux';
import { DefaultNavigationProp } from '../../constants/nav-params';
import WhiteContainer from '../../components/views/white-container';
import FooterBar from '../../components/buttons/footer-bar';
import { PrimaryButton } from '../../components/buttons';

type Props = {
    setLoggedOut: typeof setLoggedOut;
    navigation: DefaultNavigationProp;
}

type State = {
}

const mapDispatchToProps = { setLoggedOut };

class SettingsComponent extends Component<Props,State> {

    _signoutPress = async (event: GestureResponderEvent) => {
        const result = await Auth.instance.logout();
        this.props.setLoggedOut();
    }

    _homePress = (event: GestureResponderEvent) => {
        this.props.navigation.replace("Home");
    }

    _profilePress = (event: GestureResponderEvent) => {
        this.props.navigation.replace("Profile");
    }

    async componentDidMount(){
    }

    render(){
        return(
            <View style={{flex:1}}>
                <WhiteContainer needScroll={false}>
                    <View style={{flex:1, justifyContent:'space-between'}}>
                        <TextBlock>{Auth.instance.currentUser?.displayName}</TextBlock>
                        <PrimaryButton onPress={this._signoutPress} title='Sign Out'/>
                    </View>
                </WhiteContainer>
                <FooterBar active='Settings' onHomePress={this._homePress} onProfilePress={this._profilePress}></FooterBar>
            </View>
        )
    }
}

const Settings = connect(null,mapDispatchToProps)(SettingsComponent);
export default Settings;