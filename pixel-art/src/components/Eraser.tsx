import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { switchTool } from '../store/actions/actionCreators';
import { ERASER } from '../store/reducers/drawingToolStates';
import { RootState } from '../store'; // Update with the correct path to your RootState type

interface EraserProps extends PropsFromRedux {}

const Eraser: React.FC<EraserProps> = ({ eraserOn, switchEraser }) => (
  <button
    type="button"
    aria-label="Eraser Tool"
    className={`eraser${eraserOn ? ' selected' : ''}`}
    onClick={switchEraser}
  />
);

const mapStateToProps = (state: RootState) => ({
  eraserOn: state.present.get('drawingTool') === ERASER
});

const mapDispatchToProps = (dispatch: any) => ({
  switchEraser: () => dispatch(switchTool(ERASER))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Eraser);
