import {  StyleSheet, View } from "react-native";
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider, useSelector } from "react-redux";
import store, { RootState } from "@/Store/Store";
import Form from "@/pages/Form";
import PointVente from "@/pages/PointVente";
import Planing from "@/pages/Planing";
import SignIn from "@/pages/SignIn";
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useEffect } from "react";
import Settings from "@/pages/Settings";
import Feather from '@expo/vector-icons/Feather';
import Comments from "@/pages/Comments";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Form"
      screenOptions={{
        headerStyle: {
          backgroundColor: '#1c2b4b',
           
        },
        headerTitleAlign: 'left',
        headerTitleStyle: {
          
        },
        headerLeftContainerStyle: {
          
        },
        headerTintColor: '#fff',
        drawerStyle: {
          backgroundColor: 'white',
        },
        drawerActiveTintColor: 'green',
        drawerInactiveTintColor: 'gray',
      }}
    >
      <Drawer.Screen
        name="Form"
        component={Form}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="form" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="PointVente"
        component={PointVente}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="store-alt" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Planing"
        component={Planing}
        options={{
          drawerIcon: ({ color, size }) => (
            <AntDesign name="calendar" size={size} color={color} />
          ),
        }}
      /> 

      <Drawer.Screen
      name="Settings" 
      component={Settings}
      options={{
        drawerIcon: ({ color, size }) => (
          <Feather name="settings" size={size} color={color} />
        ),
      }}
      />
      <Drawer.Screen
      name="comments" 
      component={Comments}
      options={{
        drawerIcon: ({ color, size }) => (
      <FontAwesome name="commenting-o" size={size} color={color} />        ),
      }}
      />
    </Drawer.Navigator>
  );
};

const Main = () => {
  
  const { user } = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    
  }, [user]);
  return (
    <View style={styles.container}>
      {user && user.token ? <DrawerNavigator /> : <SignIn />}
    </View>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer independent={true}>
          <Main />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
