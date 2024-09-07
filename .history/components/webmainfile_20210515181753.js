import {View} from "react-native";
import Webview from "react-native-webview";
import React from "react";

export default function Webb({navigation}){

    const printURL = (e)=> {
        const {nativeEvent} = e;
        console.log(nativeEvent.url);
 }
    return (<Webview 
        source={{uri:"https://www.youtube.com"}}
         style={{ marginTop: 20 }}
         onLoad={{printURL}} />
        );
} 
