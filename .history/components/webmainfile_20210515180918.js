import {View} from "react-native";
import Webview from "react-native-webview";
import React from "react";

export default function Webb({navigation}){
    return (<Webview 
        source={{uri:"https://www.youtube.com"}} style={{ marginTop: 20 }} />
        );
} 
