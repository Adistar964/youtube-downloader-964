import React, {useState, useEffect} from 'react';
import {View, Dimensions, ScrollView, Linking} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Fw5Icon from 'react-native-vector-icons/FontAwesome5';
import FwIcon from 'react-native-vector-icons/FontAwesome';
import styles from '../styles/all.styles.js';
import Modal from 'react-native-modal';
import {Drawer, List, SubHeading} from 'react-native-paper';



var {width}= Dimensions.get("window");
width = width * 0.75;
const spaces = "           "
const purpose = "It was created to give fast experience to user" + spaces + "with downloading youtube videos"

const android_icon = props => <FwIcon name="android" {...props} />;
const user_icon = (props) => <Fw5Icon name="user-alt" {...props} />;
const about_creator_icon = props => <List.Icon {...props} icon={user_icon} />;
const users_icon = props => <FwIcon name="users" {...props} />;
const settings_icon = ({size, color}) => <Ionicon size={size} color={color} name="settings" />;

export default function About({navigation}){

    const [open, setOpen] = useState(false);
  
    const toggleModal = () => {
        setOpen(!open);
    }

    const navigate = s => {setOpen(false);navigation.navigate(s)}

    const DrawerView = () => {
        return (
        <View style={{flex:1}} accessible={true}>
            <Drawer.Section title="Menu">
              <Drawer.Item label="Home" icon="home"
                onPress={() => {navigate('land')}} />
              <Drawer.Item label="Settings" icon={settings_icon} 
              onPress={() => {Linking.openSettings();}} />
              <Drawer.Item label="Help" icon="help-circle-outline" 
            onPress={() => {navigate('help')}}/>
            </Drawer.Section>
        </View>
        );
    }  
    
    const call = () => {
        setOpen(!open)
     }
 
       var h_left = () => <MaterialIcon.Button backgroundColor="blue" name="menu" size={35} onPress={call} styles={{marginLeft:20}} />

     useEffect(() => {navigation.setOptions({headerLeft:h_left})})


    return (
    <View style={styles.scrollView}>
      <ScrollView contentContainerStyle={styles.scroller}>
          <Modal useNativeDriver propagateSwipe
            style={styles.drawer}
            animationIn="slideInLeft" animationOut="slideOutLeft"
            onSwipeComplete={toggleModal}
            swipeDirection="left"
            onBackdropPress={toggleModal} hideModalContentWhileAnimating visible={open}
            animationInTiming={5}>
              <DrawerView />
          </Modal>
          <View style={{flex:1, alignSelf:"stretch"}}>
            <List.Section title="About YTD-964">
                  <List.Accordion
            title="About Creator"
            left={props => <List.Icon {...props} icon={about_creator_icon} />}>
            <List.Item title="Name" description="Ali" />
            <List.Item title="Team" description="Adistar-964" />
                  </List.Accordion>
      
                  <List.Accordion
            title="About Team"
            left={props => <List.Icon {...props} icon={users_icon} />}>
            <List.Item title="Team name" description="Adistar-964" />
                  </List.Accordion>
                  <List.Accordion
                  title="About App" left={props => <List.Icon {...props} icon={android_icon} /> } >
            <List.Item  title="Name" description="YTD-964" />
            <List.Item title="Full-Form" description="Youtube-Downloader-964" />
            <List.Item titleNumberOfLines={3} title="Purpose" description={purpose} />
                  </List.Accordion>
                </List.Section>
          </View>
      </ScrollView>
    </View>
    );

}