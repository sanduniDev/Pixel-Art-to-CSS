import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import styled from 'styled-components';
import Picker from './Picker';
import * as actionCreators from '../store/actions/actionCreators';
import { RootState } from '../store'; // Update with the correct path to your RootState type

const PickerWrapper = styled.div`
  margin-bottom: 2rem;
`;

// Define the prop types
interface DimensionsProps extends PropsFromRedux {
  columns: number;
  rows: number;
}

const Dimensions: React.FC<DimensionsProps> = ({ columns, rows, actions }) => {
  const changeDimensions = (gridProperty: string, behaviour: any) => {
    actions.changeDimensions(gridProperty, behaviour);
  };

  return (
    <div className="dimensions">
      <PickerWrapper>
        <Picker type="columns" value={columns} action={changeDimensions} />
      </PickerWrapper>
      <PickerWrapper>
        <Picker type="rows" value={rows} action={changeDimensions} />
      </PickerWrapper>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  columns: state.present.getIn(['frames', 'columns']),
  rows: state.present.getIn(['frames', 'rows'])
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

const DimensionsContainer = connector(Dimensions);
export default DimensionsContainer;
