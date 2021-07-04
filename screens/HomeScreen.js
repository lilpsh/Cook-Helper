import React,{useEffect, useState} from 'react';
import { ScrollView, TouchableOpacity,StyleSheet,TextInput,View,Image,Text} from 'react-native';
// import { NavigationContainer, DrawerActions } from '@react-navigation/native';
import {  Icon ,Input,Card   } from 'react-native-elements';

import 'react-native-gesture-handler';
import firebase from "../database/firebase"


function HomeScreen(props) {

  const [recipes,setRecipes]=useState([]);

  const [like, setLike] = useState(false)
  
  const [search,setSearch]=useState('');

  function filterList(recipes) {
    return recipes.filter(
      (listItem) =>
        listItem.title
          .toLowerCase()
          .includes(search.toLowerCase()),
    );
  }

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

  return (
    <View style={styles.wholeView}>
      <View style={styles.search}>
        <Icon
          name='search'  
          color="#fff"
          type='font-awesome-5' 
        />
        <TextInput style={styles.searchInput}
        placeholder="Find Recipe"
          onChangeText={(search) => setSearch(search)}
        />
      </View>
      <ScrollView style={{marginTop:15}}>
          {filterList(recipes).map(recipe => {
            return (
              <TouchableOpacity style={styles.wholeCard}  key={recipe.id} onPress={()=>{
                props.navigation.navigate('RecipeScreen', {
                  recipeId: recipe.id
                })
              }} >
                <View>
                  <Image style={styles.cardImage} source={{ uri: recipe.photo }} />
                  <View style={styles.cardTextAndLike}>
                    <Text style={styles.cardText}>{recipe.title}</Text>
                    <Icon style={{marginRight:"20%"}}
                      name='heart'  
                      color="#79BCC8"
                      type='font-awesome-5' 
                      solid={like}
                      onPress={()=>setLike(!like)}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            );
          })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  wholeView:{
    flex:1, 
    backgroundColor:'#79BCC8',
  },
  search:{
    marginTop:5,
    marginBottom:5,
    flexDirection:'row',    
    alignContent:'center',
    justifyContent:'center'
  },
  searchInput:{
    marginLeft:16,
    height:30,
    width:290, // width:"70%",
    borderWidth:1, //borderWidth:1,
    fontSize:18, //fontSize:18,
    borderColor:'#fff',
    backgroundColor:'#fff',
    borderRadius:7
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

export default HomeScreen;
