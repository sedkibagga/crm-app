import { PaperProvider } from 'react-native-paper';
import Form from './pages/Form';
import SignIn from './pages/SignIn';
import PlaningComponent, { PlaningComponentProps } from './components/PlaningComponent';
import Planing from './pages/Planing';
import { Provider } from 'react-redux';
import store from './app/store';

const App = () => {
  

  return (
    <Provider store={store}>

    <PaperProvider>
      <Planing/>
    </PaperProvider>

    </Provider>
  );
}

export default App;
