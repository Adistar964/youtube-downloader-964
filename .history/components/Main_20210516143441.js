import React, {useState, useEffect, useRef} from 'react';
import { StyleSheet, View, SafeAreaView, 
     TouchableOpacity,TouchableWithoutFeedback, PermissionsAndroid ,
      Alert, DrawerLayoutAndroid,
    Dimensions, Linking, ScrollView} from 'react-native';
import {Text, TextInput, Drawer, Button} from 'react-native-paper'; 
import Clipboard from '@react-native-community/clipboard';
import Icon from 'react-native-vector-icons/FontAwesome'; 
import fw5icon from 'react-native-vector-icons/FontAwesome5'; 
import Modal from 'react-native-modal';
import styles from '../styles/all.styles.js';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {SafeAreaProvider} from "react-native-safe-area-context";
import {requestMultiple, PERMISSIONS} from 'react-native-permissions';

// const askperm = async () => {
//     try {var granted = await PermissionsAndroid.requestMultiple(
//           [
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         PermissionsAndroid.PERMISSIONS.ACCESS_NETWORK_STATE
//       ],
//         {
//           title:"Allow Permissions",
//           message:"YTD964 needs some neccessary permissions ",
//           buttonPositive:"Grant",
//           buttonNegative:"Deny"
//         }
//     );
//     if (granted){
//       console.log("granted")
//     }else{
//       console.log("denied")
//     }
// }
//   catch(err){
//   console.log(err)
// }
// };


const askperm = () => {
  requestMultiple([PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE, PERMISSIONS.ANDROID.WRITE_EXTERNAL_STORAGE]).then(s => {
    console.log(s[PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE]);
    console.log("Hello")
  })
}



function App({navigation, navigator}) {

    const [url, seturl] = useState('')
    const [text, settext] = useState('')
    const [message, setmessage] = useState('an error occured!')
    const [visible, setvisible] = useState(false);

    const show = (m) => {
      setmessage(m);
      setvisible(true);
    }

    const permreq = () => {
    PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then(response => {
      if (response === true){

          if (url.trim().length != 0){fetch('https://www.youtube.com/oembed?url=' + url + "&format=json").then(data => {
            if (data.status !== 200){
              show('GIven URL is not valid!')
          }else{
            navigation.navigate('Details', {url:url});
          }
        }
        )
      }else{
        show('Enter the URL to continue !')
      }
          
      }else {askperm();}
    });
    };


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
            <Button mode="contained" style={styles.dwnld} onPress={askperm}>
                Download
            </Button>
        </View>
      </ScrollView>
    </View>
  </SafeAreaProvider>
);
}


export default App;
