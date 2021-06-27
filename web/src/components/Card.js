import React, { useState } from 'react';
import './Card.css';
import Ingredient from './Ingredient';

// Material UI
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

const Card = ({ data }) => {
  const [newTag, setNewTag] = useState('');
  const [isActive, setIsActive] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    data.tagsList.push(newTag);
    setNewTag('');
  };

  return (
    <div className='card'>
      <div className='left'>
        <div className='img'>
          <img src={data.strDrinkThumb} alt='' />
        </div>
      </div>

      <div className='right'>
        <div className='title'>
          <h1>{data.strDrink.toUpperCase()}</h1>
          <div className='icon'>
            {!isActive ? (
              <AddIcon
                fontSize='large'
                onClick={() => setIsActive(!isActive)}
              />
            ) : (
              <RemoveIcon
                fontSize='large'
                onClick={() => setIsActive(!isActive)}
              />
            )}
          </div>
        </div>

        <div className='content'>
          <p>Drink ID: {data.idDrink}</p>
          <p>Name: {data.strDrink}</p>

          <div className={isActive ? '' : 'dropdown'}>
            <Ingredient id={data.idDrink} />
          </div>
          {data.tagsList.map((i) => <p className='tags'>{i}</p>)}
          {/* Form Add Tag*/}
          <form onSubmit={submit}>
            <input
              className='input-tag'
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              placeholder='Add a tag'
            />
          </form>
        </div>
      </div>
    </div>
  );
};

export default Card;
