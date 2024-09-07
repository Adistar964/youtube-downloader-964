import React, {useState, useEffect} from "react";
import {Button, Drawer, Title} from "react-native-paper";
import {View,Linking, ScrollView} from "react-native";
import styles from "../styles/all.styles.js";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialcIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import Modal from "react-native-modal";
import Ionicon from "react-native-vector-icons/Ionicons";
import {useNetInfo} from "@react-native-community/netinfo";
import {requestMultiple} from "react-native-permissions";

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

   

   
    const askperm = (s) => {
        const rationale = {
          title:"YTD-964", 
          message:"YTD-964 needs your Permissions in order to continue",
          buttonPositive:"Grant",
          buttonNegative:"Deny"
        }
        requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE, PERMISSIONS.CAMERA ], rationale).then(s => {
          if (s[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === "granted" && s[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === "granted"){
            navigation.navigate(s)
          }else{
            Alert.alert("Allow Permissions",alertContent,
            [{text:"Allow", onPress:() => Linking.openSettings()}])
          }
        })}

    const nav = (s) => {
        if(netinfo.isConnected){
            askperm(S)
        }else{
            navigation.navigate("noCon")
        }
    }

    const ytIcon = () => <MaterialcIcon name="youtube" color="white" size={27} />
    const urlIcon = () => <MaterialcIcon name="note-text-outline" color="white" size={27} />

    var h_right = () => <MaterialIcon.Button backgroundColor="red" name="folder" size={35} styles={{marginRight:20}} onPress={() => askperm("downloads")} />;

    useEffect(() => {
        navigation.setOptions({headerLeft:h_left});
        navigation.setOptions({headerRight:h_right});
        if (netinfo.isConnected === false) {
            navigation.navigate("noCon")
        }
    })


    return (
        <View style={styles.scrollView}>
            <ScrollView contentStyle={styles.scroller}>
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
                            icon={urlIcon}
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
                            icon={ytIcon}>
                            Youtube UI based
                        </Button>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
}