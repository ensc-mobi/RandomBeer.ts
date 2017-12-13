const rootEndpoint = "https://api.punkapi.com/v2";

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json"
};

// retourne une recette de bière au hasard
export const getRandomBrewdog = () =>
  fetch(`${rootEndpoint}/beers/random`, { headers })
    .then(response => response.json())
    .then(beers => beers[0]);
