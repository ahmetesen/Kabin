import React from 'react';
import {StyleSheet, View, TouchableWithoutFeedback} from 'react-native';
import SoftLine from '../shapes/SoftLine';
import TextBlock from '../texts/TextBlock';
export default class FlightItem extends React.Component{
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
                    <View>
                        <TouchableWithoutFeedback onPress={this._namePress}>
                            <View>
                                <TextBlock dark bold>
                                    {this.props.displayName?this.props.displayName:""}
                                </TextBlock>
                                <TextBlock dark low>
                                    Uçuş Tarihi: {this.props.formattedDate}
                                </TextBlock>
                            </View>
                            
                        </TouchableWithoutFeedback>
                    </View>
                    {this.props.archived?
                        <View style={styles.arrowView} >
                            <TouchableWithoutFeedback onPress={this._iconPress}>
                                <TextBlock dark>Geri Al</TextBlock>
                            </TouchableWithoutFeedback>
                        </View>:
                        <View></View>}
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
        justifyContent:'space-between',
        alignItems:'center',
        flexDirection: 'row',
        flex:1,
        paddingTop:12,
        paddingHorizontal:24,
    },
    arrowView:{
        justifyContent:'center',
        alignItems:'flex-end',
        minHeight:40
    },
})