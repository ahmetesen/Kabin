import React from 'react';
import { View, Alert, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import TabNavContainer from '../../components/views/TabNavContainer';
import TextBlock from '../../components/texts/TextBlock';
import { tabHeaderStyle } from '../../components/styles/global';
import TextBox from '../../components/texts/TextBox';
import { PrimaryButton } from '../../components/buttons';
import {getCurrentDay,getNextYear, getNextMonth, tickToDate} from '../../helpers/DateHelper'
import Firebase from '../../core/Firebase';
import SpinnerContainer from '../../components/views/SpinnerContainer';

const currentDate = getCurrentDay();
const maxDate = getNextMonth();
export default class AddFlightScreen extends React.Component{
    
    static navigationOptions={
        headerTitle:'Uçuş Ekle',
        headerTitleStyle:{
            ...tabHeaderStyle
        }
    }

    constructor(props){
        super(props);
        this.state = {date:currentDate, flightCode:''}
        this._primaryPressed = this._primaryPressed.bind(this);
        this._onFlightCodeTextChange = this._onFlightCodeTextChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    _checkFlightCode(code){
        code = code.toUpperCase();
        if(!code.startsWith('TK'))
            return null;
        var justCode = code.slice(2);
        var newCode = "TK";
        checkAgain = true;
        for(var i = 0;i<justCode.length;i++){
            if(justCode[i] === '0' && checkAgain)
                continue;
            else if ('0123456789'.indexOf(justCode[i]) === -1)
                return null;
            else{
                checkAgain = false;
                newCode += justCode[i];
            }
        }

        return newCode;
    }


    _primaryPressed(event){
        var dateParts = this.state.date.split("/");
        var dateObject = new Date(dateParts[2], dateParts[1] - 1, +dateParts[0]);
        var timeStamp = dateObject.getTime();
        var flightCode = this._checkFlightCode(this.state.flightCode);
        if(flightCode)
        {
            SpinnerContainer.getInstance().showSpinner();
            Firebase.getInstance().addRoom(timeStamp,flightCode,(data)=>{
                SpinnerContainer.getInstance().hideSpinner(()=>{
                    if(data.status=200)
                        this.props.navigation.goBack();
                });
            },
            (error)=>{
                SpinnerContainer.getInstance().hideSpinner(()=>{
                    //TODO: Log Error And Send to Server
                });
            });
        }



        
        else{
            Alert.alert(
                'Bilgi',
                "Eklemek istediğin uçuşun kodu TK ile başlamalı ve gerisi rakamlardan oluşmalı",
                [
                    {
                        text:'Tamam', 
                    }
                ],{
                    cancelable:true
                }
            );
        }
    }

    _onFlightCodeTextChange(value){
        this.setState({flightCode:value});
    }

    _onSubmit(event){
        this.secondTextInput.onPressDate();
    }

    render(){
        return(
            <KeyboardAvoidingView style={{flex:1, justifyContent:'center', alignItems:'center', padding:16}}>
                <TextBlock dark>Eklemek istediğin uçuşun kodunu ve tarih bilgilerini girer misin?</TextBlock>
                <View style={{width:196}}>
                    <TextBox dark
                        maxLength={6}
                        onChangeText={this._onFlightCodeTextChange}
                        onSubmitEditing={this._onSubmit}
                        value={this.state.flightCode}
                        errorMessage={this.state.errorMessage}
                        returnKeyType="next"
                        autoFocus={true}
                        shake={true}
                        placeholder='Uçuş Kodun Nedir?'
                        blurOnSubmit={false}
                    />
                </View>
                <DatePicker
                    ref={(input) => { this.secondTextInput = input; }}
                    style={{width:200}}
                    date={this.state.date}
                    mode="date"
                    locale="tr-TR"
                    placeholder="Tarih seç"
                    format="DD/MM/YYYY"
                    minDate={currentDate}
                    maxDate={maxDate}
                    confirmBtnText="Seç"
                    cancelBtnText="İptal"
                    customStyles={{
                    dateIcon: {
                        position: 'absolute',
                        left: 0,
                        top: 4,
                        marginLeft: 0
                    },
                    dateInput: {
                        marginLeft: 36
                    }
                    }}
                    onDateChange={(date) => {this.setState({date: date})}}
                    customStyles={{
                        dateText:{
                            fontFamily:'nunito',
                            fontSize:18
                        },
                        dateInput:{
                            border:0
                        }
                    }}
                />
                <PrimaryButton title="Uçuş Ekle" onPress={this._primaryPressed}></PrimaryButton>
            </KeyboardAvoidingView>
        );
    }
}