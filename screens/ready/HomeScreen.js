import React from 'react';
import {View} from 'react-native';
import TextBlock from '../../components/texts/TextBlock';
import {PrimaryButton} from '../../components/buttons'
import { Ionicons } from '@expo/vector-icons';
import {Profile} from '../../components/icons/icons';
import TabNavContainer from '../../components/views/TabNavContainer';
import SpinnerContainer from '../../components/views/SpinnerContainer';
import Firebase from '../../core/Firebase';

export default class HomeScreen extends React.Component {
    static navigationOptions = ({navigation})=>{
        return{
            headerRight:(
                <Ionicons style={{marginRight:16}} onPress={navigation.getParam('_primaryPressed')} name="md-add" size={36} color='#283AD8' />
            ),
            
        }
    };
    constructor(props){
        super(props);
        this._primaryPressed = this._primaryPressed.bind(this);
    }

    componentWillMount(){
        this.props.navigation.setParams({ _primaryPressed: this._primaryPressed });
        SpinnerContainer.getInstance().showSpinner();
        Firebase.getInstance().saveUser(()=>{
            SpinnerContainer.getInstance().hideSpinner();
        },
        ()=>{
            SpinnerContainer.getInstance().hideSpinner();
        });
    }

    _primaryPressed(event){
        this.props.navigation.navigate('AddFlight');
    }

    render() {
        return (
            <TabNavContainer style={{flex:1, justifyContent:'center', alignItems:'center'}}>
                <TextBlock dark>Bir sonraki uçuşunu ekle{'\n'}ve uçuş kabinine katıl...</TextBlock>
                <PrimaryButton title="Uçuş Ekle" onPress={this._primaryPressed}/>
            </TabNavContainer>
        );
    }
}