import React, {Component} from 'react';
import TextBlock from '../../components/texts/text-block';
import { GestureResponderEvent, View } from 'react-native';
import Auth from '../../core/firebase/auth';
import { setLoggedOut } from '../../store/login-slice';
import { connect } from 'react-redux';
import { DefaultNavigationProp } from '../../constants/nav-params';
import FooterBar from '../../components/buttons/footer-bar';
import WhiteContainer from '../../components/views/white-container';

type Props = {
    setLoggedOut: typeof setLoggedOut;
    navigation: DefaultNavigationProp;
}

type State = {
}

const mapDispatchToProps = { setLoggedOut };

class HomeComponent extends Component<Props,State> {

    _settingsPress = (event: GestureResponderEvent) => {
        this.props.navigation.replace("Settings");
    }

    _profilePress = (event: GestureResponderEvent) => {
        this.props.navigation.replace("Profile");
    }

    render(){
        return(
            <View style={{flex:1}}>
                <WhiteContainer needScroll={false}>
                    <View style={{flex:1, justifyContent:'space-between'}}>
                        <TextBlock>{Auth.instance.currentUser?.displayName}</TextBlock>
                    </View>
                </WhiteContainer>
                <FooterBar active='Home' onProfilePress={this._profilePress} onSettingsPress={this._settingsPress}></FooterBar>
            </View>
        )
    }
}

const Home = connect(null,mapDispatchToProps)(HomeComponent);
export default Home;