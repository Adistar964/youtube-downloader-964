// const askperm = async () => {
//     try {var granted = await PermissionsAndroid.requestMultiple(
//           [
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
//       ],
//         {
//           title:"Allow Permissions",
//           message:"YTD964 needs some neccessary permissions ",
//           buttonPositive:"Grant",
//           buttonNegative:"Deny"
//         }
//     );
//     if (granted === PermissionsAndroid.RESULTS.GRANTED){
//       console.log("granted")
//     }else{
//       console.log("denied")
//       Alert.alert("Allow Permissions","Please give us permissions to download from the settings by going to Permissions > Storage > Allow",
//       [{text:"Allow", onPress:() => Linking.openSettings()}])
      
//     }
// }
//   catch(err){
//   console.log(err)
// }
// };

// const permreq = () => {
//   PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE).then(response => {
//     if (response === true){

//         if (url.trim().length != 0){fetch('https://www.youtube.com/oembed?url=' + url + "&format=json").then(data => {
//           if (data.status !== 200){
//             show('GIven URL is not valid!')
//         }else{
//           navigation.navigate('Details', {url:url});
//         }
//       }
//       )
//     }else{
//       show('Enter the URL to continue !')
//     }
        
//     }else {askperm();}
//   });
//   };

        // const render_right = (props) => {
        //     return (
        //     <Menu ref={ref => (menuRef[`menu${i}`] = ref)}
        //      button={<SimpleLine name="options-vertical" onPress={ref=>(menuRef[`menu${i}`].show())} {...props} style={props.style} size={20} />}  >
        //         <MenuItem onPress={() => open_func(type,v,nav)} > Open </MenuItem>
        //         <MenuItem onPress={() => share_func(type,v)} > Share </MenuItem>
        //     </Menu>
        //     );
        // }