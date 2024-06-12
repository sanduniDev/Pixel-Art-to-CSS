import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import * as actionCreators from '../store/actions/actionCreators';
import { RootState } from '../store'; // Update with the correct path to your RootState type

const Duration: React.FC<PropsFromRedux> = ({ actions, duration }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    actions.setDuration(Number(event.target.value));
  };

  return (
    <div className="duration">
      <label htmlFor="duration__input">
        Duration
        <input
          type="number"
          value={duration}
          onChange={handleChange}
          id="duration__input"
        />
      </label>
    </div>
  );
};

const mapStateToProps = (state: RootState) => ({
  duration: state.present.get('duration'),
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch),
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

export default connector(Duration);
