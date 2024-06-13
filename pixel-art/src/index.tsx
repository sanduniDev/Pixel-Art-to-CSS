import 'dotenv/config';
import mongoose from 'mongoose';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';
import './css/imports.css';
import useStore from './store/useStore';
import Root from './components/Root';

// Interface for the environment variables if needed
interface ProcessEnv {
  NODE_ENV?: string;
  GOOGLE_ANALYTICS_ID?: string;
  MONGO_URI?: string;
}

declare const process: {
  env: ProcessEnv;
};

// Get the MongoDB URI from environment variables
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}

// Options for mongoose connection
const options: mongoose.ConnectOptions = {
    useUnifiedTopology: true,
};

// Connect to MongoDB using mongoose
mongoose.connect(MONGO_URI, options)
    .then(() => console.log('Connected to MongoDB'))
    .catch((err: Error) => console.error('Error connecting to MongoDB', err));

// Determine if the app is in development mode
const devMode = process.env.NODE_ENV === 'development';

// Initialize Google Analytics if the ID is provided
if (process.env.GOOGLE_ANALYTICS_ID) {
  ReactGA.initialize(process.env.GOOGLE_ANALYTICS_ID);
}

// Get the mount node for React application
const mountNode = document.getElementById('app') as HTMLElement;

// Render the React application
ReactDOM.render(<Root store={useStore} />, mountNode);
