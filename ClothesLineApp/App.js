import React, { Component } from 'react';
import LoginScreen from './screens/LoginScreen.js';
import RegistrationScreen from './screens/RegistrationScreen.js';
import ProfileScreen from './screens/ProfileScreen.js';
import LaundromatScreen from './screens/LaundromatScreen.js';
import ContactScreen from './screens/ContactScreen.js';
import TimerScreen from './screens/timerScreen.js';
import './screens/TimerFix.js';
import { Icon } from 'native-base';
import { Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import { DrawerItems, createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import './screens/TimerFix.js';

const { width } = Dimensions.get("window");
console.ignoredYellowBox = ['Setting a timer'];

//This allows us to hide any screen from the drawer menu.
class Hidden extends React.Component {
  render() {
    return null;
  }
}

//Hamburger Menu.
const CustomDrawerNavigation = (props) => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ height: 250, backgroundColor: '#d2d2d2', opacity: 0.9 }}>
        <View style={{ height: 200, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
          <Image source={require('./assets/no-image.png')} style={{ height: 150, width: 150, borderRadius: 60 }} />
        </View>
        <View style={{ height: 50, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
          <Text>John Doe</Text>
        </View>
      </View>
      <ScrollView>
        <DrawerItems {...props} />
      </ScrollView>
      <View style={{ alignItems: "center", bottom: 20 }}>
        <View style={{ flexDirection: 'row' }}>
          <View style={{ flexDirection: 'column', marginRight: 15 }}>
            <Icon name="flask" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
          </View>
          <View style={{ flexDirection: 'column' }}>
            <Icon name="call" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}


//Navigating through pages using drawer.
export const Drawer = createDrawerNavigator(
  {
    Registration: {
      screen: RegistrationScreen,
      navigationOptions: {
        drawerLabel: <Hidden />
      }
    },

    Profile: { screen: ProfileScreen },
    Laundromat: { screen: LaundromatScreen },
    Contact: { screen: ContactScreen },
    Signout: { screen: LoginScreen },
    // Timer: { screen: TimerScreen }
  },

  {
    headerMode: 'none',
    initialRouteName: 'Signout'
  },

  {
    drawerPosition: 'left',
    contentComponent: CustomDrawerNavigation,
    drawerOpenRoute: 'DrawerOpen',
    drawerCloseRoute: 'DrawerClose',
    drawerToggleRoute: 'DrawerToggle',
    drawerWidth: (width / 3) * 2
  },
  {
    user: ''
  },

);

const App = createAppContainer(Drawer);

//Nothing here since we seperated the pages!
export default App;
