import React from "react";
import {View} from "react-native";
import {Text, Title, Caption, Button} from "react-native-paper";

export default function Nocon({navigation}){
    return (
        <View>
            <Title>Sorry! You are not connected to internet!</Title>
            <Button backgroundColor="red" mode="contained" onPress={() => navigation.navigate("land")} >Retry</Button>
        </View>
    );
}