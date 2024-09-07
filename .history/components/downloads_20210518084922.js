
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

const all_files = async () => {
    const fetch = await fs.ls(dir);
    return fetch;
}


export default function Downloads({navigation}){

    useEffect(() => {})

    const show_files = (v,i) => {
        var splitted = v.split('.mp');
        return (
            <List.Item title={splitted[0]} />
        );
    }

    return (
        <View style={styles.scrollView}>
            <ScrollView contentStyle={styles.scroller}>
                <List.Section title="Downlaoded">
                    {all_files.map(show_files)}
                </List.Section>
            </ScrollView>
        </View>
    );
}