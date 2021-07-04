import React, {useState} from 'react';
import {TouchableOpacity,View,StyleSheet,TextInput, Image} from 'react-native'
import { Text } from 'react-native-elements';
import { StackActions } from '@react-navigation/native';
import firebase from "../database/firebase"

function SigninScreen(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
  
    const signIn = async () => {
      try {
        const response = await firebase.auth.signInWithEmailAndPassword(email,password);
        props.navigation.dispatch(StackActions.replace('Cook'));
      } catch (err) {
        setError(err.message);
      }
    }
  
    return (
      <View style={styles.wholeView}>
        <View style={styles.formView}>
          <Image 
            style={styles.userLogo}
            source={{
              uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFCzxivJXCZk0Kk8HsHujTO3Olx0ngytPrWw&usqp=CAU',
            }}
          />
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.formInput}
          />
          <TextInput
            placeholder="Password"
            value={password}
            onChangeText={setPassword}
            style={styles.formInput}
          />
          {
            error ? <Text style={{alignSelf:'center',color:'red'}} >{error}</Text> : null
          }
          <TouchableOpacity style={styles.formButton} title='Sign In' onPress={()=>signIn()}>
            <Text style={styles.buttonText}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{marginTop:10, alignSelf:'center'}} onPress={()=>props.navigation.navigate('Signup')} >
            <Text style={{alignSelf:'center',color:'#79BCC8'}}>Don't have an account? Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  const styles = StyleSheet.create({
    wholeView:{
      flex:1, 
      alignItems:'center', 
      backgroundColor:'#79BCC8'
    },
    formView:{
      marginTop:'30%',//'30%'
      width:308, //"70%"
      height:322, //'40%'
      justifyContent:'center', 
      alignContent:'center', 
      backgroundColor:'#ffffff', 
      borderRadius:20
    },
    userLogo:{
      position:'absolute',
      borderRadius:50,
      top:-50,
      left:106,
      width:100,
      height:100,
    },
    formInput:{
      marginBottom:27,
      justifyContent:'center', 
      alignSelf:'center', 
      height:30,
      width:200, // width:"70%",
      borderWidth:1, //borderWidth:1,
      fontSize:18, //fontSize:18,
      borderColor:'#79BCC8'//borderColor:'#79BCC8'
    },
    formButton:{
      width:132, 
      height:44, 
      alignSelf:'center', 
      backgroundColor:'#79BCC8', 
      borderRadius:45
    },
    buttonText:{
      color:'white', 
      alignSelf:'center', 
      marginTop:'6%', 
      fontSize:20,
    }
  });

  export default SigninScreen;