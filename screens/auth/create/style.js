import { StyleSheet } from 'react-native';
export const styles = StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems:'stretch'
    },
    logoContainer:{
        height:96,
        justifyContent:'flex-end',
        alignItems:'center'
    },
    keyboardAvoidingViewStyle:{
        flex:1,
        alignItems:'stretch',
        justifyContent:'flex-end'
    },
    footerContainer: {
        height:160,
        justifyContent:'flex-start',
        padding:20
    },
    titleContainer:{
        alignItems:'flex-start',
        justifyContent:'flex-start',
        marginTop:20,
        marginHorizontal:20
    },
    infoContainer:{
        flex:.3,
        justifyContent:'flex-end',
        alignItems:"center",
        paddingBottom:16
    },
    textBoxContainer:{
        padding:12,
        paddingTop:20,
        flex:.4,
        justifyContent:'flex-start',
    }
});