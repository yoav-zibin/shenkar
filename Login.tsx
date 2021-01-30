/* eslint-disable @typescript-eslint/no-explicit-any
 */

import React, {Fragment, useEffect, useState} from 'react';
import {StyleSheet, Text} from 'react-native';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBbs01R7oXNzuVjhtVCpexnn2mjQuYV-zU',
  authDomain: 'shenkar-games.firebaseapp.com',
  projectId: 'shenkar-games',
  storageBucket: 'shenkar-games.appspot.com',
};
const f: any = firebase;
const facebook: any = Facebook;
!f.apps.length ? f.initializeApp(firebaseConfig) : f.app();

import {Container, Form, Input, Item, Button, Label} from 'native-base';

export type authContext =
  | {
      signIn: () => void;
      signOut: () => void;
      selectLanguage: (languageId: string) => void;
    }
  | undefined;

export const AuthContext = React.createContext<authContext>(undefined);

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const signIn = React.useContext(AuthContext)?.signIn;

  useEffect(() => {
    f.auth().onAuthStateChanged((user: any) => {
      if (user != null) {
        console.log(user);
      }
    });
  }, []);

  const signUpUser = (email: string, password: string) => {
    try {
      if (password.length < 6) {
        alert('Please enter atleast 6 characters');
        return;
      }

      f.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(login)
        .catch((error: string) => {
          alert(error);
        });
    } catch (error) {
      console.log(error.toString());
    }
  };

  const loginUser = (email: string, password: string) => {
    try {
      f.auth()
        .signInWithEmailAndPassword(email, password)
        .then((firebaseUser: any) => {
          if (firebaseUser) {
            login();
          }
        })

        .catch((error: string) => {
          alert(error);
        });
    } catch (error) {
      console.log(error.toString());
    }
  };
  const loginWithFacebook = async () => {
    await facebook.initializeAsync({
      appId: '878071626358300',
    });

    const {type, token} = await facebook.logInWithReadPermissionsAsync({permissions: ['public_profile']});

    if (type == 'success') {
      const credential = f.auth.FacebookAuthProvider.credential(token);

      f.auth()
        .signInWithCredential(credential)
        .then(login)
        .catch((error: string) => {
          console.log(error);
          alert(error.toString());
        });
    }
  };

  const login = () => {
    if (signIn) signIn();
  };

  return (
    <Fragment>
      <Container style={styles.container}>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input autoCorrect={false} autoCapitalize="none" onChangeText={(email) => setEmail(email)} />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => setPassword(password)}
            />
          </Item>
          <Button style={{marginTop: 10}} full rounded success onPress={() => loginUser(email, password)}>
            <Text style={{color: 'white'}}> Login</Text>
          </Button>
          <Button style={{marginTop: 10}} full rounded primary onPress={() => signUpUser(email, password)}>
            <Text style={{color: 'white'}}> Sign Up</Text>
          </Button>

          <Button style={{marginTop: 10}} full rounded primary onPress={() => loginWithFacebook()}>
            <Text style={{color: 'white'}}> Login With Facebook</Text>
          </Button>
          <Button style={{marginTop: 10}} full rounded primary onPress={login}>
            <Text style={{color: 'white'}}> Anonymous user</Text>
          </Button>
        </Form>
      </Container>
    </Fragment>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
});

export default Login;
