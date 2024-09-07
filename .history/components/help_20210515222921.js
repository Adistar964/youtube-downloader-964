import React, {useState, useEffect} from 'react';
import {Text, Headline,  Title, Paragraph, List, Drawer} from 'react-native-paper';
import {ScrollView, View, Linking} from 'react-native';
import styles from '../styles/all.styles.js';
import Modal from "react-native-modal";
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';

const render_desc = m => <Paragraph>{m}</Paragraph>

const case_1 = () => render_desc("Sometimes you will need to retry by clicking the download button again incase your video is not downloading");
const case_2 = () => render_desc("Sometimes restarting the app might fix your error");
const case_3 = () => render_desc("Cache might give you some error, so you can try clearing cache from settings");
const case_4 = () => render_desc("You might need to reinstall your app by uninstalling and then installing it again");
const case_5 = () => render_desc("you can also try wiping your app's data completely from settings");
const case_6 = () => render_desc("If none of the cases from above helped you, then you might contact us from our email");

export default function Help({navigation}){


    const [open, setOpen] = useState(false);

    const toggleModal = () => {
        setOpen(!open);
    }

    const settings_icon = ({size, color}) => <Ionicon size={size} color={color} name="settings" />

    const navigate = s => {setOpen(false);navigation.navigate(s)}

    const DrawerView = () => {
        return (
        <View style={{flex:1}} accessible={true}>
            <Drawer.Section title="Menu">
              <Drawer.Item label="Home" icon="home"
                onPress={() => {navigate('land')}} />
              <Drawer.Item label="Settings" icon={settings_icon} 
              onPress={() => {Linking.openSettings();}} />
              <Drawer.Item label="About" icon="card-account-details-outline" 
            onPress={() => {navigate('about')}}/>
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
            <Modal useNativeDriver propagateSwipe
            style={styles.drawer}
            animationIn="slideInLeft" animationOut="slideOutLeft"
            onSwipeComplete={toggleModal}
            swipeDirection="left"
            onBackdropPress={toggleModal} hideModalContentWhileAnimating visible={open}
            animationInTiming={5}>
                <DrawerView />
            </Modal>
            <ScrollView contentContainerStyle={styles.scroller}>
                <Title style={styles.headingError}>
                    Facing Error? 
                </Title>
                <Headline style={styles.subHeadingError}>
                    You can solve them in following ways:
                </Headline>
                <View style={{alignSelf:"stretch"}}>
                    <List.Section>
                        <List.Subheader>Errors</List.Subheader>
                        <List.Accordion title="Case 1">
                            <List.Item title="Retry" description={case_1} />
                        </List.Accordion>
                        <List.Accordion title="Case 2">
                            <List.Item title="Restart" description={case_2} />
                        </List.Accordion>
                        <List.Accordion title="Case 3">
                            <List.Item title="Cache Delete" description={case_3} />
                        </List.Accordion>
                        <List.Accordion title="Case 4">
                            <List.Item title="Reinstalling" description={case_4} />
                        </List.Accordion>
                        <List.Accordion title="Case 5">
                            <List.Item title="Data Delete" description={case_5} />
                        </List.Accordion>
                        <List.Accordion title="Case 6">
                            <List.Item title="Contact us" description={case_6} />
                        </List.Accordion>
                    </List.Section>
                </View>
            </ScrollView>
        </View>
    );
}