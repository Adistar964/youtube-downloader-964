
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
import Share from "react-native-share";

const fs = RNFetchBlob.fs;
var dirs = fs.dirs;
const dir = dirs.DownloadDir + "/ytd964";

const share_func = (file) => {
    const options = {
        title:"Share Downloaded", 
        message:"from YTD-964", url:`${dir}/${file}`}
    Share.open(options).then(r => console.log(r)).catch(err => console.log(err));
}


const call_share = () => share_func(v)

const share_icon = (props) => <Entypo name="share" onPress={call_share} {...props} />
const video_icon = (props) => <Entypo name="video" {...props} />

const renderIc = (ic,props) => <List.Icon icon={ic} {...props} />

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

            const call_share = () => share_func(v)
            const share_icon = (props) => <Entypo name="share" onPress={call_share} {...props} />
            const render_share = (props) =>  renderIc(share_icon,props);

            if (ext === ".mp4"){
                icon = (props) => renderIc(video_icon, props);
            }else if (ext === ".mp3"){
                icon = (props) => renderIc("music-box", props);
            }

            return (
                <List.Item color="red" title={file_name} key={v} left={icon} right={render_share} />
            )
        }
    }

    const all = allFiles.map(show_files);

    return (
        <View style={styles.scrollView}>
            <ScrollView contentStyle={styles.scroller}>
                <View style={{alignSelf: 'stretch'}}>
                    <List.Section title="Downloaded Content">
                        {all}
                    </List.Section>
                </View>
            </ScrollView>
        </View>
    );
}


