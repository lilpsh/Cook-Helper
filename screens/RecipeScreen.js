import React,{useState,useEffect} from 'react';
import {  ListItem,Icon   } from 'react-native-elements';
import { Modal,Pressable,ActivityIndicator,View,ScrollView,SafeAreaView,StyleSheet,Image,Text  } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";

import firebase from "../database/firebase"

import 'react-native-gesture-handler';

function RecipeScreen(props) {

  const [recipe, setRecipe] = useState();
  const [loading, setLoading] = useState(true)
  const [modalVisible, setModalVisible] = useState(false);


  const getRecipeById = async (id) => {
    const dbRef = await firebase.db.collection('recipes').doc(id)
    const doc = await dbRef.get();
    const recipe = doc.data();
    setRecipe({
      ...recipe,
      id:doc.id,
    });
    setLoading(false);
  };

  useEffect(()=>{
    getRecipeById(props.route.params.recipeId);
  }, []);

  if (loading) {
    return(
      <View>
        <ActivityIndicator size="large" color="#9e9e9e" />
      </View>
    )
  }

  return (
    <>
      <Image style={styles.image} source={{ uri: recipe.photo }} />
        <View style={styles.wholeContent}>
          <Text style={styles.title}>{recipe.title}</Text>

          <View style={styles.time}>
            <Icon 
              name='stopwatch'  
              color="#fff"
              type='font-awesome-5'
            />
            <Text style={styles.timeText}>{recipe.time}</Text>
          </View>
            
          <View style={styles.ingredients}>
            <Text style={styles.ingredientsText}>Ingredients(scroll):</Text>
            <ScrollView style={styles.ingredientsList}>
              {
              recipe.ingredients.map(ingredient => {
                return (
                    <ListItem containerStyle={{backgroundColor:"white",width:"90%",alignSelf:'center',marginBottom:'1%'}} key={ingredient}>
                      <ListItem.Content style={{height:20, alignItems:'center'}}>
                        <ListItem.Title style={{color:'#79BCC8', fontSize:18,fontWeight:"500",}} >{ingredient}</ListItem.Title>
                      </ListItem.Content>
                    </ListItem>
                  );
                })
              }
            </ScrollView>
          </View>
            
          <View style={styles.centeredView}>
            <Modal
              animationType="slide"
              transparent={true}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <View style={styles.centeredView}>
                <View style={styles.modalView}>
                  <SafeAreaView >
                    <YoutubePlayer height={250} width={350} videoId={recipe.video} />
                  </SafeAreaView>
                  <Text style={styles.modalText}>Watch Video</Text>
                  <Pressable
                    style={[styles.button, styles.buttonClose]}
                    onPress={() => setModalVisible(!modalVisible)}
                  >
                    <Text style={styles.textStyle}>Hide Helper</Text>
                  </Pressable>
                </View>
              </View>
            </Modal>
            <Pressable style={[styles.button, styles.buttonOpen]}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.textStyle}>Helper</Text>
            </Pressable>
          </View>
        </View>
    </>
  )
}
const styles = StyleSheet.create({
  image:{
    width:"100%",
    height:"40%",
    resizeMode:'stretch'
  },
  wholeContent:{
    flex:1, 
    backgroundColor:'#79BCC8',
    width:"100%",
    justifyContent:'center',
    alignItems:'center',
  },
  title:{
    color:'#fff',
    fontSize:30,
    fontWeight:"900",
  },
  time:{
    marginTop:'2%',
    width:"35%",
    justifyContent:"space-between",
    flexDirection:'row',
    alignItems:'center'
  },
  timeText:{
    color:'#fff',
    fontSize:20,
    fontWeight:"900",
  },
  ingredients:{
    height:"50%",
    marginTop:'2%',
    width:"90%",
    borderRadius:10,
    backgroundColor:"#fff"
  },
  ingredientsText:{
    marginLeft:'2%',
    color:'#79BCC8',
    fontSize:20,
    fontWeight:"500",
  },
  ingredientsList:{
    width:"100%",
    height:"90%"
  },



  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    marginBottom:20,
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    marginBottom:20,
    backgroundColor: "#79BCC8",
  },
  textStyle: {
    fontSize:26,
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color:'#79BCC8',
    fontSize:20,
    fontWeight:"900",
    marginBottom: 15,
    textAlign: "center"
  }
});
export default RecipeScreen;