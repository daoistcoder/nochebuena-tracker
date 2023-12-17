import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { Amplify } from 'aws-amplify';
import { ThemeProvider } from '@aws-amplify/ui-react';

import amplifyconfig from './amplifyconfiguration.json';
import studioTheme from './ui-components/studioTheme';

import '@aws-amplify/ui-react/styles.css';

Amplify.configure(amplifyconfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <ThemeProvider theme={studioTheme}>
    <App />
  </ThemeProvider>
)
