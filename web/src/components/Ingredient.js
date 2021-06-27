import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Ingredient({ id }) {
  const [datas, setDatas] = useState([]);

  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;

  const getData = async () => {
    await axios
      .get(url)
      .then((res) => {
        let tempDrinks = res.data.drinks[0];
        setDatas(tempDrinks);
        //console.log(datas);
      })
      .catch((err) => console.log('Something went wrong--', err));
  };
  useEffect(() => {
    getData();
  }, []);

  const drinkList = () => {
    const items = [];
    for (let i = 1; i < 16; i++) {
      let newvar = 'strIngredient' + i;
      //console.log(newvar);
      if (datas[newvar]) {
        items.push(<p>Ingredient: {datas[newvar]}</p>);
      }
    }
    return items;
  };

  return (
    <div>
      <h5>{datas.strInstructions}</h5>
      <br />
      <h5>{drinkList()}</h5>
    </div>
  );
}

export default Ingredient;
