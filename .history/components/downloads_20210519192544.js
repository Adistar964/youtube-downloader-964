
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
import {CreateMaterialTopTabNavigator as cmt} from "@react-native-navigation/material-top-tabs";

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
        message:"Downloaded from YTD-964", url:`file:///${dir}/${file}/${file}`}
    Share.open(options).then(r => console.log(r)).catch(err => console.log(err));
}

const video_icon = (props) => <Entypo name="video" {...props} />

const renderIc = (ic,props) => <List.Icon icon={ic} {...props} />

let fetch;

const video_dir = dir + "/videos";
const audio_dir = dir + "/audios"

const create_dir = async () => {
    const isdirv  = await RNFetchBlob.fs.isDir(video_dir);
    const isdira = await RNFetchBlob.fs.isDir(audio_dir);
    const isdir = await RNFetchBlob.fs.isDir(dir);
    
    if (!isdir){
        RNFetchBlob.fs.mkdir(dir).then(r => null);
    }if (!isdirv){
        RNFetchBlob.fs.mkdir(video_dir).then(r => null);
    }if (!isdira){
        RNFetchBlob.fs.mkdir(audio_dir).then(r => null);
    }

}


const menuRef = {};

const text_confirm = "Are you sure you want to play this audio?"

function VideoDownloads({navigation}){

    const [allFiles, setAllFiles] = useState({audios:[],videos:[]});

    const menu = useRef(null);

    const open_func = (type,file) => {
        
        if (type === "videos"){
            navigation.navigate("view", {url:file})
        }else if (type === "audios"){
            console.log("audio!!!")
            var name = path.parse(file).name;
            const directory = `file:///${dir}/${type}/${file}`
            Alert.alert("Start Playing?", text_confirm, [{text:"Yes", onPress:()=>start(directory, name)},{text:"No"}])
            
    }}
    

    const return_fetch = async () => {
        const videos = await fs.ls(video_dir);
        const audios = await fs.ls(audio_dir);
        setAllFiles({audios:audios, videos:videos});
    }

    // const return_fetch = async () => {
    //     fetch = await fs.ls(dir)
    //     setAllFiles(fetch);
    // };
    

    useEffect(() => {create_dir();return_fetch();});


    const close_menu = () => {
        menu.current.hide();
    }
    const open_menu = (e) => {
        menu.current.show();
    }


    const show_files = (v,i,type) => {
        if (v !== undefined && typeof v === "string"){
            const parsed = path.parse(v);
            const ext = parsed.ext;
            const file_name = parsed.name;
            let icon;

            const call_share = () => share_func(type,v);
            const share_icon = (props) => <Entypo name="share" onPress={call_share} {...props} />
            const opt_icon = props => <SimpleLine name="options-vertical" onPress={open_menu} {...props} />
            const call_open = () => open_func(type,v);

            const render_right = (props) => {
                return (
                <Menu ref={ref => (menuRef[`menu${i}`] = ref)}
                 button={<SimpleLine name="options-vertical" onPress={ref=>(menuRef[`menu${i}`].show())} {...props} style={props.style} size={20} />}  >
                    <MenuItem onPress={call_open} > Open </MenuItem>
                    <MenuItem onPress={call_share} > Share </MenuItem>
                </Menu>
                );
            }

            if (type === "videos"){
                icon = (props) => renderIc(video_icon, props);
            }else if (type === "audios"){
                icon = (props) => renderIc("music-box", props);
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

    const vids = allFiles.videos.map((v,i) => show_files(v,i,"videos"));
    const auds = allFiles.audios.map((v,i) => show_files(v,i,"audios"));
    const available = allFiles.videos.length !== 0;
    
    const Nocontent = () => {
        return (
            <View style={{justifyContent:"center", alignItems:"center"}}>
                <Ionicon name="md-file-tray-stacked-sharp" size={100} style={{margin:50}} />
                <Title style={{margin:20}}>Your all downloaded Items will appear here. Currently It is Empty.</Title>
            </View>
        );
    };

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

    const [allFiles, setAllFiles] = useState({audios:[],videos:[]});

    const menu = useRef(null);

    const open_func = (type,file) => {
        
        if (type === "videos"){
            navigation.navigate("view", {url:file})
        }else if (type === "audios"){
            console.log("audio!!!")
            var name = path.parse(file).name;
            const directory = `file:///${dir}/${type}/${file}`
            Alert.alert("Start Playing?", text_confirm, [{text:"Yes", onPress:()=>start(directory, name)},{text:"No"}])
            
    }}
    

    const return_fetch = async () => {
        const videos = await fs.ls(video_dir);
        const audios = await fs.ls(audio_dir);
        setAllFiles({audios:audios, videos:videos});
    }

    // const return_fetch = async () => {
    //     fetch = await fs.ls(dir)
    //     setAllFiles(fetch);
    // };
    

    useEffect(() => {create_dir();return_fetch();});


    const close_menu = () => {
        menu.current.hide();
    }
    const open_menu = (e) => {
        menu.current.show();
    }


    const show_files = (v,i,type) => {
        if (v !== undefined && typeof v === "string"){
            const parsed = path.parse(v);
            const ext = parsed.ext;
            const file_name = parsed.name;
            let icon;

            const call_share = () => share_func(type,v);
            const share_icon = (props) => <Entypo name="share" onPress={call_share} {...props} />
            const opt_icon = props => <SimpleLine name="options-vertical" onPress={open_menu} {...props} />
            const call_open = () => open_func(type,v);

            const render_right = (props) => {
                return (
                <Menu ref={ref => (menuRef[`menu${i}`] = ref)}
                 button={<SimpleLine name="options-vertical" onPress={ref=>(menuRef[`menu${i}`].show())} {...props} style={props.style} size={20} />}  >
                    <MenuItem onPress={call_open} > Open </MenuItem>
                    <MenuItem onPress={call_share} > Share </MenuItem>
                </Menu>
                );
            }

            if (type === "videos"){
                icon = (props) => renderIc(video_icon, props);
            }else if (type === "audios"){
                icon = (props) => renderIc("music-box", props);
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

    const vids = allFiles.videos.map((v,i) => show_files(v,i,"videos"));
    const auds = allFiles.audios.map((v,i) => show_files(v,i,"audios"));
    const available = allFiles.videos.length !== 0;
    
    const Nocontent = () => {
        return (
            <View style={{justifyContent:"center", alignItems:"center"}}>
                <Ionicon name="md-file-tray-stacked-sharp" size={100} style={{margin:50}} />
                <Title style={{margin:20}}>Your all downloaded Items will appear here. Currently It is Empty.</Title>
            </View>
        );
    };

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
            <Tab.Screen  name="videos" options={{title:"Videos"}} component={VideoDownloads} />
            <Tab.Screen name="test" options={{title:"Audios"}} component={AudioDownloads} />
        </Tab.Navigator>
    );
}

export default Dwonloads;