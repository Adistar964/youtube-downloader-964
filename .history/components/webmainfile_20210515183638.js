import {View} from "react-native";
import Webview from "react-native-webview";
import React from "react";

export default function Webb({navigation}){

    const printURL  = `
    let initialUrl = window.location.href;
    window.alert(initialUrl)
    let checkUrlChange = () => {
      document.body.style.backgroundColor = 'blue';
      const currentUrl = window.location.href;
      if(currentUrl !== initialUrl){
        window.alert('nav changed')
        initialUrl = currentUrl;
      }
    }
    setInterval(checkUrlChange, 1000);
    true`
    return (<Webview 
        source={{uri:"https://www.youtube.com"}}
         style={{ marginTop: 20 }}
         injectedJavaScript={printURL} />
        );
} 
