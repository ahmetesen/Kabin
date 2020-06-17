
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

class VisitorComponent extends Component<Props,State> {

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
                <PrimaryButton title='Visitor' onPress={this._signoutPress}></PrimaryButton>
            </GradientContainer>
        )
    }
}

const Visitor = connect(null,mapDispatchToProps)(VisitorComponent);
export default Visitor;