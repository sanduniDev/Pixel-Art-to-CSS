// UndoRedo.tsx
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';

// Define the actions interface assuming actionCreators includes undo and redo actions
interface ActionProps {
  undo: () => void;
  redo: () => void;
}

// Map dispatch to props
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators<ActionProps, ActionProps>(actionCreators, dispatch)
});

// Create a connector and derive the type of props it injects
const connector = connect(
  null,
  mapDispatchToProps
);

// Use ConnectedProps to infer props type from the connector
type PropsFromRedux = ConnectedProps<typeof connector>;

// UndoRedo Component using the props type
const UndoRedo: React.FC<PropsFromRedux> = ({ actions }) => {
  const undo = () => {
    actions.undo();
  };

  const redo = () => {
    actions.redo();
  };

  return (
    <div className="undo-redo">
      <button type="button" onClick={undo}>
        <span className="undo-redo__icon--undo" />
      </button>
      <button type="button" onClick={redo}>
        <span className="undo-redo__icon--redo" />
      </button>
    </div>
  );
};

export default connector(UndoRedo);
