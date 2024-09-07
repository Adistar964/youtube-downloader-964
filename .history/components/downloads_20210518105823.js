
import React, {useState, useEffect} from "react";
import {Button, Drawer, Title, List} from "react-native-paper";
import {View,Linking, ScrollView} from "react-native";
import styles from "../styles/all.styles.js";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialcIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import Ionicon from "react-native-vector-icons/Ionicons";
import RNFetchBlob from 'rn-fetch-blob';
import * as path from "path";

const fs = RNFetchBlob.fs;
var dirs = fs.dirs;
const dir = dirs.DownloadDir + "/ytd964";

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
        var ext = path.extname(v);
        var file_name = path.basename(v);
        
        return (
            <List.Item title={file_name} />
        );
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


// if (ext === "4"){
//     icon = video_icon();
// }else if (ext === "3"){
//     icon = "music-box";
// }