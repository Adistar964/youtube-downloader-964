import {View} from "react-native";
import Webview from "react-native-webview";
import React from "react";

export default function Webb({navigation}){

    const printURL  = `
        alert(window.location.href);
    `
    return (<Webview 
        source={{uri:"https://www.youtube.com"}}
         style={{ marginTop: 20 }}
         injectedJavaScript={printURL} />
        );
} 
