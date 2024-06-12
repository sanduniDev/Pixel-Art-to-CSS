import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { switchTool } from '../store/actions/actionCreators';
import { EYEDROPPER } from '../store/reducers/drawingToolStates';
import { RootState } from '../store'; // Update with the correct path to your RootState type

interface EyedropperProps extends PropsFromRedux {}

const Eyedropper: React.FC<EyedropperProps> = ({ eyedropperOn, switchEyedropper }) => (
  <button
    type="button"
    aria-label="Eyedropper Tool"
    className={`eyedropper${eyedropperOn ? ' selected' : ''}`}
    onClick={switchEyedropper}
  />
);

const mapStateToProps = (state: RootState) => ({
  eyedropperOn: state.present.get('drawingTool') === EYEDROPPER
});

const mapDispatchToProps = (dispatch: any) => ({
  switchEyedropper: () => dispatch(switchTool(EYEDROPPER))
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Eyedropper);
