import { Modal, View, StyleSheet } from 'react-native';
import SpinnerContainer from './spinner-container';
import { WebView } from 'react-native-webview';
import { AntDesign } from '@expo/vector-icons'; 
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import React, { Component } from 'react';

type State = {
    modalVisible:boolean;
    source:string;
};
type Props = {

};
export default class WebModalContainer extends Component<Props, State>{
    static _instance:WebModalContainer;
    static get instance():WebModalContainer{
        return WebModalContainer._instance;
    }
    state={
        modalVisible:false,
        source:""
    }

    componentDidMount(){
        WebModalContainer._instance = this;
    }

    _requestClose=()=>{
        this.closeModal();
    }

    setModalVisible = (visible:boolean) => {
        this.setState({modalVisible: visible});
    }

    closeModal = () => {
        this.setModalVisible(false);
    }

    openModal = (url:string) => {
        this.setState({
            source:url,
            modalVisible:true,
        });
        SpinnerContainer.instance.showSpinner(()=>{
            this.closeModal();
        });
    }

    _webviewLoaded=(event:any)=>{
        if(this.state.modalVisible)
            SpinnerContainer.instance.hideSpinner(null);
    }

    _closeClick=(event:any)=>{
        this.closeModal();
    }

    render() {
        if(this.state.modalVisible == false)
            return null;
        return(
            <Modal
                animationType="slide"
                visible={this.state.modalVisible}
                onRequestClose={this._requestClose}
                presentationStyle="pageSheet">
                <View style={styling.mainContainer}>
                    <WebView onLoad={this._webviewLoaded} source={{uri: this.state.source}}>

                    </WebView>
                    <View style={styling.closeButton}>
                        <TouchableWithoutFeedback onPress={this._closeClick}>
                            <AntDesign name="close" size={24} color="white" />
                        </TouchableWithoutFeedback>
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
        right:32,
        top:32
    }
});