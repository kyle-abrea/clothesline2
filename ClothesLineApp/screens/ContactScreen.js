import React, { Component } from 'react';
import { Linking } from 'react-native'
import { Text, View, StyleSheet, Image } from 'react-native';
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

//Screen to contact your RA.
export default class ContactScreen extends React.Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="call" style={{ fontSize: 24, color: tintColor }} />
    )
  }

  //This is where you put components in so it shows up.
  render() {
    const { navigate } = this.props.navigation;
    return (
      //All components.
      <View style={styles.container}>
        <Header
          leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
          centerComponent={{ text: "Contact Us", style: { color: "#fff", fontSize: 20 } }}
        />
        <View style={styles.responsiveBox}>
          <Image
            style={styles.image}
            source={require('./logo2.jpg')} />

          <View style={styles.contactContainer}>
            <Text style={
              {
                fontSize: 20,
                textAlign: 'center',
                justifyContent: 'center',
              }
            }>
              Questions or Problems? {"\n"}
              RA: David Son
            </Text>

            <Text style={
              {
                fontSize: 20,
                textAlign: 'center',
                justifyContent: 'center',
                color: 'blue'
              }
            }>
              <Text
                onPress={() => {
                  Linking.openURL('https://www.gmail.com');
                }}>
                Email: sond2@wwu.edu {"\n"}
              </Text>
            </Text>

            <Text style={
              {
                fontSize: 20,
                textAlign: 'center',
                justifyContent: 'center',
                marginLeft: 5,

              }
            }>
              Be sure to include the washer or dryer name and reason if it is a problem.
            </Text>

          </View>
        </View>


      </View>
    );
  }
}

//This is the display for the screen
const styles = StyleSheet.create({
  container: {
    flex: 1
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
    width: wp("90%"),
    resizeMode: "contain",
    marginBottom: 0,
    alignItems: 'center',
  },

  contactContainer: {
    height: hp('40%'),
    borderColor: "black",
    borderWidth: 5,
    justifyContent: 'center',
    marginTop: 50
  },

  textInput: {
    height: hp('4%'),
    width: wp('85%'),
    borderWidth: 1,
    marginTop: 10
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
