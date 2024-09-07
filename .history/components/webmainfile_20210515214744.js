import {View} from "react-native";
import Webview from "react-native-webview";
import React, {useState,useRef,useEffect} from "react";
import styles from "../styles/all.styles.js";
import {Button} from "react-native-paper";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialcIcon from 'react-native-vector-icons/MaterialCommunityIcons'


export default function Webb({navigation}){

    const [url, setUrl] = useState('');
    const [active, setActive] = useState(true)

    const webref = useRef(null);

    const toggleActive = () => {setActive(!active)}

    const detectUrl = () => {
        const handle = data => {
            if (data.status === 200){
                setActive(true);
            }else{
                setActive(false);
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

    useEffect(() =>{console.log(active)})
 

    return (

    <View style={styles.container}>
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
                            size={27} name="download" color="black"
                            onPress={() => { navigation.navigate("Details", {url:url}) }}
                            backgroundColor="beige" disabled={active}/>
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
