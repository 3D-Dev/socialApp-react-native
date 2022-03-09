import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { connect } from 'react-redux';
import { compose, setDisplayName } from 'recompose';

import { getSelector } from 'redux/selectors';
import immutableToJS from 'utils/immutableToJS';

import {
  withToastBannerToggler /* or withToastBannerToggler */,
  Transition
} from 'react-native-toast-banner';

class Notification extends Component {
  static propTypes = {
    showBanner: PropTypes.func.isRequired,
    hideBanner: PropTypes.func.isRequired,
    notification: PropTypes.shape().isRequired
  };

  static contextTypes = {
    formatMessage: PropTypes.func
  };

  componentWillReceiveProps(nextProps) {
    const { notification, showBanner, hideBanner } = this.props;
    const { formatMessage } = this.context;
    if (notification !== nextProps.notification) {
      const {
        kind,
        data: { detail }
      } = nextProps.notification;
      showBanner({
        contentView: (
          <Text style={{ color: 'white', textAlign: 'center' }}>
            {formatMessage(detail)}
          </Text>
        ),
        backgroundColor:
          kind === 'error' ? 'rgba(128, 0, 0, 0.7)' : 'rgba(0, 128, 0, 0.7)',
        duration: 5000,
        transitions: [Transition.Move, Transition.FadeInOut],
        onPress: () => {
          hideBanner();
        }
      });
    }
  }

  render() {
    return null;
  }
}

const mapStateToProps = state => ({
  notification: getSelector('ui', 'notification')(state)
});

export default compose(
  setDisplayName('Notification'),
  connect(mapStateToProps),
  immutableToJS,
  withToastBannerToggler
)(Notification);
