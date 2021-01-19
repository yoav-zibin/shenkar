/* eslint-disable @typescript-eslint/no-explicit-any*/
import 'react-native-gesture-handler';
import React from 'react';
import {StateProvider, useStoreContext} from './common/store';
import {StyleSheet, View} from 'react-native';
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useFonts} from 'expo-font';
import {AppLoading} from 'expo';
import {StatusBar} from 'expo-status-bar';
import AlertProvider from './common/alerts/AlertProvider';
import Home from './home';
import {NavigationContainer} from '@react-navigation/native';
import Login from './Login';
import {createStackNavigator} from '@react-navigation/stack';
import {ChooseActivityScreen} from './common/ChooseActivityScreen';
import {ChooseGameScreen} from './common/ChooseGameScreen';
import {localize} from './common/localize';
import {PlayAreaScreen} from './common/PlayAreaScreen';
import {DEBUGGING_OPTIONS} from './common/debugging';
import LanguageSelect from './common/LanguageSelect';
import SettingsScreen from './common/SettingsScreen';

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
      signIn: () => void;
      signOut: () => void;
      selectLanguage: (languageId: string) => void;
    }
  | undefined;

export const AuthContext = React.createContext<authContext>(undefined);

export default function App() {
  const {appState} = useStoreContext();

  const [state, dispatch] = React.useReducer(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (prevState: any, action: any) => {
      switch (action.type) {
        case 'SIGN_IN':
          return {
            ...prevState,
            isLogged: true,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isLogged: true,
            languageId: null,
          };
        case 'LANGUAGE_SELECT':
          return {
            ...prevState,
            languageId: action.payload,
          };
      }
    },
    {
      isLogged: false,
      languageId: null,
    }
  );

  React.useEffect(() => {
    (async () => {
      try {
        const language = DEBUGGING_OPTIONS.IGNORE_ASYNC_STORAGE ? null : await AsyncStorage.getItem('language');
        dispatch({type: 'LANGUAGE_SELECT', payload: language});
      } catch (e) {
        console.error('Error: restoring language failed at APP.js => error: ', e);
      }
    })();
  }, []);

  const authContext: authContext = React.useMemo(
    () => ({
      signIn: () => {
        dispatch({type: 'SIGN_IN'});
      },
      signOut: () => {
        AsyncStorage.removeItem('language');
        dispatch({type: 'SIGN_OUT'});
      },
      selectLanguage: (languageId: string) => {
        dispatch({type: 'LANGUAGE_SELECT', payload: languageId});
      },
    }),
    []
  );

  const [fontsLoaded] = useFonts({
    gan: require('./assets/fonts/gan.ttf'),
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  type LoginStackRoutes = {
    Login: undefined;
    LanguageSelect: undefined;
  };
  type GameStackRoutes = {
    Home: undefined;
    Settings: undefined;
    ChooseGame: undefined;
    ChooseActivity: undefined;
    PlayArea: undefined;
  };
  const LoginStack = createStackNavigator<LoginStackRoutes>();
  const GameStack = createStackNavigator<GameStackRoutes>();

  return (
    <AuthContext.Provider value={authContext}>
      <StateProvider>
        <AlertProvider>
          <View style={styles.container}>
            <StatusBar backgroundColor="rgba(255,255,255,.1)" />
            <NavigationContainer>
              {state.isLogged === false || !state.languageId ? (
                <LoginStack.Navigator>
                  {state.isLogged === false ? (
                    <LoginStack.Screen name="Login" component={Login} options={{headerShown: false}} />
                  ) : (
                    <LoginStack.Screen
                      name="LanguageSelect"
                      component={LanguageSelect}
                      options={{headerShown: false}}
                    />
                  )}
                </LoginStack.Navigator>
              ) : (
                <GameStack.Navigator initialRouteName="Home">
                  <GameStack.Screen name="Home" component={Home} options={{headerShown: false}} />
                  <GameStack.Screen
                    name="ChooseGame"
                    component={ChooseGameScreen}
                    options={{headerTitle: localize('CHOOSE_GAME_SCREEN', appState)}}
                  />
                  <GameStack.Screen name="Settings" component={SettingsScreen} options={{headerShown: false}} />
                  <GameStack.Screen
                    name="ChooseActivity"
                    component={ChooseActivityScreen}
                    options={{headerTitle: localize('CHOOSE_ACTIVITY_SCREEN', appState)}}
                  />
                  <GameStack.Screen name="PlayArea" component={PlayAreaScreen} options={{headerTitle: 'שם המשחק'}} />
                </GameStack.Navigator>
              )}
            </NavigationContainer>
          </View>
        </AlertProvider>
      </StateProvider>
    </AuthContext.Provider>
  );
}
