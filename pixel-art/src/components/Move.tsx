import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Dispatch } from 'redux';
import { switchTool } from '../store/actions/actionCreators';
import { MOVE } from '../store/reducers/drawingToolStates';
import { RootState } from '../store'; // Assuming you have a RootState defined for your Redux store

// Define the component's props type using ConnectedProps
type Props = ConnectedProps<typeof connector>;

// Functional component with destructured props
const Move: React.FC<Props> = ({ moveOn, switchMove }) => (
  <button
    type="button"
    aria-label="Move Tool"
    className={`move${moveOn ? ' selected' : ''}`}
    onClick={switchMove}
  />
);

// Mapping Redux state to component props
const mapStateToProps = (state: RootState) => ({
  moveOn: state.present.get('drawingTool') === MOVE
});

// Mapping dispatch to props
const switchMoveAction = switchTool(MOVE);
const mapDispatchToProps = (dispatch: Dispatch) => ({
  switchMove: () => dispatch(switchMoveAction)
});

// Connect Redux to the component
const connector = connect(mapStateToProps, mapDispatchToProps);
const MoveContainer = connector(Move);
export default MoveContainer;
