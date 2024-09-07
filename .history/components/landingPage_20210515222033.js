import React, {useState, useEffect} from "react";
import {Button, Drawer, Title} from "react-native-paper";
import {View} from "react-native";
import styles from "../styles/all.styles.js";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

export default function Landing({navigation}){

    const [open, setOpen] = useState(false);
  
    const toggleModal = () => {
        setOpen(!open);
    }

    const navigate = s => {setOpen(false);navigation.navigate(s)}

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

    var h_left = () => <MaterialIcon.Button backgroundColor="blue" name="menu" size={35} onPress={call} styles={{marginLeft:20}} />

    useEffect(() => {navigation.setOptions({headerLeft:h_left})})

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
                    onPress={() => {navigation.navigate("Home")}}>
                    URL Paste Based
                </Button>
            </View>
            <View style={{marginTop:100}}>
                <Title style={{margin:20}}>Youtube UI Based</Title>
                <Title style={{margin:20}}>(Easy And Advanced)</Title>
                <Button style={{backgroundColor:"red", margin:10}}
                    mode="contained"
                    onPress={() => {navigation.navigate("web")}}>
                    Youtube UI based
                </Button>
            </View>
        </View>
    );
}