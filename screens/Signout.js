import React, {useState} from 'react';
import {TouchableOpacity,Text,View} from 'react-native';
import { StackActions } from '@react-navigation/native';
import firebase from "../database/firebase"


import 'react-native-gesture-handler';

function Signout(props) {

  const [error, setError] = useState('');
  
    const signOut = async () => {
      try {
        const response = await firebase.auth.signOut();
        props.navigation.dispatch(StackActions.replace('Signin'));
      } catch (err) {
        setError(err.message);
      }
    }
  return (
    <View style={{flex:1, justifyContent:'center', backgroundColor:'#fff'}}>
      <TouchableOpacity style={{width:132, height:44, alignSelf:'center', backgroundColor:'#79BCC8', borderRadius:45}} title='Sign Up' onPress={()=>signOut()}>
        <Text style={{color:'white', alignSelf:'center', marginTop:'6%', fontSize:20 }}>Sign Out</Text>
      </TouchableOpacity>      
    </View>
  )
}

export default Signout;