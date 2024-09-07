import React, {useState, useEffect} from "react";
import {Button, Drawer, Title} from "react-native-paper";
import {View,Linking} from "react-native";
import styles from "../styles/all.styles.js";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Modal from "react-native-modal"
import Ionicon from "react-native-vector-icons/Ionicons"
import {useNetInfo} from "@react-native-community/netinfo"

export default function Landing({navigation}){

    

    const [open, setOpen] = useState(false);
  
    const call = () => {
        setOpen(!open)
     }


    var h_left = () => <MaterialIcon.Button backgroundColor="red" name="menu" size={35} onPress={call} styles={{marginLeft:20}} />

    const toggleModal = () => {
        setOpen(!open);
    }

    const navigate = s => {setOpen(false);navigation.navigate(s)}

    const settings_icon = ({size, color}) => <Ionicon size={size} color={color} name="settings" />

    const DrawerView = () => {
        return (
        <View style={{flex:1}} accessible={true}>
            <Drawer.Section title="Menu">
              <Drawer.Item label="About" icon="card-account-details-outline"
                onPress={() => {navigate('about')}} />
              <Drawer.Item label="Settings" icon={settings_icon} 
              onPress={() => {Linking.openSettings();}} />
              <Drawer.Item label="Help" icon="help-circle-outline" 
            onPress={() => {navigate('help')}}/>
            </Drawer.Section>
        </View>
        );
    }  

    const netinfo = useNetInfo();

   

    useEffect(() => {
        navigation.setOptions({headerLeft:h_left});
        if (!netinfo.isConnected) {
            navigation.navigate("noCon")
        }
    })

    const nav = (s) => {
        if(netinfo.isConnected){
            navigation.navigate(s)
        }else{
            navigation.navigate("noCon")
        }
    }

    return (
        <View style={styles.container, {margin:50}}>
            <Modal useNativeDriver propagateSwipe
            style={styles.drawer}
            animationIn="slideInLeft" animationOut="slideOutLeft"
            onSwipeComplete={toggleModal}
            swipeDirection="left"
            onBackdropPress={toggleModal} hideModalContentWhileAnimating visible={open}
            animationInTiming={5}>
              <DrawerView />
          </Modal>
            <View>
                <Title style={{margin:20}}>Url copy Paste Based</Title>
                <Title style={{margin:20}}>(Fast And minimal)</Title>
                <Button style={{backgroundColor:"red", margin:10}}
                    mode="contained"
                    onPress={() => {nav("Home")}}>
                    URL Paste Based
                </Button>
            </View>
            <View style={{marginTop:100}}>
                <Title style={{margin:20}}>Youtube UI Based</Title>
                <Title style={{margin:20}}>(Easy And Advanced)</Title>
                <Button style={{backgroundColor:"red", margin:10}}
                    mode="contained"
                    onPress={() => {nav("web")}}
                    icon="youtube">
                    Youtube UI based
                </Button>
            </View>
        </View>
    );
}