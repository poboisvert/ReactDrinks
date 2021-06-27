import { useState, useEffect } from 'react';
import './App.css';
import Card from './components/Card';
import buildData from './api/api';

function App() {
  const [data, setData] = useState([]);
  const [filterData, setFilterData] = useState([]);
  // https://levelup.gitconnected.com/how-to-search-filter-through-data-in-react-26f1545fe3a1
  const [searchTerm, setSearchTerm] = useState('');
  const [tag, setTag] = useState([]);

  // API
  const client = buildData();

  // First render - Once the page load - Call Axios and fetch data
  useEffect(() => {
    // Use axios Instance - /api folder
    client
      .get()
      .then((res) => {
        // Store fetching
        let data = res.data.drinks;
        // Loop and store - tag
        data.map((res) => {
          res.tagsList = [];
        });

        setData(data); // React set state - No Filter
        setFilterData(data); // // React set state - Filtered
      })
      .catch((err) => console.log('Fetching Error', err));
  }, []);

  // Render on tag - Filter the data base on input box
  useEffect(
    () => {
      const results = data.filter((e) => e.tagsList.includes(tag));

      setFilterData(results);
    },
    [tag]
  );
  // Render on input - Filter the data base on input box
  // https://dev.to/asimdahall/simple-search-form-in-react-using-hooks-42pg
  useEffect(
    () => {
      const results = data.filter((e) =>
        e.strDrink.toLowerCase().includes(searchTerm)
      );

      setFilterData(results);
    },
    [searchTerm]
  );

  return (
    <div className='container'>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder='Search by drink'
      />
      <input
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder='Search by tag'
      />
      {!tag && !searchTerm ? (
        data.map((res) => {
          return (
            <Card key={res.strDrink} search={searchTerm} tag={tag} data={res} />
          );
        })
      ) : (
        filterData.map((res) => {
          return (
            <Card key={res.strDrink} search={searchTerm} tag={tag} data={res} />
          );
        })
      )}
    </div>
  );
}

export default App;
