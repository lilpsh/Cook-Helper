// import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer,DrawerActions} from '@react-navigation/native';
import { createDrawerNavigator,DrawerContentScrollView,DrawerItemList } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen'
import SigninScreen from './screens/SigninScreen'
import SignupScreen from './screens/SignupScreen'
import BuyScreen from './screens/BuyScreen'
import Signout from './screens/Signout'
import RecipeScreen from './screens/RecipeScreen'



const Stack = createStackNavigator();


const Drawer = createDrawerNavigator();
// function CustomDrawerContent(props) {
//   return (
//     <DrawerContentScrollView {...props}>
//       <DrawerItemList {...props} />
//     </DrawerContentScrollView>
//   );
// }

function DrawerRoutes() {
  return (
    <Drawer.Navigator initialRouteName="">
      <Drawer.Screen name="Home" component={HomeScreen} />
      <Drawer.Screen name="BuyScreen" component={BuyScreen} />
      <Drawer.Screen name="Signout" component={Signout} />
    </Drawer.Navigator>
  );
}

function App() {
  return(
    <NavigationContainer>
      <Stack.Navigator 
        screenOptions={{
          headerStyle: {
            backgroundColor: '#79BCC8',
          },
          headerTintColor: '#ffffff',
        }}
      >
        <Stack.Screen 
          name="Signin" 
          component={SigninScreen}
          options={{
            headerTintColor: '#ffffff',
          }} 
        />
        <Stack.Screen 
          name="Signup" 
          component={SignupScreen} 
          options={{
            headerTintColor: '#ffffff',
          }} 
        />
        <Stack.Screen name="Cook" component={DrawerRoutes} />
        <Stack.Screen name="RecipeScreen" component={RecipeScreen} />
        <Stack.Screen name="BuyScreen" component={BuyScreen} />
        <Stack.Screen name="Signout" component={Signout} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;


























/////////////////////////////////////////////////////////////////---------------------------------------------
// const Stack = createStackNavigator()

// function MyStack() {
//   return(<>
//     <Stack.Navigator>
//       <Stack.Screen 
//         name="Signup" 
//         component={SignupScreen} 
//         // options={{title:"Sign up"}}
//       />
//       <Stack.Screen 
//         name="Signin" 
//         component={SigninScreen} 
//       />
//       <Stack.Screen 
//         name="Home" 
//         component={HomeScreen}
//       />
//     </Stack.Navigator>
//     </>
//   )
// }

// export default function App() {
//   return (
//     <NavigationContainer>
//       <MyStack />
//     </NavigationContainer>
//   );
// }


/////////////////////////////////////////////////////////////////---------------------------------------------
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
