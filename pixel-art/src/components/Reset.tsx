import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { resetGrid } from '../store/actions/actionCreators';

// Define the props coming from mapDispatchToProps
const mapDispatchToProps = (dispatch: Dispatch) => ({
  resetGridDispatch: () => dispatch(resetGrid())
});

// Create a connector and derive the type of props it injects
const connector = connect(
  null,
  mapDispatchToProps
);

type PropsFromRedux = ConnectedProps<typeof connector>;

// Component using the props type
const Reset: React.FC<PropsFromRedux> = ({ resetGridDispatch }) => (
  <button type="button" className="reset" onClick={resetGridDispatch}>
    RESET
  </button>
);

const ResetContainer = connector(Reset);
export default ResetContainer;
