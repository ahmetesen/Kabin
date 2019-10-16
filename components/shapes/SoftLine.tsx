import React from 'react';
import {View, StyleSheet} from 'react-native';

interface Props{
    topSpace?:number;
}
interface State{

}
export default class SoftLine extends React.Component<Props,State>{
    constructor(props:Props){
        super(props);
    }

    render(){
        let topSpace=0;
        if(this.props.topSpace)
            topSpace = this.props.topSpace;
        return(
            <View
                style={{
                    paddingTop:topSpace,
                    borderBottomColor: '#878787',
                    borderBottomWidth: .3,
                }}
            />
        )
    }
}