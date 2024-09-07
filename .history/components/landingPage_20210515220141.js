import React from "react";
import {Button, Text} from "react-native-paper";
import {View} from "react-native";
import styles from "../styles/all.styles.js";

export default function Landing(){
    return (
        <View style={styles.container}>
            <View style={{backgroundColor:"red"}}>
                <Button >
                    URL Paste Based
                </Button>
                <Button style={{backgroundColor:"red"}}>
                    UI based
                </Button>
            </View>
        </View>
    );
}