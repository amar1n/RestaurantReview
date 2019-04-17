import React, { Component } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  Image,
  Alert
} from "react-native";
import Stars from "components/Stars";
import { withNavigation } from "react-navigation";
import Swipeout from "react-native-swipeout";

class RestaurantRow extends Component {
  infoPressed = () => {
    this.props.navigation.navigate("Info", { place: this.props.place });
  };

  render() {
    const { place, index } = this.props;

    const swipeSettings = {
      autoClose: true,
      onClose: (secId, rowId, direction) => {},
      onOpen: (secId, rowId, direction) => {},
      left: [
        {
          onPress: () => {
            Alert.alert(
              "Alert",
              "Are you sure you want to delete?",
              [
                {
                  text: "No",
                  onPress: () => console.log("Cancel pressed"),
                  style: "cancel"
                },
                {
                  text: "Yes",
                  onPress: () => {
                    console.log("Delete pressed");
                    this.props.onDeleteRestaurant(place);
                  }
                }
              ],
              { cancelable: true }
            );
          },
          text: "Delete",
          type: "delete"
        }
      ],
      rowId: this.props.index,
      sectionId: 1
    };

    return (
      <Swipeout {...swipeSettings}>
        <View
          style={{ backgroundColor: index % 2 === 0 ? "white" : "#F3F3F7" }}
          key={place.title}
        >
          <View style={styles.row}>
            <View style={styles.stars}>
              <Stars rating={place.id} />
            </View>
            <View style={styles.nameAddress}>
              <Text>{place.title}</Text>
            </View>
            <View style={styles.edges}>
              <TouchableHighlight
                onPress={this.infoPressed}
                style={styles.button}
                underlayColor="#5398DC"
              >
                <Text style={styles.buttonText}>Info</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </Swipeout>
    );
  }
}

const styles = StyleSheet.create({
  row: { flexDirection: "row" },
  edges: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    minWidth: 50
  },
  stars: {
    flex: 1,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    padding: 5,
    minWidth: 50
  },
  nameAddress: { flexDirection: "column", flex: 8 },
  addressText: { color: "grey" },
  button: {
    borderWidth: 1,
    borderColor: "#0066CC",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#FFF"
  },
  buttonText: {
    color: "#0066CC",
    fontSize: 12
  },
  info: {
    marginHorizontal: 40,
    marginVertical: 10,
    padding: 10,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 4
  }
});

export default withNavigation(RestaurantRow);
