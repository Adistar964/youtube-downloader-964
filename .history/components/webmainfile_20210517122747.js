import {View} from "react-native";
import Webview from "react-native-webview";
import React, {useState,useRef,useEffect} from "react";
import styles from "../styles/all.styles.js";
import Icon from "react-native-vector-icons/Ionicons";
import MaterialcIcon from 'react-native-vector-icons/MaterialCommunityIcons'
import { Alert } from "react-native";


export default function Webb({navigation}){

    const [url, setUrl] = useState('');
    const [dwnld_color, set_dwnld_color] = useState('beige');
    const [disabled, setdisabled] = useState(true)

    const webref = useRef(null);

    const askperm = () => {
        const rationale = {
          title:"YTD-964", 
          message:"YTD-964 needs your Permissions in order to continue",
          buttonPositive:"Grant",
          buttonNegative:"Deny"
        }
        requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.CAMERA ], rationale).then(s => {
          if (s[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === "granted" && s[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === "granted"){
            navigation.navigate("Details", {url:url})
          }else{
            Alert.alert("Allow Permissions",alertContent,
            [{text:"Allow", onPress:() => Linking.openSettings()}])
          }
        })}

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

    const chg_dwnld_color = () => {
        if (disabled === true){
            set_dwnld_color("beige")
        }else{
            set_dwnld_color("black")
        }
    }

    useEffect(() =>{console.log(disabled);chg_dwnld_color();})
 

    const error = e => {Alert.alert("Please make sure that you are connected to internet!",
    [{text:"Ok", onPress:() => {navigation.navigate("Land");}}])}

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
                            onPress={askperm}
                            backgroundColor="beige" disabled={disabled}/>
                    </View>
                </View>
        </View>
        <Webview
            ref={webref}
            source={{uri:"https://www.youtube.com"}}
             style={{ marginTop: 3 }}
             onLoadProgress={changeUrl}
             onError={error} />
    </View>

        );
} 
