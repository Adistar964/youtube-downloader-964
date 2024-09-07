import {View} from "react-native";
import Webview from "react-native-webview";
import React, {useState,useEffect} from "react";
import styles from "../styles/all.styles.js";
import {Button} from "react-native-paper";


export default function Webb({navigation}){

    const [url, setUrl] = useState('');

    const detectUrl = () => {
        const handle = data => {
            if (data.status === 200){
                console.log('valid')
            }else{
                console.log("invalid")
            }
        }
        fetch(`https://www.youtube.com/oembed?url=${url}&format=json`).then(handle)
    }; 

    const changeUrl = (syntheticEvent)=> {
        const { nativeEvent } = syntheticEvent;
        let cur_url = nativeEvent.url;
        setUrl(cur_url);
        detectUrl();
 }
    return (

    <View style={styles.container}>
        <Button onPress={() => {Webview.goBack()}} >Back</Button>
        <Webview
            source={{uri:"https://www.youtube.com"}}
             style={{ marginTop: 20 }}
             onLoadProgress={changeUrl} />
    </View>

        );
} 
