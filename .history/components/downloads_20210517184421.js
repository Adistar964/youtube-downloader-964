
import React, {useState, useEffect} from "react";
import {Button, Drawer, Title} from "react-native-paper";
import {View,Linking, ScrollView} from "react-native";
import styles from "../styles/all.styles.js";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialcIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import Ionicon from "react-native-vector-icons/Ionicons";

export default function Downloads({navigation}){
    return (
        <View style={styles.scrollView}>
            <ScrollView contentStyle={styles.scroller}>
                <Title>Folders</Title>
            </ScrollView>
        </View>
    );
}