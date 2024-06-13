import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import './css/imports.css';
import configureStore from './store/configureStore';
import Root from './components/Root';


// Define interface for the environment variables if needed
interface ProcessEnv {
  NODE_ENV?: string;
  GOOGLE_ANALYTICS_ID?: string;
}

declare const process: {
  env: ProcessEnv;
};

const devMode = process.env.NODE_ENV === 'development';
const store = configureStore(devMode) as Store; 

if (process.env.GOOGLE_ANALYTICS_ID) {
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID);
}


const mountNode = document.getElementById('app') as HTMLElement;

ReactDOM.render(<Root store={store} />, mountNode);
