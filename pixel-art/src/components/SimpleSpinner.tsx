// SimpleSpinner.tsx
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store'; // Ensure this import path is correct for your RootState type

// Define props from state
const mapStateToProps = (state: RootState) => ({
  loading: state.present.get('loading') // Assuming 'present' is a part of your state structure and 'loading' is a boolean
});

// Create a connector and derive the type of props it injects
const connector = connect(mapStateToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

// SimpleSpinner Component using the props type
const SimpleSpinner: React.FC<PropsFromRedux> = ({ loading }) => (
  <div className={`simple-spinner${loading ? ' display' : ''}`}>
    <div className="circle" />
  </div>
);

export default connector(SimpleSpinner);
