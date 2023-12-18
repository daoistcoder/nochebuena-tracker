import './App.css'

import { FoodCreateForm } from './ui-components'
import { Alert, Heading } from '@aws-amplify/ui-react'
import { useEffect, useState } from 'react';
import { DataStore } from '@aws-amplify/datastore';
import { Food, Category } from './models';

function App() {
  const [food, setFood] = useState([]);
  const [showForm, setShowForm] = useState(true);

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
      {showForm ? (
        <div style={styles.formContainer}>
          <FoodCreateForm onSuccess={() => {
            setShowForm(false);
          }}/>
        </div>
      ) : (
        <Alert variation='success' style={styles.alerts}>Salamat sa pagvolunteer! kita kits sa Pasko!</Alert>
      )}
      <div style={styles.formContainer2}>
        <Heading level={3}>Mga Handa 🍽️</Heading>
        <div style={styles.categories}>
          {Object.entries(Category).map(([category]) => {
            // Filter the food array to get items in this category
            const itemsInCategory = food.filter(item => item.category === category);

            // If there are no items in this category, return null
            if (itemsInCategory.length === 0) {
              return null;
            }

            // If there are items in this category, return the category and its items
            return (
              <div key={category} style={styles.category}>
                <Heading level={5}>{category.charAt(0).toUpperCase() + category.slice(1).toLocaleLowerCase()}</Heading>
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
    height: 'max-content',
    border: '1px solid #ccc', // Add a border
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Add a box-shadow
    borderRadius: '5px',
  },

  formContainer2: { // css for sub container with 
    width: '55%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'start',
    gap: '1vh',
    height: 'max-content',
  },
  // css for category columns
  categories: {
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr 1fr',
    gap: '1rem',
    padding: '0 1rem',
  },
  // css for category columns
  category: {
    borderRadius: '5px',
    backgroundColor: 'hsl(130, 60%, 95%)',
  },
  head1: {
    textAlign: 'center',
    marginBottom: '1vh',
  },
  alerts: {
    fontSize: '1.5rem',
    width: '55%',
    marginBottom: '1vh',
  },
};

export default App
