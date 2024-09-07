import React, { useEffect } from "react";
import {Alert, View} from "react-native";
import {Text, Title, Caption, Button} from "react-native-paper";
import {useNetInfo} from "@react-native-community/netinfo";
import styles from "../styles/all.styles.js";
import Icon from "react-native-vector-icons/Foundation"
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialcIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";


export default function Nocon({navigation}){

    const netinfo = useNetInfo();

    const retry = () => {
        if (netinfo.isConnected){
        navigation.navigate("land")
    }else{
        Alert.alert("Retry", "Make sure you are connected to the network!", 
        [{text:"Ok"}])
    }
    }

    const h_left = () => null

    useEffect(() => {navigation.setOptions({headerLeft:h_left})});

    const refresh_icon = () => <Icon name="refresh" size={24} color="white" />

    return (
        <View style={styles.container}>
            <Entypo name="network" style={{marginTop:30}} size={60} />
            <View style={{marginTop:40 ,margin:30,borderWidth:2, justifyContent:"center", alignItems:"center"}}>
                <MaterialcIcon name="network-strength-off" style={{marginTop:20}} size={40} />
                <Title style={{marginTop:40, margin:10}}>No internet, please retry!</Title>
                <Button style={styles.dwnld} icon={refresh_icon} color="red" mode="contained" onPress={retry} >Retry</Button>
            </View>
        </View>
    );
}