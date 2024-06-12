import React, { ChangeEvent } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { RootState } from '../store'; // Ensure you have the RootState type defined
import * as actionCreators from '../store/actions/actionCreators';

// Define types for the state and dispatch props
interface StateProps {
  cellSize: number;
}

interface DispatchProps {
  actions: {
    setCellSize: (size: number) => void;
  };
}

// Combine props types
type Props = StateProps & DispatchProps;

const CellSize: React.FC<Props> = ({ cellSize, actions }) => {
  const handleCellSizeChange = (event: ChangeEvent<HTMLInputElement>) => {
    actions.setCellSize(+event.target.value || 0);
  };

  return (
    <div className="cell-size">
      <label htmlFor="cell-size__input">
        Pixel Size
        <input
          type="number"
          value={cellSize}
          onChange={handleCellSizeChange}
          id="cell-size__input"
        />
      </label>
    </div>
  );
};

const mapStateToProps = (state: RootState): StateProps => ({
  cellSize: state.present.get('cellSize'),
});

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

export default connector(CellSize);
