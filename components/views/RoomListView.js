import React from 'react';
import {View, StyleSheet, TouchableWithoutFeedback} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import TextBlock from '../texts/TextBlock';
import {msToDate} from '../../helpers/DateHelper';
import SoftLine from '../shapes/SoftLine';
import Swipeout from 'react-native-swipeout';
import SpinnerContainer from '../../components/views/SpinnerContainer';
import Dialog, {DialogContent, DialogTitle,DialogFooter,DialogButton} from 'react-native-popup-dialog';
import Firebase from '../../core/Firebase';


export default class RoomListView extends React.Component{

    _initialState={
        lastMessage:"",
        timeStamp:0,
        isAlive:false,
        mustShown:false,
        readYet:false,
        image:"",
        dialogVisible:false,
        dialogTitle:"",
        dialogText:""
    };

    archiveTitle="Arşivle";
    deleteTitle="Sil"
    archiveText = "numaralı uçuşu arşive almak istediğine emin misin? Arşivlediğin uçuşlar, Ayarlar > Tüm Uçuşlarım altında görünür.";
    deleteText = "numaralı uçuşla ilgili tüm kayıtlarını silmek istediğine emin misin? Bu işlemi bir daha geri alamazsın. Silmek yerine arşivlemeyi de düşünebilirsin.";
    swipeoutButtons = [
        {
            text:'Arşivle',
            backgroundColor:'#4071A5',
            onPress:()=>{
                this.setState({dialogVisible:true, dialogText:this.archiveText, dialogTitle:this.archiveTitle});
            }

        },{
            text:'Sil',
            onPress:()=>{
                this.setState({dialogVisible:true, dialogText:this.deleteText, dialogTitle:this.deleteTitle});
            },
            type:'delete'
        }
    ];

    constructor(props){
        super(props);
        this.state = this._initialState;
        this._onPress = this._onPress.bind(this);
    }

    _onPress(event){
        if(this.props.onItemPress)
            this.props.onItemPress(this.props.title);
    }

    render(){
        var title="";
        var bulkDate;
        var date = "Son mesaj: ";
        var disableSwipe = false;
        if(this.props.title == 'Z'){
            title = "Reklam";
            bulkDate = this.props.timeStamp;
            disableSwipe = true;
        }
        else if(this.props.title == 0){
            bulkDate = this.props.timeStamp;
            title = "Kabin İletişim";
            disableSwipe = true;
        }
        else{
            var data = this.props.title.split('+');
            bulkDate = data[0];
            title = data[1];
            date = "Uçuş tarihi: "
        }

        date += msToDate(bulkDate);

        return(
            <Swipeout autoClose={true} disabled={disableSwipe} style={styles.swipeoutStyle} left={this.swipeoutButtons} right={this.swipeoutButtons}>
                <View style={{flex:1}}>
                    <Dialog
                        width={.9}
                        dialogTitle={<DialogTitle title={this.state.dialogTitle} />}
                        onTouchOutside={()=>{this.setState({ dialogVisible: false });}}
                        visible={this.state.dialogVisible}
                        footer={
                        <DialogFooter>
                            <DialogButton
                            text="Tamam"
                            onPress={() => {
                                if(this.state.dialogTitle==this.archiveTitle){
                                    this.setState({ dialogVisible: false })
                                    SpinnerContainer.getInstance().showSpinner();
                                    Firebase.getInstance().archiveFlight(this.props.title).then(()=>{
                                        SpinnerContainer.getInstance().hideSpinner(null);
                                    }).catch((error)=>{
                                        SpinnerContainer.getInstance().hideSpinner(null);
                                        //TODO: Handle Error
                                    });
                                }
                                else if(this.state.dialogTitle==this.deleteTitle){
                                    this.setState({ dialogVisible: false })
                                    SpinnerContainer.getInstance().showSpinner();
                                    Firebase.getInstance().deleteFlight(this.props.title).then(()=>{
                                        SpinnerContainer.getInstance().hideSpinner(null);
                                    }).catch((error)=>{
                                        SpinnerContainer.getInstance().hideSpinner(null);
                                        //TODO: Handle Error
                                    });
                                }
                            }}
                            />
                            <DialogButton
                            text="İptal"
                            onPress={() => {this.setState({ dialogVisible: false });}}
                            />
                        </DialogFooter>
                        }
                    >
                        <DialogContent>
                            <TextBlock dark>{"\n"}{title} {this.state.dialogText}</TextBlock>
                        </DialogContent>
                    </Dialog>
                    <TouchableWithoutFeedback onPress={this._onPress} >
                        <View style={styles.containerView}>
                            <View style={styles.textView}>
                                <View style={{flex:.5, flexDirection:'row', justifyContent:'flex-end', alignItems:'stretch'}}>
                                    <View style={{flex:.5, justifyContent:'center', alignItems:'flex-start'}}>
                                        <TextBlock 
                                            blue={this.props.isAlive ? true : false}
                                            black={this.props.isAlive ? false : true}                                
                                            big
                                            bold
                                            numberOfLines={1} >{title}</TextBlock>
                                    </View>
                                    <View style={{ flex:.5, justifyContent:'center', alignItems:'flex-end'}}>
                                        <TextBlock low numberOfLines={0}>{date}</TextBlock>
                                    </View>
                                </View>
                                <View style={{flex:.5, justifyContent:'center'}}>
                                    <TextBlock style={{flex:.5}} low 
                                        black={this.props.readYet ? false:true}
                                        numberOfLines={1}>{this.props.lastMessage}</TextBlock>
                                </View>
                            </View>
                            <View style={styles.arrowView}>
                                <Ionicons name="ios-arrow-forward" size={32} color='#878787' />
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                    <SoftLine />
                </View>
            </Swipeout>
        );
    }
}

const styles = StyleSheet.create({
    containerView:{
        flex:1,
        height:86,
        paddingHorizontal:12,
        paddingVertical:10,

        flexDirection:'row'
    },
    swipeoutStyle:{
        backgroundColor:'transparent'
    },
    textView:{
        flex:.9,
        justifyContent:'flex-start',
        alignItems:'flex-start'
    },
    arrowView:{
        flex:.1,
        justifyContent:'center',
        alignItems:'flex-end'
    },
    roomName:{

    }
})