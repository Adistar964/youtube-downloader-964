
import React, {useState, useEffect, useRef} from "react";
import {List, Divider, Title} from "react-native-paper";
import {View,Linking, ScrollView, Alert} from "react-native";
import styles from "../styles/all.styles.js";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialcIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicon from "react-native-vector-icons/Ionicons";
import Entypo from "react-native-vector-icons/Entypo";
import SimpleLine from "react-native-vector-icons/SimpleLineIcons";
import Modal from "react-native-modal";
import RNFetchBlob from 'rn-fetch-blob';
import * as path from "path";
import Share from "react-native-share";
import Menu, { MenuItem, MenuDivider } from 'react-native-material-menu';
import Sound from 'react-native-sound';
import { default as SoundPlayer } from 'react-native-sound-player'
import TrackPlayer from 'react-native-track-player';
import {createMaterialTopTabNavigator as cmt} from "@react-navigation/material-top-tabs";
import {create_dir} from "./showdet";

const Tab = cmt() 

const start = async (url, title) => {
    await TrackPlayer.setupPlayer();
    TrackPlayer.updateOptions({
        capabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_STOP,
            // TrackPlayer.CAPABILITY_NEXT,
            // TrackPlayer.CAPABILITY_PREVIOUS,
        ],
        compactCapabilities: [
            TrackPlayer.CAPABILITY_PLAY,
            TrackPlayer.CAPABILITY_PAUSE,
            TrackPlayer.CAPABILITY_STOP,

        ]
    })
    await TrackPlayer.add({
        url: url,
        title: title,
        artist: 'YTD964',
    });
    await TrackPlayer.play();
};

Sound.setCategory('Playback');

const fs = RNFetchBlob.fs;
var dirs = fs.dirs;
const dir = dirs.DownloadDir + "/ytd964";

const share_func = (type,file) => {
    const options = {
        title:"Share Downloaded", 
        message:"Downloaded from YTD-964", url:`file:///${dir}/${type}/${file}`}
    Share.open(options).then(r => console.log(r)).catch(err => console.log(err));
}

const video_icon = props => <Entypo name="video" {...props} />

const renderIc = (ic,props) => <List.Icon icon={ic} {...props} />


const video_dir = dir + "/ytd-964 videos";
const audio_dir = dir + "/ytd-964 audios"

const open_func = (type,file,nav) => {
    if (type === "ytd-964 audios"){
        var name = path.parse(file).name;
        const directory = `file:///${dir}/${type}/${file}`
        Alert.alert("Start Playing?", text_confirm, [{text:"Yes", onPress:()=>start(directory, name)},{text:"No"}])
    } else{
        nav.navigate("view", {url:file})
    }
}

const show_files = (v,i,type, nav) => {
    if (v !== undefined && typeof v === "string"){
        const parsed = path.parse(v);
        const file_name = parsed.name;
        let icon;
        let menuRef;

        const share_icon = props => <Entypo name="share" onPress={call_share} {...props} />
        const opt_icon = props => <SimpleLine name="options-vertical" onPress={open_menu} {...props} />

        const render_right = (props) => {
            return (
            <Menu ref={ref => (menuRef[`menu${i}`] = ref)}
             button={<SimpleLine name="options-vertical" onPress={ref=>(menuRef[`menu${i}`].show())} {...props} style={props.style} size={20} />}  >
                <MenuItem onPress={() => open_func(type,v,nav)} > Open </MenuItem>
                <MenuItem onPress={() => share_func(v,type)} > Share </MenuItem>
            </Menu>
            );
        }

            if (type === "ytd-964 videos"){
                icon = (props) => renderIc(video_icon, props);
                menuRef = menuVidRef
            }else{
                icon = (props) => renderIc("music-box", props);
                menuRef = menuAudioRef
            }

        return (
            <View>
                <List.Item style={{padding:15}}
                 titleNumberOfLines={2}
                  title={file_name}
                   key={v} left={icon}
                    right={(props) => render_right(props)} />
                <Divider />
            </View>
        )
    }
}


const menuVidRef = {};

const menuAudioRef = {};

const text_confirm = "Are you sure you want to play this audio?"

const Nocontent = ({type}) => {
    return (
        <View style={{justifyContent:"center", alignItems:"center"}}>
            <Ionicon name="md-file-tray-stacked-sharp" size={100} style={{margin:50}} />
            <Title style={{margin:20}}>Your all downloaded {type} will appear here. Currently It is Empty.</Title>
        </View>
    );
};

function VideoDownloads({navigation}){

    const [allFiles, setAllFiles] = useState({videos:[]});

    const type = "ytd-964 videos" ;

    const return_fetch = async () => {
        const videos = await fs.ls(video_dir);
        const audios = await fs.ls(audio_dir);
        setAllFiles({videos:videos});
    }

    useEffect(() => {create_dir();return_fetch();});

    const vids = allFiles.videos.map((v,i) => show_files(v,i,type,navigation));
    const available = allFiles.videos.length !== 0;
    

    return (
    <View style={styles.scrollView}>
        <ScrollView contentStyle={styles.scroller}>
            <View style={{alignSelf: 'stretch'}}>
                <List.Section title="Downloaded Content" style={{color:"red"}}>
                    {
                    available ? 
                        vids
                    : 
                    <Nocontent />
                    }
                </List.Section>
            </View>
        </ScrollView>
    </View>
    );
}
function AudioDownloads({navigation}){

    const [allFiles, setAllFiles] = useState({audios:[]});


    const type = "ytd-964 audios" 
    
    const return_fetch = async () => {
        const audios = await fs.ls(audio_dir);
        setAllFiles({audios:audios});
    }

    useEffect(() => {create_dir();return_fetch();});

    const auds = allFiles.audios.map((v,i) => show_files(v,i,type,navigation));
    const available = allFiles.audios.length !== 0;
    
    return (
    <View style={styles.scrollView}>
        <ScrollView contentStyle={styles.scroller}>
            <View style={{alignSelf: 'stretch'}}>
                <List.Section title="Downloaded Content" style={{color:"red"}}>
                    {
                    available ? 
                        auds
                    : 
                    <Nocontent />
                    }
                </List.Section>
            </View>
        </ScrollView>
    </View>
    );
}



function Downloads({navigation}){
    return (
        <Tab.Navigator>
            <Tab.Screen  name="ytd-964 videos" options={{title:"ytd-964 Videos"}} component={VideoDownloads} />
            <Tab.Screen name="test" options={{title:"ytd-964 Audios"}} component={AudioDownloads} />
        </Tab.Navigator>
    );
}

export default Downloads;