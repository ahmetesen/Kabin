import React from 'react';
import {View, DatePickerIOS} from 'react-native';
import DatePicker from 'react-native-datepicker'
export default class PlaygroundContainer extends React.Component{
    constructor(props){
        super(props);
        this.dateChange = this.dateChange.bind();
        this._root={};
    }

    componentDidMount(){
        var k = this._root;
        this._root.onDatePicked((data)=>{
            var l = data;
        });
        this._root.onPressDate();
    }

    dateChange(date){
        console.log(date);
        var t = this._root;
        this._root.onPressDate();
    }

    modalClose(param){
        var s = param;
    }

    render(){
        var m = this._root;
        return(
            <View style={{flex:1,backgroundColor:'red', justifyContent:'center'}}>
                <DatePicker onCloseModal={this.modalClose} ref={(component) => { this._root = component; }} mode='date' locale="tr-TR" date={new Date()} onDateChange={this.dateChange}>
                </DatePicker>
            </View>
        )
    }
}