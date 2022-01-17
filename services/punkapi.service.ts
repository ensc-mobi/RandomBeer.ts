const rootEndpoint = "https://api.punkapi.com/v2";

export interface Beer {
  name: string;
  description: string;
}

const headers = {
  "Content-Type": "application/json",
  Accept: "application/json",
};

// Return a random beer from API
export const getRandomBrewdog = () =>
  fetch(`${rootEndpoint}/beers/random`, { headers })
    .then((response) => response.json())
    .then((beers) => beers[0]) // Access first element of returned array
    .catch((error) => {
      console.error(error);
    });
