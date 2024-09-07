
import React, {useState, useEffect} from "react";
import {Button, Drawer, Title, List} from "react-native-paper";
import {View,Linking, ScrollView} from "react-native";
import styles from "../styles/all.styles.js";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialcIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import Modal from "react-native-modal";
import RNFetchBlob from 'rn-fetch-blob';
import * as path from "path";

const fs = RNFetchBlob.fs;
var dirs = fs.dirs;
const dir = dirs.DownloadDir + "/ytd964";

const video_icon = () => <Entypo name="video" size={24} />
const renderIc = ic => <List.Icon icon={ic} />

let fetch;

const create_dir = async () => {
    const isdir  = await RNFetchBlob.fs.isDir(dir);
    if (!isdir){
        RNFetchBlob.fs.mkdir(dir).then(r => null);
    }

}


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
    

    useEffect(() => {return_fetch();create_dir()});


    const show_files = (v,i) => {
        if (v !== undefined && typeof v === "string"){
            const parsed = path.parse(v);
            const ext = parsed.ext;
            const file_name = parsed.name;
            let icon;

            if (ext === ".mp4"){
                icon = () => renderIc(video_icon);
            }else if (ext === ".mp3"){
                icon = () => renderIc("music-box");
            }
            return (
                <List.Item title={file_name} left={icon} />
            )
        }
    }

    const all = allFiles.map(show_files);

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


