import './App.css'

import { FoodCreateForm } from './ui-components'
import { Heading } from '@aws-amplify/ui-react'
import { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Food, Category } from './models';

function App() {
  const [food, setFood] = useState([]);

  useEffect(() => {
    const getData = async () => {
      await DataStore.observeQuery(Food).subscribe(({ items }) => {
        setFood(items)
      })
    }
    getData()
  })

  return (
    <div style={styles.container}>
      <Heading level={1} style={styles.head1}>Noche Buena 🎄</Heading>
      <div style={styles.formContainer}>
        <FoodCreateForm />
      </div>
      <div style={styles.formContainer2}>
        <Heading level={3}>Mga Handa 🍽️</Heading>
        <div style={styles.category}>
          {Object.entries(Category).map(([category]) => {
            // Filter the food array to get items in this category
            const itemsInCategory = food.filter(item => item.category === category);

            // If there are no items in this category, return null
            if (itemsInCategory.length === 0) {
              return null;
            }

            // If there are items in this category, return the category and its items
            return (
              <div key={category}>
                <Heading level={5}>{category}</Heading>
                <ul>
                  {food.map(item => {
                    if (item.category === category) {
                      return <li key={item.id}>{item.title} ni {item.person}</li>
                    }
                  })}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1vh',
    height: '100vh',
  },
  formContainer: {
    height: '45vh',
    border: '1px solid #ccc', // Add a border
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Add a box-shadow
    borderRadius: '5px',
  },

  formContainer2: { // css for sub container with 
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '1vh',
    height: '30vh',
  },
  // css for category columns
  category: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '1rem',
    padding: '0 1rem',
  },
  head1: {
    textAlign: 'center',
    marginBottom: '1vh',
  },
};

export default App
