import './App.css'

import { FoodCreateForm } from './ui-components'

function App() {
  return (
    <FoodCreateForm style={styles.container} />
  )
}

const styles = {
  container: {
    height: '45vh',
    border: '1px solid #ccc', // Add a border
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)', // Add a box-shadow
    borderRadius: '5px',
  },
};

export default App
