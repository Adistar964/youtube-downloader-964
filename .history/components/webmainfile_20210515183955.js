import {View} from "react-native";
import Webview from "react-native-webview";
import React from "react";

export default function Webb({navigation}){

    const printURL = (syntheticEvent)=> {
        const { nativeEvent } = syntheticEvent;
        let url = nativeEvent.url;
        console.log(url);
 }
    return (<Webview 
        source={{uri:"https://www.youtube.com"}}
         style={{ marginTop: 20 }}
         onLoadProgress={printURL} />
        );
} 
