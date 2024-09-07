import React from "react";
import {Button, Text, Title} from "react-native-paper";
import {View} from "react-native";
import styles from "../styles/all.styles.js";

export default function Landing({navigation}){
    return (
        <View style={styles.container, {margin:50}}>
            <Title style={{margin:10}}>Url copy Paste Based(fast and minimal)</Title>
            <Button style={{backgroundColor:"red", margin:10}}
                mode="contained"
                onPress={() => {navigation.navigate("Home")}}>
                URL Paste Based
            </Button>
            <Button style={{backgroundColor:"red", margin:10}}
                mode="contained"
                onPress={() => {navigation.navigate("web")}}>
                Youtube based
            </Button>
        </View>
    );
}