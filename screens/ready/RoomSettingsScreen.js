import React from 'react';
import {View} from 'react-native';
import Firebase from '../../core/Firebase';
import UsersManager from '../../core/UsersManager';
import SpinnerContainer from '../../components/views/SpinnerContainer';
export default class RoomScreen extends React.Component {
    static navigationOptions = ({navigation})=>({
        title: `${navigation.state.params.title}`
    });
    _initialState={
        loading:true,
        messages:{}
    }

    constructor(props){
        super(props);
        this.state = this._initialState;
    }

}