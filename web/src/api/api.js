import axios from 'axios';

export default () => {
  return axios.create({
    baseURL:
      'https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail',
  });
};
