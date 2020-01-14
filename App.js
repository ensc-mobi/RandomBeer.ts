// Example React Native app
// Very much inspired by http://putaindecode.io/fr/articles/js/react/native/introduction/

import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  ActivityIndicator, // import des composants
  TouchableOpacity,
  Text,
  View
} from "react-native";
import { getRandomBrewdog } from "./helpers/punkapi";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    // la state de notre composant est utilisé pour
    // stocker quelques infos renvoyées par l'API
    this.state = {
      name: "", // nom de la bière
      description: "", // sa description
      isLoading: false // la requête API est-elle en cours ?
    };
  }

  // nous externalisons cette fonction afin de
  // pouvoir l'appeler lorsqu'on le souhaite
  _getRandomBrewdogWithFeedback = () => {
    this.setState({ isLoading: true });

    getRandomBrewdog().then(beer =>
      this.setState({
        name: beer.name,
        description: beer.description,
        isLoading: false // la requête est terminée
      })
    );
  };

  componentDidMount() {
    this._getRandomBrewdogWithFeedback();
  }

  render() {
    const content = this.state.isLoading ? (
      <ActivityIndicator /> // si requête en cours, on affiche un spinner
    ) : (
      <View style={styles.infosContainer}>
        <Text style={styles.name}>{this.state.name}</Text>

        <Text style={styles.description}>{this.state.description}</Text>

        <TouchableOpacity // on ajoute un "bouton" qui requête une autre bière aléatoire
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
    justifyContent: "center"
  },
  // ajout de styles divers
  infosContainer: {
    margin: 30
  },
  name: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 10
  },
  description: {
    marginBottom: 10
  },
  button: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 3,
    padding: 5,
    justifyContent: "center",
    alignItems: "center"
  }
});
