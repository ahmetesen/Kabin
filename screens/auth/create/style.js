import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'stretch'
    },
    logoContainer:{
        height:100,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    keyboardAvoidingViewStyle:{
        padding:16,
        flex:1,
        justifyContent:'space-around',
        alignItems:'stretch'
    },
    footerContainer: {
        height: 160,
        justifyContent:'flex-start',
        alignItems:'stretch'
    },
    titleContainer:{

        alignItems:'center',
        justifyContent:'center',
    },
    infoContainer:{
        flex:.3,
        justifyContent:'flex-end',
        alignItems:"center",
        paddingBottom:16
    },
    textBoxContainer:{
        padding:8,
        flex:.4,
        justifyContent:'center',
    }
});