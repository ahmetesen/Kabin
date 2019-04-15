import React from 'react';
import { View, Alert, KeyboardAvoidingView, Platform } from 'react-native';
import DatePicker from 'react-native-datepicker';
import TextBlock from '../../components/texts/TextBlock';
import { tabHeaderStyle } from '../../components/styles/global';
import TextBox from '../../components/texts/TextBox';
import { PrimaryButton } from '../../components/buttons';
import {getCurrentDay, getNextMonth} from '../../helpers/DateHelper'
import Firebase from '../../core/Firebase';
import SpinnerContainer from '../../components/views/SpinnerContainer';

const currentDate = getCurrentDay();
const maxDate = getNextMonth();
export default class AddFlightScreen extends React.Component{
    
    static navigationOptions={
        headerTitle:'Uçuş Ekle',
        headerTitleStyle: {fontWeight:'200',fontFamily:'nunito-semibold',}
    }

    isExclusive = false;
    airlineCode = "";

    constructor(props){
        super(props);

        this.airlineCode = this._getFirmCode(Firebase.getInstance().getActiveUserEmail());
        if(this.airlineCode != ""){
            this.isExclusive = true;
        }
        this.state = {date:currentDate, flightCode:this.airlineCode}
        this._primaryPressed = this._primaryPressed.bind(this);
        this._onFlightCodeTextChange = this._onFlightCodeTextChange.bind(this);
        this._onSubmit = this._onSubmit.bind(this);
    }

    _checkFirm(code){
        return false;
    }

    _firms = {
        "thy":"tk",
        "atlasglb":"KK",
        "onurair":"8Q",
        "sunexpress":"XQ",
        "flypgs":"PC",
        "gmail":"GM"
    };

    _getFirmCode(email){
        var code="";
        var splittedWithAt = email.split("@");
        if(splittedWithAt.length>0){
            var splittedWithDot = splittedWithAt[1].split(".");
            if(splittedWithDot.length>0)
                code = this._firms[splittedWithDot[0]];
        }
        return code;
    }

    _checkFlightCode(code){
        code = code.toUpperCase();
        var justCode = code.slice(2);
        var newCode = code[0]+code[1];
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

    componentWillMount(){
        
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
                "Eklemek istediğin uçuşun ilk iki karakteri şirketinin IATA kodu olmalı ve gerisi rakamlardan oluşmalı",
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
            <View style={{flex:1}}>
            <KeyboardAvoidingView behavior={ Platform.OS === 'android' ? 'padding' :  'padding'} style={{flex:1, justifyContent:'flex-start', alignItems:'center', padding:16}}>
                <TextBlock dark style={{padding:16}}>Eklemek istediğin uçuşun kodunu ve GMT cinsinden uçuş tarihini girer misin?</TextBlock>
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
                        style={{paddingVertical:24}}
                    />
                </View>
                <DatePicker
                    ref={(input) => { this.secondTextInput = input; }}
                    style={{width:200,paddingVertical:24}}
                    date={this.state.date}
                    showIcon={false}
                    mode="date"
                    locale="tr-TR"
                    placeholder="Tarih seç"
                    format="DD/MM/YYYY"
                    minDate={currentDate}
                    maxDate={maxDate}
                    confirmBtnText="Seç"
                    cancelBtnText="İptal"
                    customStyles={{
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
            </View>
        );
    }
}