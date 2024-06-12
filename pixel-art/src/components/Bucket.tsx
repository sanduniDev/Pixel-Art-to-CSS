import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { RootState } from '../store'; // Import your RootState type if you have it
import { switchTool } from '../store/actions/actionCreators';
import { BUCKET } from '../store/reducers/drawingToolStates';

// Define types for any props passed from parent component (if any)
interface OwnProps {}

// Type state from redux store
const mapStateToProps = (state: RootState) => ({
  bucketOn: state.present.get('drawingTool') === BUCKET
});

// Define action creators
const switchBucketAction = switchTool(BUCKET);
const mapDispatchToProps = (dispatch: any) => ({
  switchBucket: () => dispatch(switchBucketAction)
});

// Creating connector to infer Props type from mapStateToProps and mapDispatchToProps
const connector = connect(mapStateToProps, mapDispatchToProps);

// This type will include all props passed to Bucket component
type PropsFromRedux = ConnectedProps<typeof connector>;

type BucketProps = PropsFromRedux & OwnProps;

const Bucket: React.FC<BucketProps> = ({ bucketOn, switchBucket }) => (
  <button
    type="button"
    aria-label="Paint Bucket Tool"
    className={`bucket${bucketOn ? ' selected' : ''}`}
    onClick={switchBucket}
  />
);

const BucketContainer = connector(Bucket);
export default BucketContainer;
