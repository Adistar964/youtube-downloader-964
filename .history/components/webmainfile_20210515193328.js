import {View} from "react-native";
import Webview from "react-native-webview";
import React, {useState,useRef} from "react";
import styles from "../styles/all.styles.js";
import {Button} from "react-native-paper";
import Icon from "react-native-vector-icons/AntDesign"


export default function Webb({navigation}){

    const [url, setUrl] = useState('');

    const webref = useRef(null);

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
        <Icon.Button 
        onPress={() => {webref.current.goBack()}} 
        name="back"
        style={{width:20}}>
            Back
        </Icon.Button>
        <Webview
            ref={webref}
            source={{uri:"https://www.youtube.com"}}
             style={{ marginTop: 50 }}
             onLoadProgress={changeUrl} />
    </View>

        );
} 
