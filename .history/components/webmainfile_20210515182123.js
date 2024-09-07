import {View} from "react-native";
import Webview from "react-native-webview";
import React from "react";

export default function Webb({navigation}){

    const printURL = (syntheticEvent)=> {
        const { nativeEvent } = syntheticEvent;
        this.url = nativeEvent.url;
 }
    return (<Webview 
        source={{uri:"https://www.youtube.com"}}
         style={{ marginTop: 20 }}
         onload={{printURL}} />
        );
} 
