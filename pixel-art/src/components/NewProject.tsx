import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';

// Define the props interface using ConnectedProps
type Props = ConnectedProps<typeof connector>;

const NewProject: React.FC<Props> = ({ actions }) => {
  const newProject = () => {
    actions.newProject();
  };

  return (
    <div className="new-project">
      <button
        type="button"
        onClick={newProject}
      >
        NEW
      </button>
    </div>
  );
};

// Bind action creators to dispatch
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

// Create the connector and apply it to the component
const connector = connect(
  null,
  mapDispatchToProps
);
const NewProjectContainer = connector(NewProject);
export default NewProjectContainer;
