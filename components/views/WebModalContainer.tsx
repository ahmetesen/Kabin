import * as React from 'react';
import { Modal, View, WebView, StyleSheet } from 'react-native';
import SpinnerContainer from './SpinnerContainer';
import { LinkButton } from '../buttons';

interface State{
    modalVisible:boolean;
    source:string;
};
interface Props{

}
export default class WebModalContainer extends React.Component{
    static _instance:WebModalContainer;
    static get instance():WebModalContainer{
        return WebModalContainer._instance;
    }
    state={
        modalVisible:false,
        source:""
    }

    constructor(props:any){
        super(props);
        WebModalContainer._instance = this;
        this._webviewLoaded = this._webviewLoaded.bind(this);
        this._closeClick = this._closeClick.bind(this);
        this._requestClose = this._requestClose.bind(this);
    }

    _requestClose(){
        this.closeModal();
    }

    setModalVisible(visible:boolean) {
        this.setState({modalVisible: visible});
    }

    closeModal(){
        this.setModalVisible(false);
    }

    openModal(url:string){
        this.setState({
            source:url,
            modalVisible:true,
        });
    }

    _webviewLoaded(event:any){
        if(this.state.modalVisible)
            SpinnerContainer.instance.hideSpinner(null);
    }

    _closeClick(event:any){
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
                onRequestClose={this._requestClose}
                presentationStyle="fullScreen">
                <View style={styling.mainContainer}>
                    <WebView onLoad={this._webviewLoaded} source={{uri: this.state.source}}>

                    </WebView>
                    <View style={styling.closeButton}>
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