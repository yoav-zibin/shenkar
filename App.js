import React, {Fragment} from 'react';
import {StyleSheet, Text} from 'react-native';
import * as firebase from 'firebase';
import * as Facebook from 'expo-facebook';

import Home from './home';

// Initialize Firebase
const firebaseConfig = {
  apiKey: 'AIzaSyBbs01R7oXNzuVjhtVCpexnn2mjQuYV-zU',
  authDomain: 'shenkar-games.firebaseapp.com',
  projectId: 'shenkar-games',
  storageBucket: 'shenkar-games.appspot.com',
};
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

import {Container, Form, Input, Item, Button, Label} from 'native-base';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.signUpUser = this.signUpUser.bind(this);
    this.loginUser = this.loginUser.bind(this);
    this.loginWithFacebook = this.loginWithFacebook.bind(this);
    this.state = {
      email: '',
      password: '',
      isLogged: false,
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user);
      }
    });
  }

  signUpUser(email, password) {
    try {
      if (this.state.password.length < 6) {
        alert('Please enter atleast 6 characters');
        return;
      }

      firebase
        .auth()
        .createUserWithEmailAndPassword(email, password)
        .then(this.setState({isLogged: true}));
    } catch (error) {
      console.log(error.toString());
    }
  }
  loginUser(email, password) {
    try {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(this.setState({isLogged: true}))
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error.toString());
    }
  }
  async loginWithFacebook() {
    await Facebook.initializeAsync({
      appId: '878071626358300',
    });

    const {type, token} = await Facebook.logInWithReadPermissionsAsync({permissions: ['public_profile']});

    if (type == 'success') {
      const credential = firebase.auth.FacebookAuthProvider.credential(token);

      firebase
        .auth()
        .signInWithCredential(credential)
        .then(() => this.setState({isLogged: true}))
        .catch((error) => {
          console.log(error);
          alert(error.toString());
        });
    }
  }

  render() {
    const {isLogged} = this.state;
    return (
      <Fragment>
        {isLogged ? (
          <Home />
        ) : (
          <Container style={styles.container}>
            <Form>
              <Item floatingLabel>
                <Label>Email</Label>
                <Input autoCorrect={false} autoCapitalize="none" onChangeText={(email) => this.setState({email})} />
              </Item>
              <Item floatingLabel>
                <Label>Password</Label>
                <Input
                  secureTextEntry={true}
                  autoCorrect={false}
                  autoCapitalize="none"
                  onChangeText={(password) => this.setState({password})}
                />
              </Item>
              <Button
                style={{marginTop: 10}}
                full
                rounded
                success
                onPress={() => this.loginUser(this.state.email, this.state.password)}>
                <Text style={{color: 'white'}}> Login</Text>
              </Button>
              <Button
                style={{marginTop: 10}}
                full
                rounded
                primary
                onPress={() => this.signUpUser(this.state.email, this.state.password)}>
                <Text style={{color: 'white'}}> Sign Up</Text>
              </Button>

              <Button style={{marginTop: 10}} full rounded primary onPress={() => this.loginWithFacebook()}>
                <Text style={{color: 'white'}}> Login With Facebook</Text>
              </Button>
            </Form>
          </Container>
        )}
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
});
