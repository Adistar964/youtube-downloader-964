import React, {useState, useEffect, useRef} from "react";
import {List, Divider, Text} from "react-native-paper";
import {View,Linking, ScrollView} from "react-native";
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
import Video from "react-native-video";

const fs = RNFetchBlob.fs;
var dirs = fs.dirs;
const dir = dirs.DownloadDir + "/ytd964";

export default function Viewer({navigation, route}){
    const file  = route.params.file;
    const filename = route.params.name;

    useEffect(() => {
        navigation.setOptions({title:filename})
    })

    return (
        <View style={styles.container}>
            <Video source={{uri:`file:///${dir}/${file}`}}
            controls style={{
                position: 'absolute',
                top: 0,
                left: 0,
                bottom: 0,
                right: 0,
            }}
            fullscreen resizeMode="contain" />
        </View>
    );
} 