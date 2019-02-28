import React, {Component} from 'react';
import { Modal, View, WebView, StyleSheet } from 'react-native';
import SpinnerContainer from './SpinnerContainer';
import { LinkButton } from '../buttons';

export default class WebModalContainer extends Component {
    static INSTANTIATED = false;
    static _modalContainerInstance;
    
    static getInstance(){
        if(_modalContainerInstance)
            return _modalContainerInstance;
    }

    constructor(props){
        if(!WebModalContainer.INSTANTIATED){
            super(props);
            WebModalContainer.INSTANTIATED=true;
            _modalContainerInstance = this;
            this.state = this._initialState;
            this._webviewLoaded = this._webviewLoaded.bind(this);
            this._closeClick = this._closeClick.bind(this);
        }
        else
            throw new Error("You cannot create second instance of Push Sheet!");
    }

    _initialState={
        modalVisible:false,
        source:null
    }

    setModalVisible(visible) {
        this.setState({modalVisible: visible});
    }

    closeModal(){
        this.setModalVisible(false);
    }

    openModal(source){
        this.setState({
            source:source,
            modalVisible:true,
        });
    }

    _webviewLoaded(event){
        SpinnerContainer.getInstance().hideSpinner(null);
    }

    _closeClick(event){
        this.closeModal();
    }

    render() {
        if(this.state.modalVisible == false)
            return null;
        return(
            <Modal
                transparent
                animationType="slide"
                visible={this.state.modalVisible}
                presentationStyle="overFullScreen">
                <View style={styling.mainContainer}>
                    <WebView onLoad={this._webviewLoaded} style={styling.webViewContainer} source={{uri: this.state.source}}>

                    </WebView>
                    <View  style={styling.closeButton}>
                        <LinkButton title="Kapat" onPress={this._closeClick}></LinkButton>
                    </View>
                </View>
            </Modal>
        );
    }
}

const styling = StyleSheet.create({
    mainContainer:{
        flex:1
    },
    closeButton:{
        position:'absolute',
        right:40,
        top:40
    }
});