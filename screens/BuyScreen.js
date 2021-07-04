import React,{useEffect, useState} from 'react';
import { Alert, ScrollView, TouchableOpacity,StyleSheet,View,Image,Text} from 'react-native';
import {  Button   } from 'react-native-elements';

// import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import firebase from "../database/firebase"

import 'react-native-gesture-handler';

function BuyScreen(props) {
  const [recipes,setRecipes]=useState([]);
  useEffect(()=>{
    firebase.db.collection('recipes').onSnapshot((querySnapshot) => {
      const recipes = [];

      querySnapshot.docs.forEach((doc) => {
        const {title,time,photo,ingredients,cost,video} = doc.data();
        recipes.push({
          id:doc.id,
          title,
          time,
          photo,
          ingredients,
          cost,
          video
        });
      });

      setRecipes(recipes);
    });
  },[]);

  const openConfirmationAlert = () => {
    Alert.alert("Buy","Are you sure?", [
      {text:'No', onPress:()=>Alert.alert("Next time")},
      {text:'Yes', onPress:()=>Alert.alert("You bought it")},
    ])
  }
  
  return (
    <ScrollView style={styles.wholeView}>
      {recipes.map(recipe => {
        return (
          <TouchableOpacity style={styles.wholeCard}  key={recipe.id} >
            <View>
              <Image style={styles.cardImage} source={{ uri: recipe.photo }} />
              <View style={styles.cardTextAndLike}>
                <Text style={styles.cardText}>{recipe.title}</Text>
                <Button buttonStyle={{marginRight:"7%"}} title={`Buy $${recipe.cost}`} onPress={openConfirmationAlert} />
              </View>
            </View>
          </TouchableOpacity>
        );
      })
      }
    </ScrollView>
  )
}
const styles = StyleSheet.create({
  wholeView:{
    flex:1, 
    backgroundColor:'#79BCC8',
  },
  wholeCard:{
    marginBottom:46,
    alignSelf:'center',
    width:360,
    height:185,
    borderRadius:35,
    backgroundColor:'#fff',
    shadowColor: "#000",
    shadowOffset: {
	    width: 0,
	    height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,
    elevation: 7,
  },
  cardImage: {
    width:360,
    height:120,
    borderTopLeftRadius:35,
    borderTopRightRadius:35,
    resizeMode:'cover'
  },
  cardTextAndLike:{
    height:65,
    alignItems:'center',
    justifyContent:"space-between",
    flexDirection:"row"
  },
  cardText:{
    marginLeft:"10%",
    color:'#79BCC8',
    fontSize:20,
    fontWeight:"900",
  },
});
export default BuyScreen;