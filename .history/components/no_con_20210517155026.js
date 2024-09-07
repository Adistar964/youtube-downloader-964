import React, { useEffect } from "react";
import {Alert, View} from "react-native";
import {Text, Title, Caption, Button} from "react-native-paper";
import {useNetInfo} from "@react-native-community/netinfo";
import styles from "../styles/all.styles.js";
import Icon from "react-native-vector-icons/FontAwesome"


export default function Nocon({navigation}){

    const netinfo = useNetInfo();

    const retry = () => {
        if (netinfo.isConnected === false){
        navigation.navigate("land")
    }else{
        Alert.alert("Retry", "Make sure you are connected to the network!", 
        [{text:"Ok"}])
    }
    }

    const h_left = () => null

    useEffect(() => {navigation.setOptions({headerLeft:h_left})});

    const refresh_icon = () => <Icon name="refresh" size={20} color="white" />

    return (
        <View style={styles.container}>
            <Title style={{marginTop:40, margin:10}}>Sorry! You are not connected to internet!</Title>
            <Button style={styles.dwnld} icon={refresh_icon} color="red" mode="contained" onPress={retry} >Retry</Button>
        </View>
    );
}