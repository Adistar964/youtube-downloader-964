
import React, {useState, useEffect} from "react";
import {Button, Drawer, Title, List} from "react-native-paper";
import {View,Linking, ScrollView} from "react-native";
import styles from "../styles/all.styles.js";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialcIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import Modal from "react-native-modal";
import Ionicon from "react-native-vector-icons/Ionicons";
import RNFetchBlob from 'rn-fetch-blob';

const fs = RNFetchBlob.fs;
var dirs = fs.dirs;
const dir = dirs.DownloadDir + "/ytd964";

const video_icon = () => <Entypo name="video" size={24} />

let fetch;

export default function Downloads({navigation}){

    const [allFiles, setAllFiles] = useState([fetch]);

    const all_files = async () => {
        const fetch = await fs.ls(dir);
        setAllFiles(fetch);
        console.log(AllFiles)
    }

    const return_fetch = async () => {
        fetch = await fs.ls(dir)
        // console.log(fetch)
        setAllFiles(fetch);
    };
    

    return_fetch();


    const show_files = (v, i) => {
        console.log(v)
        let splitted = v.split('.mp');
        let ext = splitted[1];

        let icon;

        if (ext === "4"){
            icon = video_icon();
        }else if (ext === "3"){
            icon = "music-box";
        }

        return (
            <List.Item title={splitted[0]} icon={icon} />
        );
    }
    console.log(allFiles)
    let all = allFiles.map(show_files);

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