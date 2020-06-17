import React, { Component } from 'react';
import {View, Text} from 'react-native';
import ConnectionManager from './core/connection-manager';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootStackParamList } from './constants/nav-params';
import AppLoad from './app-load';
import PreLanding from './screens/prelanding';
import Landing from './screens/landing';
import Name from './screens/auth/create/name'
import Home from './screens/ready/home';
import SpinnerContainer from './components/views/spinner-container';
import {Provider, connect} from 'react-redux';
import {store} from './store/store';
import CreateEmail from './screens/auth/create/create-email';
import WebModalContainer from './components/views/web-modal-container';
import Email from './screens/auth/login/email';
import CreatePassword from './screens/auth/create/create-password';
import Password from './screens/auth/login/password';
import Verification from './screens/auth/verification';
import Profile from './screens/ready/profile';
import Settings from './screens/ready/settings';
import Visitor from './screens/ready/visitor';
import TextBlock from './components/texts/text-block';
import { i18n } from './constants/language';
import { primaryColor } from './components/styles/global';

type Props = {
    loggedIn:'INITIAL' | 'ANONYM' | 'REGISTERED' | 'VERIFIED';
}

type State = {
    loggedIn:Boolean
}

const Stack = createStackNavigator<RootStackParamList>();

class TopViewComponent extends Component<Props, State>{
    _playgroundMode = false;

    componentDidMount(){
        this.initializeConnection();
    }
    initializeConnection() {
        ConnectionManager.instance.startListening();
    }

    render(){
        if(this._playgroundMode){
            return(
                    <View style={{flex:1, backgroundColor:'#4444FF', justifyContent:'center',alignItems:'center',position:'absolute', top:0,right:0,left:0,bottom:0}}>
                        <Text>TestScreen</Text>
                    </View>
            );
        }
        else{
            let screens = (
                <>
                    <Stack.Screen name="AppLoad" component={AppLoad} options={{animationEnabled:false}}/>
                    <Stack.Screen name="PreLanding" component={PreLanding} options={{animationEnabled:false}}/>
                </>
            );
            let initialRouteName = "AppLoad";
            const logoHeader=()=>(
                <View style={{justifyContent:"center", alignItems:'center', marginTop:44}}>
                    <TextBlock logoInverse>{i18n.t('logo')}</TextBlock>
                </View>
            )
            switch(this.props.loggedIn){
                case "ANONYM":
                    screens = (
                        <NavigationContainer>
                            <Stack.Navigator headerMode='none' initialRouteName="Landing">
                                <Stack.Screen name="Landing" component={Landing} options={{animationEnabled:false}}/>
                                <Stack.Screen name="Name" component={Name} options={{animationEnabled:true}}/>
                                <Stack.Screen name="CreateEmail" component={CreateEmail} initialParams={{name:''}} options={{animationEnabled:true}}/>
                                <Stack.Screen name="CreatePassword" component={CreatePassword} initialParams={{name:'',email:''}} options={{animationEnabled:true}}/>
                                <Stack.Screen name="Email" component={Email} options={{animationEnabled:true}}/>
                                <Stack.Screen name="Password" component={Password} initialParams={{email:''}} options={{animationEnabled:true}}/>
                            </Stack.Navigator>
                        </NavigationContainer>
                    );
                break;
                case "REGISTERED":
                    screens = (
                        <NavigationContainer>
                            <Stack.Navigator headerMode='none' initialRouteName="Verification">
                                <Stack.Screen name="Verification" component={Verification} options={{animationEnabled:true}}/>
                            </Stack.Navigator>
                        </NavigationContainer>
                    );
                break;
                case "VERIFIED":
                    screens = (
                        <NavigationContainer>
                            <Stack.Navigator initialRouteName='Home'>
                                <Stack.Screen name="Home" component={Home} options={{animationEnabled:false, headerLeft:undefined, headerTitle:'Kabin', headerTitleStyle:{fontFamily:'nunito-black', color:primaryColor, fontSize:28}}} />
                                <Stack.Screen name="Profile" component={Profile} options={{animationEnabled:false, headerBackTitleVisible:false, headerTitle:'Profile', headerTitleStyle:{fontFamily:'nunito-semibold', color:primaryColor}}} />
                                <Stack.Screen name="Settings" component={Settings} options={{animationEnabled:false, headerBackTitleVisible:false, headerTitle:'Settings', headerTitleStyle:{fontFamily:'nunito-semibold', color:primaryColor}}} />
                                <Stack.Screen name="Visitor" component={Visitor} />
                            </Stack.Navigator>
                            
                        </NavigationContainer>
                    );
                break;
                case "INITIAL":
                    initialRouteName = "AppLoad";
                    screens = (
                        <NavigationContainer>
                            <Stack.Navigator headerMode='none' initialRouteName="AppLoad">
                                <Stack.Screen name="AppLoad" component={AppLoad} options={{animationEnabled:false}}/>
                                <Stack.Screen name="PreLanding" component={PreLanding} options={{animationEnabled:false}}/>
                            </Stack.Navigator>
                        </NavigationContainer>
                    );
                break;
            }
            return( 
                    <View style={{flex:1}}>
                                {screens}
                        <WebModalContainer></WebModalContainer>
                        <SpinnerContainer></SpinnerContainer>
                    </View>
            );
        }
    }
}

const mapStateToProps = (state: any, ownProps:any)=>{
    return { loggedIn:  state.login.loggedIn};
};

const TopView = connect(mapStateToProps,null)(TopViewComponent);

const App = ()=>(
    <Provider store={store}>
        <TopView></TopView>
    </Provider>

);
export default App;