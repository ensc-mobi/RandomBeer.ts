// Example React Native app
// Very much inspired by http://putaindecode.io/fr/articles/js/react/native/introduction/

import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
  Text,
  View,
} from "react-native";
import { getRandomBrewdog, Beer } from "./services/punkapi.service";

interface AppState {
  isLoading: boolean; // Is a beer request pending?
  name: string; // Beer name
  description: string; // Beer description
}

export default class App extends Component<{}, AppState> {
  // Initial state
  state: AppState = {
    name: "",
    description: "",
    isLoading: false,
  };

  // Function called when user want to search for another beer
  _getRandomBrewdogWithFeedback = () => {
    // Begin a new request for a beer
    this.setState({ isLoading: true });

    getRandomBrewdog().then((beer: Beer) =>
      this.setState({
        name: beer.name,
        description: beer.description,
        isLoading: false, // Request is finished
      })
    );
  };

  componentDidMount() {
    this._getRandomBrewdogWithFeedback();
  }

  render() {
    const content = this.state.isLoading ? (
      <ActivityIndicator /> // If a request is pending, display a spinner
    ) : (
      <View style={styles.infosContainer}>
        <Text style={styles.name}>{this.state.name}</Text>

        <Text style={styles.description}>{this.state.description}</Text>

        <TouchableOpacity // Add a button to fetch another beer
          onPress={this._getRandomBrewdogWithFeedback}
          style={styles.button}
        >
          <Text>Grab a new beer!</Text>
        </TouchableOpacity>
      </View>
    );

    return <View style={styles.container}>{content}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  infosContainer: {
    margin: 30,
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10,
  },
  description: {
    marginBottom: 10,
  },
  button: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 3,
    padding: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});
