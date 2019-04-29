import React from 'react';
import {View, Image, ScrollView, Platform, Linking, Share} from 'react-native';
import SpinnerContainer from '../../components/views/SpinnerContainer';
import Firebase from '../../core/Firebase';
import TextBlock from '../../components/texts/TextBlock';
import { PrimaryButton } from '../../components/buttons';
export default class AdScreen extends React.Component {
    
    static navigationOptions = ({navigation})=>({
        headerTitleStyle: {fontWeight:'200',fontFamily:'nunito-semibold',fontSize:22},
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
        this._imageLoaded = this._imageLoaded.bind(this);
        this._primaryPressed = this._primaryPressed.bind(this);
    }

    componentWillMount(){
        SpinnerContainer.getInstance().showSpinner();
        var adId = this.props.navigation.getParam('id',undefined);
        Firebase.getInstance().getActiveAdDetails(adId).then((ad)=>{
            this.setState({...ad, loaded:true, adId:adId});
        }).catch((error)=>{

        });
    }

    _imageLoaded(event){
    }

    _imageLoadEnd(event){
        SpinnerContainer.getInstance().hideSpinner(null);
    }

    _imageLoadStart(event){
    }

    async _primaryPressed(event){
        Firebase.getInstance().setAdClick(this.state.adId);
        target = Platform.OS==='ios'?this.state.iOSClick:this.state.androidClick;
        if(this.state.type === 'share'){
            Share.share({
                message:
                  target
            });
        }
        else{
            Linking.openURL(target);
        }
    }

    render(){
        if(!this.state.loaded)
            return null;
        else{
            let btnTitle="";
            btnTitle = Platform.OS === 'ios' ? this.state.iOSButtonTitle : this.state.androidButtonTitle;
            return (
                <View style={{flex:1, justifyContent:'flex-start', alignItems:'stretch'}}>
                    <Image onLoadStart={this._imageLoadStart} onLoadEnd={this._imageLoadEnd} onLoad={this._imageLoaded} source={{uri: this.state.image}} style={{resizeMode:"cover", flex:.3}} />
                    <View style={{alignItems:'stretch', padding:16, flex:.7, }}>
                        <View style={{alignItems:'stretch', flex:.1, paddingTop:8}}>
                            <TextBlock big blue bold>{this.state.title}</TextBlock>
                        </View>
                        <ScrollView alwaysBounceVertical='false' bounces='true' style={{flex:.7}}>
                            <TextBlock text dark>{this.state.description}</TextBlock>
                        </ScrollView>
                        <View style={{flex:.2}}>
                            <PrimaryButton onPress={this._primaryPressed} title={btnTitle} />
                        </View>
                    </View>
                </View>
            )
        }
    }
}