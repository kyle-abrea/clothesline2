import React, { Component } from 'react';
import { Text, TextInput, View, TouchableHighlight, TouchableOpacity, Image, StyleSheet, Button, Alert, Modal } from 'react-native';
import CountDown from 'react-native-countdown-component';
import ReactNativeAN from 'react-native-alarm-notification';
import { db } from '../src/config';
import NotificationPopup from "react-native-push-notification-popup";
import { Header } from 'react-native-elements';
import { Left, Right, Icon } from 'native-base';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
var fireDate = ReactNativeAN.parseDate(new Date(Date.now() + 100000));
var timer = 500;

//Main screen to select your washer and dryer.
export default class LaundromatScreen extends React.Component {
    static navigationOptions = {
        drawerIcon: ({ tintColor }) => (
            <Icon name="water" style={{ fontSize: 24, color: tintColor }} />
        )
    }

    //Creates new props in a default state.
    state = {
        isClaimed: false,
        user: '',
        time: 0,
    }

    //Firebase communication.
    componentDidMount() {
        let parent = this.props.navigation.dangerouslyGetParent();
        // console.log(Object.values(parent.state));
        let userObj = Object.values(parent.state)[1][1];
        // console.log(userObj);
        let params = Object.values(userObj);
        // let a = Object.values(params);
        let userProfile = Object.values(params)[2];
        // console.log(userProfile);
        let user = userProfile.someuser;
        // console.log("some user:",user);
        this.setState({
            user: user
        });
        this.setWasherModal();
        this.setDryerModal();
    }

    //Notify the user.
    alertUser = (user) => {
        let userDB = db.collection('users').doc(user);
        userDB.get().then(doc => {
            userDB.update({
                shouldAlert: true
            });
        })
    }

    //Washer modal.
    setWasherModal = () => {
        let washer = db.collection('washers').doc('one');
        var claimedUser = '';
        washer.get().then(doc => {
            let items = doc.data();
            let user = items.user;
            claimedUser = user;
            this.setState({
                claimedUser: user
            })
            let userDB = db.collection('users').doc(user);
            userDB.get().then(doc2 => {
                let data = doc2.data();
                let user = data.username;
                let email = data.email;
                let first = data.firstname;
                let last = data.lastname;
                this.setState({
                    user: user,
                    email: email,
                    firstName: first,
                    lastName: last
                });
            });
        });
    }

    //Dryer modal.
    setDryerModal = () => {
        let washer = db.collection('dryers').doc('one');
        washer.get().then(doc => {
            let items = doc.data();
            let user = items.user;
            claimedUser = user;
            this.setState({
                claimedUser2: user
            })
            let userDB = db.collection('users').doc(user);
            userDB.get().then(doc2 => {
                let data = doc2.data();
                let user = data.username;
                let email = data.email;
                let imageNum = data.imageNum;
                let first = data.firstname;
                let last = data.lastname;
                console.log(user);
                console.log(email);
                console.log(imageNum);
                console.log(first);
                console.log(last);
                this.setState({
                    email2: email,
                    imageNum2: imageNum,
                    firstName2: first,
                    lastName2: last
                });
            });
        });
    }

    //Done button.
    finishWasher1 = () => {
        let washer = db.collection('washers').doc('one');

        let parent = this.props.navigation.dangerouslyGetParent();
        let userObj = Object.values(parent.state)[1][1];
        let params = Object.values(userObj);
        let userProfile = Object.values(params)[2];
        let user = userProfile.someuser;

        this.setState({
            user: user
        });

        let globalUser = user;

        var getDoc = washer.get().then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                if (doc.get('user') != "") {
                    let data = doc.data();

                    if (data.user == globalUser) {

                        alert("Glad you're letting others know you're done using the machine!")
                        washer.update({
                            user: "",
                            isClaimed: false
                        });
                    } else {
                        alert("You haven't claimed this machine!");
                    }
                } else {
                    alert("You haven't claimed this machine!");
                }
            }
        })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    //Done for washer 2.
    finishWasher2 = () => {
        let washer = db.collection('washers').doc('two');

        let parent = this.props.navigation.dangerouslyGetParent();
        // console.log(Object.values(parent.state));
        let userObj = Object.values(parent.state)[1][1];
        // console.log(userObj);
        let params = Object.values(userObj);
        // let a = Object.values(params);
        let userProfile = Object.values(params)[2];
        // console.log(userProfile);
        let user = userProfile.someuser;
        // console.log("some user:",user);

        this.setState({
            user: user
        });

        let globalUser = user;

        var getDoc = washer.get().then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                if (doc.get('user') != "") {
                    let data = doc.data();

                    if (data.user == globalUser) {

                        alert("Glad you're letting others know you're done using the machine!")
                        washer.update({
                            user: "",
                            isClaimed: false
                        });
                    } else {
                        alert("You haven't claimed this machine!");
                    }
                } else {
                    alert("You haven't claimed this machine!");
                }
            }
        })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    //Done for dyer 1.
    finishDryer1 = () => {

        let dryer = db.collection('dryers').doc('one');

        let parent = this.props.navigation.dangerouslyGetParent();
        // console.log(Object.values(parent.state));
        let userObj = Object.values(parent.state)[1][1];
        // console.log(userObj);
        let params = Object.values(userObj);
        // let a = Object.values(params);
        let userProfile = Object.values(params)[2];
        // console.log(userProfile);
        let user = userProfile.someuser;
        // console.log("some user:",user);

        this.setState({
            user: user
        });

        let globalUser = user;

        var getDoc = dryer.get().then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                if (doc.get('user') != "") {
                    let data = doc.data();

                    if (data.user == globalUser) {

                        alert("Glad you're letting others know you're done using the machine!")
                        dryer.update({
                            user: "",
                            isClaimed: false
                        });
                    } else {
                        alert("You haven't claimed this machine!");
                    }
                } else {
                    alert("You haven't claimed this machine!");
                }
            }
        })
            .catch(err => {
                console.log('Error getting document', err);
            });

    }

    //Finished dryer 2.
    finishDryer2 = () => {
        let dryer = db.collection('dryers').doc('two');

        let parent = this.props.navigation.dangerouslyGetParent();
        let userObj = Object.values(parent.state)[1][1];
        let params = Object.values(userObj);
        let userProfile = Object.values(params)[2];
        let user = userProfile.someuser;

        this.setState({
            user: user
        });

        let globalUser = user;

        var getDoc = dryer.get().then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                if (doc.get('user') != "") {
                    let data = doc.data();

                    if (data.user == globalUser) {

                        alert("Glad you're letting others know you're done using the machine!")
                        dryer.update({
                            user: "",
                            isClaimed: false
                        });
                    } else {
                        alert("You haven't claimed this machine!");
                    }
                } else {
                    alert("You haven't claimed this machine!");
                }
            }
        })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }


    /* Functions to push values to the DB */
    claimWasher1 = () => {

        let washer = db.collection('washers').doc('one');

        let parent = this.props.navigation.dangerouslyGetParent();
        let userObj = Object.values(parent.state)[1][1];
        let params = Object.values(userObj);
        let userProfile = Object.values(params)[2];
        let user = userProfile.someuser;

        this.setState({
            user: user
        });

        let globalUser = user;

        var getDoc = washer.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    if (doc.get('user') != "") {
                        alert("Someone is already using this machine")
                    } else {
                        washer.update({
                            user: globalUser,
                            isClaimed: true
                        })

                        alert("you claimed a washing machine!");
                    }
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });


    }

    //Claim a washer for yourself.
    claimWasher2 = () => {

        let washer = db.collection('washers').doc('two');

        let parent = this.props.navigation.dangerouslyGetParent();
        let userObj = Object.values(parent.state)[1][1];
        let params = Object.values(userObj);
        let userProfile = Object.values(params)[2];
        let user = userProfile.someuser;

        this.setState({
            user: user
        });

        let globalUser = user;

        var getDoc = washer.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    if (doc.get('user') != "") {
                        alert("Someone is already using this machine")
                    } else {
                        washer.update({
                            user: globalUser,
                            isClaimed: true
                        })

                        alert("you claimed a washing machine!");
                    }
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    //Claim a dryer for yourself.
    claimDryer1 = () => {

        let dryer = db.collection('dryers').doc('one');

        let parent = this.props.navigation.dangerouslyGetParent();
        let userObj = Object.values(parent.state)[1][1];
        let params = Object.values(userObj);
        let userProfile = Object.values(params)[2];
        let user = userProfile.someuser;

        this.setState({
            user: user
        });

        let globalUser = user;

        var getDoc = dryer.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    if (doc.get('user') != "") {
                        alert("Someone is already using this machine")
                    } else {
                        dryer.update({
                            user: globalUser,
                            isClaimed: true
                        })

                        alert("you claimed a drying machine!");
                    }
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    //Claim a dryer for yourself.
    claimDryer2 = () => {

        let dryer = db.collection('dryers').doc('two');

        let parent = this.props.navigation.dangerouslyGetParent();
        let userObj = Object.values(parent.state)[1][1];
        let params = Object.values(userObj);
        let userProfile = Object.values(params)[2];
        let user = userProfile.someuser;

        this.setState({
            user: user
        });

        let globalUser = user;
        var getDoc = dryer.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    if (doc.get('user') != "") {
                        alert("Someone is already using this machine")
                    } else {
                        dryer.update({
                            user: globalUser,
                            isClaimed: true
                        })

                        alert("you claimed a drying machine!");
                    }
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
    }

    checkWashers = (washerName) => {
        let washer = db.collection('washers').doc(washerName);
        washer.get().then(doc => {
            if (!doc.exists) {
                alert("Does not exist");
            } else {
                let items = Object.values(doc.data());
                let isClaimed = items[0];
                let user = items[1];
                if (isClaimed) {
                    alert("Washer is currently used by: ", user);
                }
                else {
                    alert("the washer is available");
                    //go to the drop down menu to claim a washer
                }
            }
        }).catch(err => {
            alert("error getting document", err);
            throw error;
        });
    }

    //See status of washer.
    checkWashers = (washerName) => {
        let washer = db.collection('washers').doc(washerName);
        washer.get().then(doc => {
            if (!doc.exists) {
                alert("Does not exist");
            } else {
                let items = Object.values(doc.data());
                let isClaimed = items[0];
                let user = items[1];
                if (isClaimed) {
                    alert("Washer is currently used by: ", user);
                }
                else {
                    //go to the drop down menu to claim a washer
                }
            }
        }).catch(err => {
            alert("error getting document", err);
            throw error;
        });
    }

    //Creates new props in a default state.
    state = {
        username: '',
        password: ''
    }

    state = {
        modalVisible: false,
        modal2Visible: false,
    };

    toggleModal(visible) {
        this.setState({ modalVisible: visible });
    }
    toggleModal2(visible) {
        this.setState({ modal2Visible: visible });
    }
    openModal = () => {
        return (
            <TouchableHighlight onPress={() => { this.toggleModal(true) }}>
                <Text style={styles.text}>User</Text>
            </TouchableHighlight>
        )
    }
    openModal3 = () => {
        return (
            <TouchableHighlight onPress={() => { this.toggleModal2(true) }}>
                <Text style={styles.text}>User</Text>
            </TouchableHighlight>
        )
    }

    modal() {
        return (
            <Modal
                style={styles.modal}
                presentationStyle="fullScreen"
                backdropOpacity={1}
                animationType="slide"
                transparent={false}
                visible={this.state.modalVisible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{
                    height: hp('100%'),
                    width: wp('100%'),
                    marginTop: 60,
                    borderColor: "blue",
                    borderWidth: 2,
                    alignItems: "center"
                    // justifyContent: "center"
                }}>
                    <View>
                        <Button title="Close" onPress={() => { this.toggleModal(false) }} />
                    </View>
                    <Text style={{ fontSize: 50 }}>Washer 1</Text>
                    <Image style={styles.image} source={require('./washericon.png')} />
                    <Text style={{ fontSize: 25 }}>User: {this.state.claimedUser}</Text>
                    <Text style={{ fontSize: 25 }}>Email: {this.state.email}</Text>
                    <Text style={{ fontSize: 25 }}>Full Name: {this.state.firstName} {this.state.lastName}</Text>
                    <Button title="Notify user" onPress={() => { this.alertUser(this.state.claimedUser) }} />
                </View>
            </Modal>
        );
    }

    //The third modal.
    modal3() {
        return (
            <Modal
                style={styles.modal}
                presentationStyle="fullScreen"
                backdropOpacity={1}
                animationType="slide"
                transparent={false}
                visible={this.state.modal2Visible}
                onRequestClose={() => {
                    Alert.alert('Modal has been closed.');
                }}>
                <View style={{
                    height: hp('100%'),
                    width: wp('100%'),
                    marginTop: 60,
                    borderColor: "blue",
                    borderWidth: 2,
                    alignItems: "center"
                }}>
                    <View>
                        <Button title="Close" onPress={() => { this.toggleModal2(false) }} />
                    </View>
                    <Text style={{ fontSize: 50 }}>Dryer 1</Text>
                    <Image style={styles.image} source={require('./dryericon.png')} />
                    <Text style={{ fontSize: 25 }}>User: {this.state.claimedUser2}</Text>
                    <Text style={{ fontSize: 25 }}>Email: {this.state.email2}</Text>
                    <Text style={{ fontSize: 25 }}>Full Name: {this.state.firstName2} {this.state.lastName2}</Text>
                    <Button title="Notify user" onPress={() => { this.alertUser(this.state.claimedUser) }} />
                </View>
            </Modal>
        );
    }
    //This is where you put components in so it shows up.
    render() {
        return (
            <View style={styles.container}>
                <Header
                    leftComponent={<Icon name="menu" onPress={() => this.props.navigation.openDrawer()} />}
                    centerComponent={{ text: "Laundromat", style: { color: "#fff", fontSize: 20 } }}
                />
                <View style={styles.responsiveBox}>
                    <View style={styles.machineContainer}>
                        {/*washer*/}
                        <View style={styles.washerContainer}>
                            <Text style={{ fontSize: 20 }}>Washing Machines</Text>
                            <View style={styles.machine1}>
                                <View style={styles.machinePic}>
                                    <Image style={styles.image} source={require('./washericon.png')} />
                                </View>
                                <View style={styles.machineInfo}>
                                    <Text style={styles.machineName}>Washer 1</Text>
                                    <CountDown
                                        size={10}
                                        until={timer} // time in seconds
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
                                    <View style={styles.machineUsage}>
                                        <View style={styles.machineUserPic}>
                                            {this.openModal()}
                                            {this.modal()}
                                        </View>
                                        <Button title="Claim" onPress={() => { this.claimWasher1() }} />
                                        <Button title="Done" onPress={() => { this.finishWasher1() }} />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.machine2}>
                                <View style={styles.machinePic}>
                                    <Image style={styles.image} source={require('./washericon.png')} />
                                </View>
                                <View style={styles.machineInfo}>
                                    <Text style={styles.machineName}>Washer 2</Text>
                                    <CountDown
                                        size={10}
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
                                    <View style={styles.machineUsage}>
                                        <Text style={{ color: "red" }}>UNAVAILABLE</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                        {/*dryer*/}
                        <View style={styles.dryerContainer}>
                            <Text style={{ fontSize: 20 }}>Drying Machines</Text>
                            <View style={styles.machine1}>
                                <View style={styles.machinePic}>
                                    <Image style={styles.image} source={require('./dryericon.png')} />
                                </View>
                                <View style={styles.machineInfo}>
                                    <Text style={styles.machineName}>Dryer 1</Text>
                                    <CountDown
                                        size={10}
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
                                    <View style={styles.machineUsage}>
                                        <View style={styles.machineUserPic}>
                                            {this.openModal3()}
                                            {this.modal3()}
                                        </View>
                                        <Button title="Claim" onPress={() => { this.claimDryer1() }} />
                                        <Button title="Done" onPress={() => { this.finishDryer1() }} />
                                    </View>
                                </View>
                            </View>
                            <View style={styles.machine2}>
                                <View style={styles.machinePic}>
                                    <Image style={styles.image} source={require('./dryericon.png')} />
                                </View>
                                <View style={styles.machineInfo}>
                                    <Text style={styles.machineName}>Dryer 2</Text>
                                    <CountDown
                                        size={10}
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
                                    <View style={styles.machineUsage}>
                                        <Text style={{ color: "red" }}>UNAVAILABLE</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({

    container: {
        flex: 1,
    },

    responsiveBox: {
        width: wp('100%'),
        height: hp('100%'),
        flexDirection: 'column',
        alignItems: 'center'
    },

    machineContainer: {
        height: hp('76%'),
        width: wp('90%'),
        marginTop: 20,
        flexDirection: "row",
        borderWidth: 2,
        borderColor: "black",

    },

    washerContainer: {
        height: hp('76%'),
        width: wp('45%'),
        borderWidth: 2,
        borderColor: "black",
        justifyContent: 'center',
        alignItems: 'center'
    },

    dryerContainer: {
        height: hp('76%'),
        width: wp('45%'),
        borderWidth: 2,
        borderColor: "black",
        justifyContent: 'center',
        alignItems: 'center'
    },

    machine1: {
        height: hp('35%'),
        width: wp('40%'),
        borderWidth: 2,
        borderColor: "black",
    },

    machine2: {
        height: hp('35%'),
        width: wp('40%'),
        marginTop: 20,
        borderWidth: 2,
        borderColor: "black",
    },

    countdown: {
        height: hp('4%'),
        width: wp('10%')
    },

    machinePic: {
        height: hp('20%'),
        width: wp('40%'),
        borderWidth: 2,
        borderColor: "black",
        justifyContent: 'center',
        alignItems: 'center'
    },

    machineInfo: {
        height: hp('15%'),
        width: wp('40%'),
        borderWidth: 2,
        borderColor: "black",
        alignItems: "center"
    },

    machineUsage: {
        height: hp('6%'),
        width: wp('40%'),
        borderWidth: 2,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center"
    },

    machineUserPic: {
        height: hp('6%'),
        width: wp('12%'),
        borderWidth: 5,
        borderColor: "black",
        alignItems: "center",
        justifyContent: "center"
    },

    modal: {
        justifyContent: "center",
        alignItems: "center"
    },

    machineName: {
        fontSize: 18
    },

    image: {
        height: hp("20%"),
        width: wp("38%"),
        resizeMode: "contain",
        marginBottom: 0,
        borderWidth: 1,
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
        fontSize: 50
    }

});
