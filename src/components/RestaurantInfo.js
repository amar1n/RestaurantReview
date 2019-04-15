import React, { Component } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import Stars from "components/Stars";

export default class RestaurantInfo extends Component {
  static navigationOptions = {
    title: "Restaurant Info"
  };
  addReview = () => {
    this.props.navigation.navigate("AddReview");
  };

  render() {
    const place = this.props.navigation.getParam("place");

    return (
      <ScrollView style={styles.root}>
        <View style={styles.infoHeader}>
          <Image
            source={{
              uri: place.thumbnailUrl
            }}
            style={[styles.image, { flex: 1 }]}
            resizeMode="contain"
          />
          <View style={[styles.info, { flex: 2 }]}>
            <Text style={styles.albumId}>{place.albumId}</Text>
            <Text style={styles.title}>{place.title}</Text>
            <Stars rating={place.id} />
            <TouchableOpacity style={styles.button} onPress={this.addReview}>
              <Text style={styles.buttonText}>Add Review</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: "#fff"
  },
  infoHeader: {
    flexDirection: "row"
  },
  info: {
    marginTop: 20,
    marginRight: 20
  },
  albumId: {
    fontSize: 24
  },
  title: {
    color: "grey",
    marginBottom: 5
  },
  image: {
    width: 100,
    height: 100,
    margin: 20
  },
  button: {
    borderWidth: 1,
    borderColor: "#0066cc",
    borderRadius: 14,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: "#fff",
    marginTop: 10
  },
  buttonText: {
    color: "#0066cc",
    fontSize: 12,
    textAlign: "center"
  }
});
