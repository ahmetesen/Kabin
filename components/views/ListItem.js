import React from 'react';
import {ScrollView, StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import SoftLine from '../shapes/SoftLine';
import TextBlock from '../texts/TextBlock';
export default class ListItem extends React.Component{
    constructor(props){
        super(props);
        this._iconPress = this._iconPress.bind(this);
        this._namePress = this._namePress.bind(this);
    }

    _iconPress(event){
        if(this.props.iconPress)
            this.props.iconPress(this.props.id);
    }

    _namePress(event){
        if(this.props.namePress)
            this.props.namePress(this.props.id);
    }

    render(){
        return (
            <View id={this.props.id?this.props.id:""} onPress={this.unblockPress} style={{alignItems:'stretch', flex:1}}>
                <View style={styles.itemContainer}>
                    <View style={{flex:0.9}}>
                        <TouchableWithoutFeedback onPress={this._namePress}>
                            <TextBlock dark bold>
                                {this.props.displayName?this.props.displayName:""}
                            </TextBlock>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.arrowView} >
                        <TouchableWithoutFeedback onPress={this._iconPress}>
                            {this.props.icon?this.props.icon:(<Ionicons name="ios-close" size={48} color='#878787' />)}
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <SoftLine topSpace={12} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    containerStyle:{
        padding:0,
        paddingBottom:24
    },
    itemContainer:{
        alignItems:'center',
        flexDirection: 'row',
        flex:1,
        paddingTop:12,
        paddingHorizontal:24,
    },
    arrowView:{
        flex:.1,
        justifyContent:'center',
        alignItems:'flex-end',
        minHeight:40
    },
})