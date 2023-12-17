import './App.css'

import { FoodCreateForm } from './ui-components'
import { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Food } from './models';

function App() {
  const [food, setFood] = useState([]);

  useEffect(() => {
    const getData = () => {
      DataStore.observeQuery(Food).subscribe(({ items }) => {
        setFood(items)
      })
    }
    getData()
  })

  return (
    <div style={styles.container}>
      <FoodCreateForm />
      <div>
        <h2>Foods</h2>
        <ul>
          {food.map(item => {
            return <li key={item.id}>{item.title} - {item.person}</li>
          })}
        </ul>
      </div>
    </div>
  )
}

const styles = {
  container: {
    height: '45vh',
    border: '1px solid #ccc', // Add a border
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Add a box-shadow
    borderRadius: '5px',
    marginBottom: '20vh', // Add some margin at the bottom
  },
};

export default App
