import React, { Component } from 'react';
import { Text, TextInput, View, TouchableOpacity, Image, StyleSheet} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Left, Right, Icon } from 'native-base';

//The profile screen, where you can see your information and stats.
export default class MyLaundryScreen extends React.Component {
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
        <Icon name="alarm" style={{ fontSize: 24, color: tintColor }} />
    )
}
  //This is where you put components in so it shows up.
  render() {
    const {navigate} = this.props.navigation;
    return (
      //All components.
      <View style = {
          {
              flex: 1,
              justifyContent: "center",
              alignItems: "center",
              // marginTop:200
          }
      }>
        <Header leftComponent = {<Icon name = "Menu"
        onPress = { () => this.props.navigation.openDraver()} />}
      />
      </View>

    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'gray',
    alignItems: 'center',
    justifyContent: 'center',
  },
  responsiveBox: {
    width: wp('100%'),
    height: hp('100%'),
    borderWidth: 2,
    borderColor: 'orange',
    // backgroundColor: 'blue',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    color: 'white'
  },
  image: {
      /*flex:1, */
      height: hp("30%"),
      width: wp("95%"),
      resizeMode:"contain",
      marginBottom:0,
      borderWidth:1,
      borderColor:'blue'
  },
  textInput: {
      height: hp('4%'),
      width: wp('85%'),
      borderWidth:1,
      marginTop:10
  },
  touchableOpacity: {
      height: hp('5%'),
      width: wp('25%'),
      borderWidth:1,
      marginTop:10,
      justifyContent:"center",
      alignItems: "center"
  },
  button: {
      // textAlign: "center",
      fontSize:25
  }
});
