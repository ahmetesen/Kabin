import { StackNavigationProp } from '@react-navigation/stack';
import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs'

export type RootStackParamList = {
    AppLoad:undefined;
    PreLanding:undefined;
    Landing:undefined;
    Name:undefined;
    CreateEmail:{name:string};
    CreatePassword:{name:string,email:string};
    Email:undefined;
    Password:{email:string};
    Verification:undefined;
    Tabs:undefined;
    Visitor:undefined;
    Room:undefined;
    RoomSettings:undefined;
    Home:undefined;
    Profile:undefined;
    Settings:undefined;
};

export type DefaultNavigationProp = StackNavigationProp<RootStackParamList>;