import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import DatePicker from 'react-native-datepicker';
import TabNavContainer from '../../components/views/TabNavContainer';
import TextBlock from '../../components/texts/TextBlock';
import { tabHeaderStyle } from '../../components/styles/global';
import TextBox from '../../components/texts/TextBox';
import { PrimaryButton } from '../../components/buttons';
import {getCurrentDay,getNextYear} from '../../helpers/DateHelper'
import Firebase from '../../core/Firebase';

const currentDate = getCurrentDay();
const maxDate = getNextYear();
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
    }

    _primaryPressed(event){
        Firebase.getInstance().addRoom("13-01-2019","TK1",(data)=>{
            console.log(data)
        },
        (fail)=>{
            console.log(fail)
        });
    }

    _onFlightCodeTextChange(value){
        this.setState({flightCode:value.toUpperCase()});
    }

    _onSubmit(event){
        this.secondTextInput.focus();
    }

    render(){
        return(
            <KeyboardAvoidingView style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <TextBlock dark>Eklemek istediğin uçuşun kodunu ve tarih bilgilerini girer misin?</TextBlock>
                <View style={{width:196}}>
                    <TextBox dark
                        maxLength={7}
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
                    placeholder="Tarih seç"
                    format="DD-MM-YYYY"
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