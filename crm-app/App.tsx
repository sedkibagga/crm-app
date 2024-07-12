import { PaperProvider } from 'react-native-paper';
import Form from './pages/Form';
import SignIn from './pages/SignIn';
import { Provider } from 'react-redux';
import store from './app/store';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Planing from './pages/Planing';

const App = () => {
  
  const Stack = createNativeStackNavigator();

  return (
    <Provider store={store}>
    <PaperProvider>
    <NavigationContainer>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="SignIn"  component={SignIn} />
      <Stack.Screen name="Form" component={Form} />
      <Stack.Screen name='Planing' component={Planing} />
      </Stack.Navigator>
    </NavigationContainer>
    </PaperProvider>

    </Provider>
  );
}

export default App;
