import React, {useState, useEffect} from 'react';
import { View, TouchableOpacity,Alert, Linking, ScrollView} from 'react-native';
import {Text, TextInput, Button} from 'react-native-paper'; 
import Clipboard from '@react-native-community/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import fw5icon from 'react-native-vector-icons/FontAwesome5'; 
import Modal from 'react-native-modal';
import styles from '../styles/all.styles.js';
import {SafeAreaProvider} from "react-native-safe-area-context";
import { PERMISSIONS, requestMultiple } from 'react-native-permissions';
import {useNetInfo} from "@react-native-community/netinfo";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';




const alertContent = "Please give us permissions to download from the settings by going to Permissions > Storage > Allow";


function App({navigation, navigator}) {

    const [url, seturl] = useState('')
    const [text, settext] = useState('')
    const [message, setmessage] = useState('an error occured!')
    const [visible, setvisible] = useState(false);

    const show = (m) => {
      setmessage(m);
      setvisible(true);
    }

    const netinfo = useNetInfo();

    const download = () => {
      if (url.trim().length != 0){fetch('https://www.youtube.com/oembed?url=' + url + "&format=json").then(data => {
      // show(data.status.toString()); 
      if (data.status === 12029){
        show("Please connect to internet!")
      }     
      else if (data.status !== 200){
              show('GIven URL is not valid!')
          }else{
            navigation.navigate('Details', {url:url});
          }
        }
        )
      }else{
        show('Enter the URL to continue !')
      }
    }

    const navdwnld = () => navigation.navigate('downloads')

    const askperm = (func) => {
      const rationale = {
        title:"YTD-964", 
        message:"YTD-964 needs your Permissions in order to continue",
        buttonPositive:"Grant",
        buttonNegative:"Deny"
      }
      requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE ], rationale).then(res => {
        if (res[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === "granted" && res[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === "granted"){
          // if(netinfo.isConnected){func();}else{navigation.navigate("noCon")}
        }else if(res[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE] === "blocked" && res[PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE] === "blocked"){
          Alert.alert("Allow Permissions",alertContent,
          [
            {text:"Allow", onPress:() => Linking.openSettings()},
            {text:"Deny"}
          ])
        }
      })}

    const manageText = m => {
      settext(m);
      seturl(m);
    }  

    const paste = async () => {
    let data = await Clipboard.getString();
    manageText(data)
    }

    const handletext = (t) => {
      manageText(t)

    }


    var h_right = () => <MaterialIcon.Button backgroundColor="red" name="folder" size={35} styles={{marginRight:20}} onPress={() => askperm(navdwnld)} />;
    useEffect(()=>{navigation.setOptions({headerRight:h_right})})

    return (
  <SafeAreaProvider>
    <View style={styles.scrollView}>
      <ScrollView contentContainerStyle={styles.scroller}>
        <View style={styles.container}>
            <Modal isVisible={visible}
              onBackdropPress={() => {setvisible(false)}} coverscreen={false}
              swipeDirection={['up', 'left', 'right', 'down']} >
              <View style={styles.modalView}>
                  <Icon name="warning" size={35} style={{marginBottom:10}} color="red" />
                  <Text style={styles.message}>{message}</Text>
                  <TouchableOpacity style={styles.modalTouchable} onPress={() => setvisible(false)}>
                    <Text style={{color:"white"}}>OK</Text>
                  </TouchableOpacity>
              </View>
            </Modal>
            <View style={styles.row}>
                <Icon name="youtube-square" size={50} style={styles.yticon} />
              <Text style={styles.textst}>YTD-964</Text>
            </View>
            <Text style={styles.label_url}>Enter The URL</Text>
            <TextInput selectionColor="gray" style={styles.textinp} value={text}
              mode="outlined" label="Enter the URL"
              onChangeText={handletext}  theme={{colors:{primary:"red"}}} />
            <View style={{marginTop:20}}>
              <fw5icon.Button name="clipboard" backgroundColor="#33BAFF" size={25} onPress={paste}>
                Paste
              </fw5icon.Button>
            </View>
            <Button mode="contained" style={styles.dwnld} onPress={() => askperm(download)}>
                Download
            </Button>
        </View>
      </ScrollView>
    </View>
  </SafeAreaProvider>
);
}


export default App;
