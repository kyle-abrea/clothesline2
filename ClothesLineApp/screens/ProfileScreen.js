import React, { Component } from 'react';
import { Text, TextInput, View, TouchableHighlight, TouchableOpacity, Image, StyleSheet, Button, Alert } from 'react-native';
import CountDown from 'react-native-countdown-component';
import ReactNativeAN from 'react-native-alarm-notification';
import { db } from '../src/config';
import NotificationPopup from "react-native-push-notification-popup";
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
var fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 100000));
var timer = 500;

console.ignoredYellowBox = ['Setting a timer'];

//The profile screen, where you can see your information and laundromat status.
export default class ProfileScreen extends React.Component {

  //Switching profile icons.
  constructor() {

    super();

    this.state = {

      imageURL: 'https://www.pngkey.com/png/full/291-2913486_ios-hd-wallpaper-flower.png',
      shownext: 1,
      fullName: '',
      washerStatus: 'none',
      dryerStatus: 'none'

    }

  }

  //Communication with firebase.
  componentDidMount() {
    let user = this.props.navigation.getParam('someuser', 'defaultvalue');
    // console.log(user);
    let userDB = db.collection('users').doc(user);
    userDB.get().then(doc => {
      let data = doc.data();
      // console.log(data.shouldAlert);
      if (data.shouldAlert == true) {
        this.sendNotif();
      }
    });
  }

  //Sends notification to user.
  sendNotif = () => {
    this.popup.show({
      timeText: 'Now',
      title: 'Alert',
      body: 'Somebody wants you to get your laundry',
      slideOutTime: 5000
    });
  }

  //See what the washer status is.
  getWasherStatus = (myUser) => {
    let washer1 = db.collection('washers').doc("one");
    let washer2 = db.collection('washers').doc("two");
    myUser = this.props.navigation.getParam('someuser', 'defaultValue');

    let user = db.collection('users').doc(myUser);
    user.get().then(doc => {

      let data = doc.data();
      // let items = Object.values(doc.data());
      let first = data.firstname;
      let last = data.lastname;
      // let first = items[1];
      // let last = items[2];
      this.setState({ fullName: first + " " + last });


    })

    washer1.get().then(doc => {
      if (!doc.exists) {
        alert("Does not exist");
      } else {
        let items = doc.data();
        // let isClaimed = items.isClaimed;
        let user = items.user;
        if (user == myUser) {

          this.setState({ washerStatus: "Washer 1" })
        }
      }
    }).catch(err => {
      alert("error getting document", err);
      throw error;
    });

    washer2.get().then(doc => {
      if (!doc.exists) {
        alert("Does not exist");
      } else {
        let items = doc.data();
        //  let isClaimed = items.isClaimed;
        let user = items.user;
        if (user == myUser) {
          this.setState({ washerStatus: "Washer 2" })
        }
      }
    }).catch(err => {
      alert("error getting document", err);
      throw error;
    });

    if (this.state.washerStatus == '' || this.state.washerStatus == 'none') {
      this.state.washerStatus = 'none';
    }

    this.getDryerStatus(myUser);
  }

  //See what the dryer status is.
  getDryerStatus = (myUser) => {
    myUser = this.props.navigation.getParam('someuser', 'defaultValue');
    let dryer1 = db.collection('dryers').doc("one");
    let dryer2 = db.collection('dryers').doc("two");
    dryer1.get().then(doc => {
      if (!doc.exists) {
        alert("Does not exist");
      } else {
        let items = doc.data();
        // let isClaimed = items.isClaimed;
        let user = items.user;
        if (user == myUser) {
          this.setState({ dryerStatus: "Dryer 1" })
        }
      }
    }).catch(err => {
      alert("error getting document", err);
      throw error;
    });

    dryer2.get().then(doc => {
      if (!doc.exists) {
        alert("Does not exist");
      } else {
        let items = doc.data();
        // let isClaimed = items.isClaimed;
        let user = items.user;
        if (user == myUser) {
          this.setState({ dryerStatus: "Dryer 2" })
        }
      }
    }).catch(err => {
      alert("error getting document", err);
      throw error;
    });

    if (this.state.dryerStatus == '' || this.state.dryerStatus == 'none') {
      this.state.dryerStatus = 'none';
    }
  }

  //Get first and last name.
  getFirstLast = (myUser) => {

    let user = db.collection('users').doc(myUser);
    user.get().then(doc => {

      let data = doc.data();
      // let items = Object.values(doc.data());
      let first = data.firstname;
      let last = data.lastname;
      // let first = items[1];
      // let last = items[2];
      this.setState({ fullName: first + " " + last });


    })
  }

  //Change images.
  Load_New_Image = () => {

    if (this.state.shownext == 1) {
      this.setState({

        imageURL: 'https://www.freepngimg.com/thumb/tree/26070-8-coconut-tree.png',
        shownext: 2
      })
    }

    else if (this.state.shownext == 2) {
      this.setState({
        imageURL: 'https://www.freepngimg.com/thumb/earth/11-2-earth-free-download-png.png',
        shownext: 3
      })
    }

    else if (this.state.shownext == 3) {
      this.setState({
        imageURL: 'https://s23916.pcdn.co/wp-content/uploads/2018/01/tide-pod-challenge-696x417.jpeg',
        shownext: 4
      })
    }

    else if (this.state.shownext == 4) {
      this.setState({
        imageURL: 'https://www.freepngimg.com/thumb/tshirt/1-t-shirt-png-image.png',
        shownext: 5
      })
    }

    else if (this.state.shownext == 5) {
      this.setState({
        imageURL: 'https://www.freepngimg.com/thumb/piano/8-2-piano-picture.png',
        shownext: 6
      })
    }

    else {
      this.setState({
        imageURL: 'https://www.pngkey.com/png/full/291-2913486_ios-hd-wallpaper-flower.png',
        shownext: 1
      })
    }
  }

  //Allows us to change the icon on the navigation drawer.
  static navigationOptions = {
    drawerIcon: ({ tintColor }) => (
      <Icon name="person" style={{ fontSize: 24, color: tintColor }} />
    )
  }

  //Menu will show up top left.
  render() {
    let simpleVar = this.props.navigation.getParam('someuser', 'defaultValue');
    return (

      <View style={styles.container}>
        <Header
          leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
          centerComponent={{ text: "My Profile", style: { color: "#fff", fontSize: 20 } }}
        />
        <View style={styles.responsiveBox}>
          <View style={styles.aviContainer}>
            <Image
              source={{ uri: this.state.imageURL }}
              style={styles.aviBox}
            />
            <Button style={styles.button} title="Change Profile Image" onPress={this.Load_New_Image} />
          </View>
          <View style={styles.nameContainer}>
    <Text style={styles.name}>{this.getFirstLast(simpleVar)}{this.state.fullName}</Text>

          </View>

          <View style={styles.statusContainer}>
            <View style={styles.washerBox}>
              <View style={styles.machinePic}>
                <Image style={styles.image} source={require('./washericon.png')} />
              </View>
              <View style={styles.machineInfo}>

      <Text style={{fontSize:16}}>{"Washer status: none"}</Text>
                <CountDown
                  size={20}
                  until={timer}
                  onFinish={() => this.sendNotif()}
                  digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625' }}
                  digitTxtStyle={{ color: '#1CC625' }}
                  timeLabelStyle={{ color: 'blue', fontWeight: 'bold' }}
                  separatorStyle={{ color: '#1CC625' }}
                  timeToShow={['H', 'M', 'S']}
                  timeLabels={{ h: 'Hours', m: 'Minutes', s: 'Seconds' }}
                  // onChange = {this.updateTimer()}
                  showSeparator
                />
              </View>
            </View>

            <View style={styles.dryerBox}>
              <View style={styles.machinePic}>
                <Image style={styles.image} source={require('./dryericon.png')} />
              </View>
              <View style={styles.machineInfo}>
                <Text style={{fontSize:16}}>{"Dryer status: Using Dryer 1"}</Text>
                <CountDown
                  size={20}
                  until={timer} // time in seconds
                  // onFinish={() => alert('Finished')}
                  onFinish={() => this.sendNotif()}
                  digitStyle={{ backgroundColor: '#FFF', borderWidth: 2, borderColor: '#1CC625' }}
                  digitTxtStyle={{ color: '#1CC625' }}
                  timeLabelStyle={{ color: 'blue', fontWeight: 'bold' }}
                  separatorStyle={{ color: '#1CC625' }}
                  timeToShow={['H', 'M', 'S']}
                  timeLabels={{ h: 'Hours', m: 'Minutes', s: 'Seconds' }}
                  // onChange = {this.updateTimer()}
                  showSeparator
                />
              </View>
            </View>
          </View>
        </View>
        <NotificationPopup
          ref={ref => this.popup = ref} />
      </View>
    );
  }
}

//The style sheet allows us to create the page design without clogging up the render.
const styles = StyleSheet.create({
  imageStyle: {

    width: 200,
    height: 300,
    resizeMode: 'center'

  },
  container: {
    flex: 1,
  },

  responsiveBox: {
    width: wp('100%'),
    height: hp('90%'),
    flexDirection: 'column',
  },

  aviContainer: {
    height: hp('25%'),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 50,
  },

  aviBox: {
    width: wp('45%'),
    height: hp('20%'),
    justifyContent: "center",
    alignItems: "center",
    borderColor: "black",
    borderWidth: 2,
    borderRadius: 50
  },

  nameContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  name: {
    fontSize: 40
  },

  statusContainer: {
    height: hp('40%'),
    justifyContent: "center",
    alignItems: "center",
    marginTop: 25,
  },

  washerBox: {
    height: hp('18%'),
    width: wp('100%'),
    flexDirection: "row",
    // justifyContent: "space-between",
    // borderColor: "red",
    borderColor: "black",
    borderWidth: 2
  },

  dryerBox: {
    height: hp('18%'),
    width: wp('100%'),
    flexDirection: "row",
    marginTop: 10,
    // borderColor: "red",
    borderColor: "black",
    borderWidth: 2
  },

  machinePic: {
    height: hp('18%'),
    width: wp('40%'),
    flexDirection: "row",
  },

  machineInfo: {
    height: hp('18%'),
    width: wp('60%'),
    textAlign: "left",
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    height: hp('18%'),
    width: wp('40%'),
    resizeMode: "contain",
    marginBottom: 0,
    borderWidth: 2,
    // borderColor: 'blue'
    borderColor: "black",
  },

  textInput: {
    height: hp('5%'),
    width: wp('85%'),
    borderWidth: 1,
    marginTop: 10
  },

  touchableOpacity: {
    height: hp('5%'),
    width: wp('25%'),
    borderWidth: 1,
    marginTop: 10,
    justifyContent: "center"
  },

  button: {
    fontSize: 25,
  }

});
