import 'react-native-gesture-handler';
import React from 'react';
import {StateProvider} from './common/store';
import {StyleSheet, View} from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFonts} from 'expo-font';
import {AppLoading} from 'expo';
import LanguageSelect from './common/LanguageSelect';
import {StatusBar} from 'expo-status-bar';
import {Main} from './common/Main';
import {DEBUGGING_OPTIONS} from './common/debugging';
import AlertProvider from './common/alerts/AlertProvider';

const styles = StyleSheet.create({
  statusBar: {
    height: Constants.statusBarHeight,
  },
  container: {
    flex: 1,
  },
});

export type authContext =
  | {
      signIn: () => Promise<void>;
      signOut: () => void;
    }
  | undefined;

export const AuthContext = React.createContext<authContext>(undefined);

export default function App() {
  const [state, dispatch] = React.useReducer(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            language: action.language,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            language: null,
          };
      }
    },
    {
      language: null,
    }
  );

  React.useEffect(() => {
    (async () => {
      let language;
      try {
        language = DEBUGGING_OPTIONS.IGNORE_ASYNC_STORAGE ? null : await AsyncStorage.getItem('language');
      } catch (e) {
        console.error('Error: restoring language failed at APP.js => error: ', e);
      }
      dispatch({type: 'SIGN_IN', language});
    })();
  }, []);

  const authContext: authContext = React.useMemo(
    () => ({
      signIn: async () => {
        const language = await AsyncStorage.getItem('language');
        dispatch({type: 'SIGN_IN', language});
      },
      signOut: () => {
        AsyncStorage.removeItem('language');
        dispatch({type: 'SIGN_OUT'});
      },
    }),
    []
  );

  const [fontsLoaded] = useFonts({
    gan: require('./assets/fonts/gan.ttf'),
  });

  if (!fontsLoaded || state.isLoading) {
    return <AppLoading />;
  }

  return (
    <AuthContext.Provider value={authContext}>
      <View style={{flex: 1, backgroundColor: 'rgb(250,250,250)'}}>
        <StateProvider>
          <AlertProvider>
            <View style={styles.container}>
              <StatusBar backgroundColor="rgba(255,255,255,.1)" />
              {state.language == null ? <LanguageSelect /> : <Main />}
            </View>
          </AlertProvider>
        </StateProvider>
      </View>
    </AuthContext.Provider>
  );
}
