import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import * as actionCreators from '../store/actions/actionCreators';
import { RootState } from '../store'; // Import your root Redux state type

// Define props from state
const mapStateToProps = (state: RootState) => ({
  notifications: state.present.get('notifications').toArray() // Assuming notifications are stored in an Immutable.js structure
});

// Mapping dispatch to props using bindActionCreators
const mapDispatchToProps = (dispatch: Dispatch) => ({
  actions: bindActionCreators(actionCreators, dispatch)
});

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

// Extend props definition with any additional props not related to Redux
interface SimpleNotificationProps extends PropsFromRedux {
  duration: number;
  fadeInTime: number;
  fadeOutTime: number;
}

// Component
const SimpleNotification: React.FC<SimpleNotificationProps> = ({
  duration,
  fadeInTime,
  fadeOutTime,
  notifications,
  actions
}) => {
  const removeNotifications = () => {
    setTimeout(() => {
      actions.sendNotification(''); // This needs to be properly typed based on the actual action creator
    }, duration);
  };

  const timeout = { enter: fadeInTime, exit: fadeOutTime };
  
  const notificationList = notifications.map((item: any) => ( // Adjust type as necessary
    <CSSTransition
      key={item.id}
      timeout={timeout}
      classNames="simple-notification"
    >
      <div className="simple-notification">
        {item.message}
      </div>
    </CSSTransition>
  ));

  if (notificationList.length > 0) {
    removeNotifications();
  }

  return <TransitionGroup>{notificationList}</TransitionGroup>;
};

export default connector(SimpleNotification);
