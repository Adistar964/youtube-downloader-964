import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Main from './components/Main.js';
import ShowDet from './components/showdet.js';
import About from './components/about.js';
import Help from './components/help.js';
import Web from "./compoenents/webmain"


Stack = createStackNavigator();


function StackNav () {


  React.useEffect(() => {
    SplashScreen.hide();
  });

    const config_home = {title:"YTD-964", headerStyle:{backgroundColor:"red"}}
    const config_about = {title:"About",headerStyle:{backgroundColor:"blue"}}
    const config_all = {headerTintColor:"white", headerTintStyle:{fontWeight:"bold"}}
    const config_help = {title:"Help",headerStyle:{backgroundColor:"blue"}}
    const config_det = {title:"Video Details", headerStyle:{backgroundColor:"red"}}
    const config_web = {title:"YTD-964", headerStyle:{backgroundColor:"blue"}}

    return  (
    <NavigationContainer>
      <Stack.Navigator screenOptions={config_all}>
        <Stack.Screen component={Web} options={config_web} name="Web" />
        <Stack.Screen component={Main} options={config_home} name="Home" />
        <Stack.Screen component={ShowDet} name="Details" options={config_det} />
        <Stack.Screen component={About} name="about" options={config_about} />
        <Stack.Screen component={Help} name="help" options={config_help} />
      </Stack.Navigator>
    </NavigationContainer>
    );
} 



export default StackNav;