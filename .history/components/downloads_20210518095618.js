
import React, {useState, useEffect} from "react";
import {Button, Drawer, Title, List} from "react-native-paper";
import {View,Linking, ScrollView} from "react-native";
import styles from "../styles/all.styles.js";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialcIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import Ionicon from "react-native-vector-icons/Ionicons";
import RNFetchBlob from 'rn-fetch-blob';

const fs = RNFetchBlob.fs;
var dirs = fs.dirs;
const dir = dirs.DownloadDir + "/ytd964";

let fetch;

export default function Downloads({navigation}){

    const [allFiles, setAllFiles] = useState([fetch]);

    const all_files = async () => {
        const fetch = await fs.ls(dir);
        setAllFiles(fetch);
    }

    const return_fetch = async () => {
        fetch = await fs.ls(dir)
        setAllFiles(fetch);
    };
    

    useEffect(() => return_fetch());


    const show_files = (v,i) => {
        var splitted = v.toString().split('.mp');
        
        return (
            <List.Item title={splitted[0]} />
        );
    }

    const all = allFiles.map(v => <List.Item title={v.split("mp"[0])} />);

    return (
        <View style={styles.scrollView}>
            <ScrollView contentStyle={styles.scroller}>
                <View style={{alignSelf: 'stretch'}}>
                    <List.Section title="Downlaoded">
                        {all}
                    </List.Section>
                </View>
            </ScrollView>
        </View>
    );
}


// if (ext === "4"){
//     icon = video_icon();
// }else if (ext === "3"){
//     icon = "music-box";
// }