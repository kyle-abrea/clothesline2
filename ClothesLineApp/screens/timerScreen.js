import React, { Component } from 'react';
import { TouchableOpacity } from 'react-native';
import {View, Text, } from 'react-native';
import CountDown from 'react-native-countdown-component';
import ReactNativeAN from 'react-native-alarm-notification';
import { db } from '../src/config';
import NotificationPopup from "react-native-push-notification-popup";

var fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 100000));
var timer = 500;
var globalUser;

export default class timerScreen extends React.Component {

  state = {
    timeRemaining: '',
    initialTime: '',
    rawTime: ''
  }

  //Communicating with the database to get the times for the timer.
  componentDidMount() {
    let rawTime = new Date().getTime();
    this.setState({
      timeRemaining: '500',
      initialTime: '500',
      rawTime: rawTime
    });

    let parent = this.props.navigation.dangerouslyGetParent();
    let userObj = Object.values(parent.state)[1][1];
    let params = Object.values(userObj);
    let userProfile = Object.values(params)[2];
    let user = userProfile.someuser;
    this.setState({
      user: user
    });
  }

  //Updates the timer in the database.
  pushTime = () => {
    let washer = db.collection('washers').doc('one');
    washer.update({
      "Time Remaining": this.state.timeRemaining,
      "Initial Time": this.state.initialTime,
      "Raw Time": this.state.rawTime
    });
  }

  //Updates the timer client-side.
  updateTimeDB = () => {
    let rawTime = new Date().getTime();
    let washer = db.collection('washers').doc('one');
    washer.get().then(doc => {
      if (!doc.exists) {
        alert("does not exist");
      } else {
        let items = Object.values(doc.data());
        let timeDiff = rawTime - items[1];
        let timeElasped = Math.floor(timeDiff / 1000); // time elasped since last check
        let remainingTime = items[2] - timeElasped;
        timer = remainingTime;
        this.setState({
          timeRemaining: remainingTime,
          rawTime: rawTime
        });
        washer.set({
          "Time Remaining": this.state.timeRemaining,
          "Initial Time": this.state.initialTime,
          "Raw Time": this.state.rawTime
        });
      }
    });
  }

  render(){
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <CountDown
          size={30}
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

        <TouchableOpacity onPress={
          () => {this.snapshotTest()}
        }
        >

          <Text style={{
            textAlign: 'center',
          }}>
            Update Time
        </Text>

        </TouchableOpacity>
        <NotificationPopup
          ref={ref => this.popup = ref} />

      </View>
    )
  }
}