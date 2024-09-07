import React from "react";
import {Button, Text, Title} from "react-native-paper";
import {View} from "react-native";
import styles from "../styles/all.styles.js";

export default function Landing({navigation}){
    return (
        <View style={styles.container, {margin:50}}>
            <View>
                <Title style={{margin:20}}>Url copy Paste Based</Title>
                <Title style={{margin:20}}>(Fast And minimal)</Title>
                <Button style={{backgroundColor:"red", margin:10}}
                    mode="contained"
                    onPress={() => {navigation.navigate("Home")}}>
                    URL Paste Based
                </Button>
            </View>
            <View style={{marginTop:100}}>
                <Title style={{margin:20}}>Youtube UI Based</Title>
                <Title style={{margin:20}}>(Easy And Advanced)</Title>
                <Button style={{backgroundColor:"red", margin:10}}
                    mode="contained"
                    onPress={() => {navigation.navigate("web")}}>
                    Youtube based
                </Button>
            </View>
        </View>
    );
}