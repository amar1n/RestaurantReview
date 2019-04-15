import React, { Component } from "react";
import {
  createStackNavigator,
  createAppContainer,
  createBottomTabNavigator
} from "react-navigation";
import RestaurantList from "components/RestaurantList";
import RestaurantInfo from "components/RestaurantInfo";
import About from "components/About";
import Icon from "react-native-vector-icons/FontAwesome";
import AddReview from "components/AddReview";
import SplashScreen from "react-native-splash-screen";

const List = createStackNavigator(
  {
    Home: { screen: RestaurantList },
    Info: { screen: RestaurantInfo }
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#0066CC",
        color: "#FFF"
      },
      headerTintColor: "#FFF",
      headerTitleStyle: {
        color: "#FFF"
      }
    }
  }
);

const TabNavigator = createBottomTabNavigator(
  {
    List: { screen: List },
    About: { screen: About }
  },
  {
    defaultNavigationOptions: ({ navigation }) => {
      return {
        tabBarIcon: ({ tintColor }) => {
          const route = navigation.state.routeName;
          const name = {
            List: "list",
            About: "info-circle"
          }[route];
          return <Icon name={name} color={tintColor} size={22} />;
        },
        tabBarOptions: {
          activeBackgroundColor: "#E6F0FA"
        }
      };
    }
  }
);

const Stack = createStackNavigator(
  {
    Home: { screen: TabNavigator },
    AddReview: { screen: AddReview }
  },
  {
    mode: "modal",
    headerMode: "none",
    defaultNavigationOptions: {
      gesturesEnabled: false
    }
  }
);

const AppContainer = createAppContainer(Stack);

export default class App extends Component {
  componentDidMount() {
    SplashScreen.hide();
  }
  
  render() {
    return <AppContainer />;
  }
}
