import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { db } from '../src/config';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getTimeFieldValues } from 'uuid-js';

//The registration screen where you... register an account.
export default class RegistrationScreen extends React.Component {

  //Creates new props in a default state.
  state = {
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: ''
  }

  //Sign up function that adds an account to the database. Checks to make sure all fields are filled out.
  signup = (firstname, lastname, email, username, password) => {
    if (firstname == "" || lastname == "" || email == "" || username == "" || password == "") {
      alert("Please fill out all fields.");
      return false;
    }

    //If all fields are filled out, add to the database.
    else {
      let user = db.collection('users').doc(username); //double check for variable username
      user.set({
        firstname: firstname,
        lastname: lastname,
        email: email,
        username: username,
        password: password,
        timeremaining: 0,
        imageNum: 1,
        shouldAlert: false
      });

      alert("You're signed up!");
      this.setState({ firstname: "" });
      this.setState({ lastname: "" });
      this.setState({ email: "" });
      this.setState({ username: "" });
      this.setState({ password: "" });

      return true;
    }
  }

  //Sets username to the inputted text.
  userSet = (text) => {
    this.setState({ username: text })
  }

  //Sets password to the inputted text.
  passSet = (text) => {
    this.setState({ password: text })
  }

  //Sets the first name to the inputted text.
  firstSet = (text) => {
    this.setState({ firstname: text })
  }

  //Sets the last name to the inputted text.
  lastSet = (text) => {
    this.setState({ lastname: text })
  }

  //Sets the email to the inputted text.
  emailSet = (text) => {
    this.setState({ email: text })
  }

  handleSubmit = (firstname, lastname, email, username, password) => {
    return (this.signup(firstname, lastname, email, username, password));
  };

  //This is where you put components in so it shows up.
  render() {
    const { navigate } = this.props.navigation;
    return (
      //All components.
      <View style={styles.responsiveBox}>
        <Image
          style={styles.image}
          source={require('./logo2.jpg')} />
        <Text>Sign Up!</Text>

        <TextInput
          style={styles.textInput}
          placeholder="First Name"
          autoCapitalize="none"
          onChangeText={this.firstSet}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Last Name"
          autoCapitalize="none"
          onChangeText={this.lastSet}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Email: ....@example.com"
          autoCapitalize="none"
          onChangeText={this.emailSet}
        />

        <TextInput
          style={styles.textInput}
          placeholder="Username"
          autoCapitalize="none"
          onChangeText={this.userSet}
        />

        <TextInput
          secureTextEntry={true}
          style={styles.textInput}
          placeholder="Password"
          autoCapitalize="none"
          onChangeText={this.passSet}
        />

        <TouchableOpacity
          style={styles.touchableOpacity}
          onPress={
            () => {
              if (this.handleSubmit(this.state.firstname, this.state.lastname, this.state.email, this.state.username, this.state.password) == true) { navigate('Signout') };
            }
          }>
          <Text style={
            {
              textAlign: "center",
              fontSize: 25
            }
          }>
            Submit
            </Text>
        </TouchableOpacity>
      </View>

    );
  }
}


// This stylesheet is the main look and feel for the page.
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  responsiveBox: {
    width: wp('100%'),
    height: hp('100%'),
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
    marginBottom: 0
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
