import {View} from "react-native";
import Webview from "react-native-webview";
import React, {useState,useRef,useEffect} from "react";
import styles from "../styles/all.styles.js";
import {Button} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialcIcon from 'react-native-vector-icons/MaterialCommunityIcons'


export default function Webb({navigation}){

    const [url, setUrl] = useState('');
    const [dwnld_color, set_dwnld_color] = useState('beige');
    const [disabled, setdisabled] = useState(true)

    const webref = useRef(null);

    const toggledisabled = () => {setdisabled(!disabled)}

    const detectUrl = () => {
        const handle = data => {
            if (data.status === 200){
                setdisabled(false);
            }else{
                setdisabled(true);
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

    const dwnld_color = () => {
        if (disabled === true){
            set_dwnld_color("beige")
        }else{
            set_dwnld_color("black")
        }
    }

    useEffect(() =>{console.log(disabled);dwnld_color();})
 

    return (

    <View style={{flex:1, backgroundColor:"white"}}>
        <View style={{flexDirection:"row",backgroundColor:"beige"}}>
            <Icon.Button
            size={27}
            onPress={() => {webref.current.goBack()}}
            name="arrow-back" backgroundColor="beige" color="black" />
            <Icon.Button
            size={27} name="arrow-forward" color="black"
            onPress={() => { webref.current.goForward() }}
                backgroundColor="beige" />
                <View style={{width:250, backgroundColor:"beige"}}>
                    <View style={{alignSelf:"flex-end"}}>
                        <MaterialcIcon.Button
                            size={27} name="download" color={dwnld_color}
                            onPress={() => { navigation.navigate("Details", {url:url}) }}
                            backgroundColor="beige" disabled={disabled}/>
                    </View>
                </View>
        </View>
        <Webview
            ref={webref}
            source={{uri:"https://www.youtube.com"}}
             style={{ marginTop: 3 }}
             onLoadProgress={changeUrl} />
    </View>

        );
} 
