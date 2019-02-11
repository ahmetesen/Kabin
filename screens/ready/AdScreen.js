import React from 'react';
import {View} from 'react-native';
import SpinnerContainer from '../../components/views/SpinnerContainer';
import Firebase from '../../core/Firebase';
export default class AdScreen extends React.Component {
    
    static navigationOptions = ({navigation})=>({
        title: `${navigation.state.params.title}`
    });

    _initialState={
        loaded: false,
        title:'',
        description:'',
        imageUrl:'',
        buttonUrl:'',
        buttonTitle:'',
        adId:0
    }

    constructor(props){
        super(props);
        this.state = this._initialState;
    }

    componentWillMount(){
        SpinnerContainer.getInstance().showSpinner();
        var adId = this.props.navigation.getParam('id',undefined);
        Firebase.getInstance().getActiveAdDetails(adId).then((ad)=>{
            this.props.navigation.setParams({title: ad.title});
            this.setState(ad);
        }).catch((error)=>{

        });
    }

    render(){
        return null;
    }
}