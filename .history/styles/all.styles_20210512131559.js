import {StyleSheet, Dimensions} from 'react-native';

var {width} = Dimensions.get("window")

width = width * 0.75

const AllStyles =  StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
        
        },
        scroller: {
            backgroundColor: 'white',
            alignItems: 'center',
            
            },
        scrollView:{
            backgroundColor:"white", 
            flex:1
        },
        textst : {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 40,
        color: 'red',
        },
        row:{flexDirection:"row"},
        yticon:{marginTop:36, color:"red", marginRight:17},
        textinp:{
        width:350, height:50, fontSize:18,
        marginTop:60,
        },
        dwnld:{
            marginTop:40 ,
             marginBottom:20,
             width:"50%", 
             backgroundColor:"red",
              height:50, 
              justifyContent:"center",
               alignItems:"center"
        },
        right:{
          marginRight:20,
        },
        img:{
            marginTop:80,
        },
        title:{ 
            padding:20,
            marginBottom: 20,
            fontSize:18,
            marginLeft: 20,
            marginRight:20,
            borderWidth:1, borderColor:'black'
        },
        btn:{
            backgroundColor:"#FF0000"
        },
        modalTouchable:{
            backgroundColor:"#2196F3",
           height:30,width:"50%",
         justifyContent:"center",
         alignItems:"center"
        },
         modalView:{
          justifyContent:"center",
          alignItems:"center", 
          padding:27,
          backgroundColor:"white"
        },
        label_url:{
            fontSize:25,
             marginTop:130
        }, 
        per_touch:{
            marginTop:50,
             width:"60%",
              backgroundColor:"red",
               height:47
            }, 
        message:{ 
            fontSize:20,
                marginBottom:20
        }, 
        drawer:{
            margin:0,
             width:width,
              backgroundColor:"azure", 
              borderRightWidth:2.2,
            },
            headingError:{
                marginTop:40,
                 fontSize:30
                },
            subHeadingError:{
                textDecorationLine:"underline",
                marginTop:40,
                marginBottom:20
            },
    });

export default AllStyles;