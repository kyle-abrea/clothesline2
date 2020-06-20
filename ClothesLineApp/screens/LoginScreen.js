import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { db } from '../src/config';
import { Left, Right, Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//Login page, which leads to profile.
export default class LoginScreen extends React.Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="exit" style={{ fontSize: 24, color: tintColor }} />
    )
  }

  //Creates new props in a default state.
  state = {
    username: '',
    password: '',
  }

  //Sets username to the inputted text.
  userSet = (text) => {
    this.setState({ username: text })
  }

  //Sets password to the inputted text.
  passSet = (text) => {
    this.setState({ password: text })
  }

  //Login function
  login = (username, password) => {
    const { navigate } = this.props.navigation;

    if (username == "" && password == "") {
      alert("Please enter your user name and password in the fields above.")
      navigate('Login');
    }

    else if (username == "" || password == "") {
      alert("Please fill out both fields.");
      navigate('Login');
    }
    else {
      let user = db.collection('users').doc(username); //double check for variable username
      user.get().then(doc => {

        if (!doc.exists) {
          alert('Invalid user name and/or password');
          navigate('Login');
        }

        else {
          let data = doc.data();
          let user = data.username;
          let pass = data.password;


          if (password != pass) {
            alert('Invalid user name and/or password');
            navigate('Login');
          }

          else {

            if (username != user) {
              alert('Invalid user name and/or password');
              navigate('Login');
            }

            else {

              let user = doc.data().username;
              this.setState({ username: "" })
              this.setState({ password: "" })
              this.props.navigation.navigate('Profile', { someuser: user });

            }
          }
        }
      })
        .catch(err => {
          alert('Error getting document', err);
          throw error;
        });
    }
  }

  //This is where you put components in so it shows up.
  render() {
    const { navigate } = this.props.navigation;
    return (
      //Username and password text input fields, as well as the buttons.
      <View style={styles.container}>
        <View style={styles.responsiveBox}>
          <Image
            style={styles.image}
            source={require('./logo2.jpg')}
          />

          <TextInput
            style={styles.textInput}
            placeholder="Enter username here"
            autoCapitalize="none"
            onChangeText={this.userSet}
            value={this.state.username}
          />

          <TextInput
            secureTextEntry={true}
            style={styles.textInput}
            placeholder="Enter password here"
            autoCapitalize="none"
            onChangeText={this.passSet}
            value={this.state.password}
          />

          <TouchableOpacity onPress={
            () => { this.login(this.state.username, this.state.password) }}


            style={styles.touchableOpacity}
          >
            <Text style={
              {
                textAlign: "center",
                fontSize: 25
              }
            }>
              Login
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.touchableOpacity}
            onPress={
              () => navigate('Registration')
            }>
            <Text style={styles.button}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>

    );
  }
}

//Style sheet allows us to change the format of the page without clogging up the above.
const styles = StyleSheet.create({

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  responsiveBox: {
    width: wp('100%'),
    height: hp('100%'),
    borderColor: 'orange',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },

  text: {
    color: 'white'
  },

  image: {
    height: hp("30%"),
    width: wp("95%"),
    resizeMode: "contain",
    marginBottom: 0,
  },

  textInput: {
    height: hp('4%'),
    width: wp('85%'),
    borderWidth: 1,
    borderRadius: 50,
    marginTop: 10,
    paddingHorizontal: 10
  },

  touchableOpacity: {
    height: hp('5%'),
    width: wp('25%'),
    borderWidth: 1,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center"
  },

  button: {
    fontSize: 25
  }

});
