
import React,{useState, useEffect} from 'react';
import {StyleSheet ,View, SafeAreaView, Text,
         Image, TouchableOpacity, ScrollView, ToastAndroid, ActivityIndicator, Alert} from 'react-native';
import ytdl from "react-native-ytdl";
import {Button, RadioButton, Title} from 'react-native-paper';
import RNFetchBlob from 'rn-fetch-blob';
import stylesd from '../styles/all.styles.js';
import Modal from 'react-native-modal';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {useNetInfo} from '@react-native-community/netinfo';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

const fs = RNFetchBlob.fs
var dirs = fs.dirs
const dir = dirs.DownloadDir + "/ytd964";
const video_dir = dir + "/ytd-964 videos";
const audio_dir = dir + "/ytd-964 audios"

export const create_dir = async () => {
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



export default function ShowDet({navigation, route}){
    const [data, setdata] = useState({title:"",author:"", thumbnail:"", id:""});
    const [value, setValue] = useState("both");
    const [visible, setVisible] = useState(false);
    

    const netinfo = useNetInfo();

    var h_right = () => <MaterialIcon.Button backgroundColor="red" name="folder" size={35} styles={{marginRight:20}} onPress={() => navigation.navigate('downloads')} />;

    useEffect(async () => {
        const after = out => {
            var id = out.thumbnail_url
            id = id.split("/vi/")[1].substring(0,11);
            setdata({title : out.title ,author: out.author_name , thumbnail : out.thumbnail_url,id : id});
        };
        var url = `https://www.youtube.com/oembed?url=${route.params.url}&format=json`;
        fetch(url).then(e => e.json()).then(after);
        navigation.setOptions({headerRight:h_right});
        create_dir()
    });
      
    const toast = (message) =>{
        ToastAndroid.show(message, ToastAndroid.SHORT);
    }

    const toggle = () => {
        setVisible(!visible);
    }

    const Download = async () => {
        console.log("in donwloads func")
        toggle()
        create_dir()
        console.log("created dir")
        const youtube_obj = await ytdl.getInfo(data.id);
        // console.log(youtube_obj)
        let format;
        let filedir;
        if (value === "both"){
            console.log("in if")
             format        = ytdl.chooseFormat(youtube_obj.formats, {quality:"highest"})
             filedir  = `${video_dir}/${data.title}.mp4`;
        }
        
        else if (value === "audio"){
            console.log("in if auio")
            format = ytdl.chooseFormat(youtube_obj.formats, {filter:"audioonly"})
            filedir  = `${audio_dir}/${data.title}.mp3`;
    } else{
        console.log("in else")
        format = ytdl.chooseFormat(youtube_obj.formats, {filter:"videoonly"})
        filedir = `${video_dir}/${data.title}.mp4`;
    }
        console.log("in downloads")
        toast('Download Started')
        RNFetchBlob.config({
            addAndroidDownloads:{
            title:data.title,
            description:"Your Video is being downloaded",
            mediaScannable : true,
            notification:true,
            path:filedir,
            useDownloadManager:true, 
             mime:format.mimeType
            },
            fileCache: true,
            indicator: true,
    }).fetch('GET', format.url).then((e) => {console.log(e.path());console.log(format.mimeType)}).catch(e => {console.log(e);toast('Download cancelled!');console.log(format.mimeType)})
        
    }

    const nav = () => {
        if (netinfo.isConnected){
            Download()
        }else{
            Alert.alert("Connectivity", "No internet! Please make sure that you are connected to a network!",[{text:"Ok"}])
        }    
    }

      return (
        <SafeAreaProvider>
            <Modal propagateSwipe useNativeDriver visible={visible} onBackdropPress={toggle}
            style={{ borderWidth:2, backgroundColor:"white"}}>
                <View accessible={true}>
                    <Title style={stylesd.dwnld_opt}>Choose Your download options:</Title>
                    <RadioButton.Group onValueChange={val => setValue(val)} value={value}>
                        <RadioButton.Item label="Video with audio (mp4)" value="both" />
                        <RadioButton.Item label="Video without audio (mp4)" value="video" />
                        <RadioButton.Item label="only audio (mp3)" value="audio" />
                    </RadioButton.Group>
                    <Button style={stylesd.dwnld2} mode="contained" onPress={nav}>Download</Button>
                    <Button mode="contained" style={stylesd.cancel} onPress={toggle}>
                        Cancel
                    </Button>
                </View>
            </Modal>
            <View style={stylesd.scrollView}>
                <ScrollView contentContainerStyle={stylesd.scroller}>
                    <View style={stylesd.container}>
                        <Image
                        style={stylesd.img}
                        resizeMode="contain"
                        fadeDuration={1000}
                        source={{
                            width:300,
                             height:300,
                              uri:data.thumbnail
                              }} />
                            <Text  style={stylesd.title}>
                                <Text style={{fontWeight:"bold"}}>Title: </Text>
                                <Text>{data.title}{"\n"}</Text>
                                <Text style={{fontWeight:"bold"}}>{"\n"}Publiser: </Text>
                                <Text>{data.author}{"\n"}</Text>
                                <Text style={{fontStyle:"italic", color:"#2F7CFF"}}>{"\n"}from: </Text>
                                <Text style={{fontStyle:"italic", textDecorationLine:"underline"}}>YTD964</Text>
                            </Text>
                            <Button mode="contained" style={stylesd.dwnld} onPress={toggle}>
                                Download
                            </Button>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaProvider>
    );
}

// https://www.youtube.com/watch?v=f3EbDbm8XqY

