
import GradientContainer from '../../components/views/gradient-container';
import React, {Component} from 'react';
import TextBlock from '../../components/texts/text-block';
import { PrimaryButton } from '../../components/buttons';
import { GestureResponderEvent } from 'react-native';
import Auth from '../../core/firebase/auth';
import { setLoggedOut } from '../../store/login-slice';
import { connect } from 'react-redux';
import { DefaultNavigationProp } from '../../constants/nav-params';

type Props = {
    setLoggedOut: typeof setLoggedOut;
    navigation: DefaultNavigationProp;
}

type State = {
}

const mapDispatchToProps = { setLoggedOut };

class RoomComponent extends Component<Props,State> {

    _signoutPress = async (event: GestureResponderEvent) => {
        const result = await Auth.instance.logout();
        this.props.setLoggedOut();
    }

    async componentDidMount(){
    }

    render(){
        return(
            <GradientContainer needScroll={false}>
                <TextBlock>{Auth.instance.currentUser?.displayName}</TextBlock>
                <PrimaryButton title='Sign Out' onPress={this._signoutPress}></PrimaryButton>
            </GradientContainer>
        )
    }
}

const Room = connect(null,mapDispatchToProps)(RoomComponent);
export default Room;