import React, { Component } from "react";
import { View, StyleSheet, TextInput, FlatList, Image } from "react-native";
import Header from "components/Header";
import RestaurantRow from "components/RestaurantRow";
import PizzaImage from "images/pizza.png";
import axios from "axios";

export default class RestaurantList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: null,
      restaurants: [],
      restaurantsDeleted: []
    };

    this.handleDeleteRestaurant = this.handleDeleteRestaurant.bind(this);
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    axios.get("https://jsonplaceholder.typicode.com/photos").then(result => {
      this.setState({ restaurants: result.data });
    });
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <Image source={PizzaImage} />
        </View>

        <Header />

        <TextInput
          style={styles.input}
          placeholder="Live Search"
          onChangeText={text => this.setState({ search: text })}
          value={this.state.search}
        />
        <FlatList
          data={this.state.restaurants.filter(place => {
            return (
              !this.state.search ||
              place.title.toLowerCase().indexOf(this.state.search) > -1
            );
          })}
          renderItem={({ item, index }) => (
            <RestaurantRow
              place={item}
              index={index}
              navigate={this.props.navigation}
              onDeleteRestaurant={this.handleDeleteRestaurant}
            />
          )}
          keyExtractor={item => item.title}
          initialNumToRender={1}
          windowSize={1}
          maxToRenderPerBatch={1}
        />
      </View>
    );
  }

  handleDeleteRestaurant(place) {
    const restaurantsDeleted = this.state.restaurantsDeleted.concat(place);
    restaurants = this.state.restaurants.filter(
      el => !restaurantsDeleted.includes(el)
    );

    this.setState({ restaurants, restaurantsDeleted });
  }
}

const styles = StyleSheet.create({
  input: {
    padding: 10,
    paddingHorizontal: 20,
    fontSize: 16,
    color: "#444",
    borderBottomWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#F5F5F5"
  }
});
