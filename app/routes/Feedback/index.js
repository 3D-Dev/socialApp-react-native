import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Text } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { connect } from 'react-redux';

import { getSelector } from 'redux/selectors';
import { readFeedbacks, setFeedbacks } from 'redux/feedback/actions';
import { App } from 'components';
import { HeaderTitle, HeaderRight } from 'elements';
import { convertPropFeedbacksToState } from 'utils/feedback';

import Received from './Received';
import Requested from './Requested';
import Sent from './Sent';
import Pending from './Pending';

class Feedback extends Component {
  static propTypes = {
    readFeedbacks: PropTypes.func.isRequired,
    setFeedbacks: PropTypes.func.isRequired,
    feedbacks: PropTypes.shape({
      updated: PropTypes.string,
      feedbacks: PropTypes.arrayOf(PropTypes.shape({}))
    }).isRequired
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    profileData: PropTypes.shape().isRequired,
    currentTheme: PropTypes.shape()
  };

  constructor(props, context) {
    super(props);
    this.state = {
      index: 0,
      routes: [
        { key: 'requested', title: 'Requested' },
        { key: 'received', title: 'Received' },
        { key: 'pending', title: 'Pending' },
        { key: 'sent', title: 'Sent' }
      ],
      feedbacks: props.feedbacks
        ? convertPropFeedbacksToState(props.feedbacks, context.profileData)
        : {}
    };
  }

  componentDidMount() {
    const { readFeedbacks, feedbacks } = this.props;
    readFeedbacks({
      onSuccess: payload => {
        if (
          !feedbacks.updated ||
          payload.feedbacks.feedbacks.length === 0 ||
          new Date(payload.feedbacks.updated) > new Date(feedbacks.updated)
        ) {
          this.forceUpdateLocalFeedback(payload.feedbacks);
        }
      }
    });
  }

  forceUpdateLocalFeedback = feedbacks => {
    const { setFeedbacks } = this.props;
    const { profileData } = this.context;
    setFeedbacks(feedbacks);
    this.setState({
      feedbacks: convertPropFeedbacksToState(feedbacks, profileData)
    });
  };

  removeFeedbacks = (groupId, userId) => {
    const { feedbacks } = this.props;
    let newFeedbacks = JSON.stringify(feedbacks);
    newFeedbacks = JSON.parse(newFeedbacks).feedbacks || [];
    if (newFeedbacks.length > 0) {
      newFeedbacks = newFeedbacks.filter(
        item => item.groupId !== groupId || item.receiver._id !== userId
      );
    }
    this.forceUpdateLocalFeedback({ feedbacks: newFeedbacks });
  };

  leftAnswers = (feedback_id, answer) => {
    const { feedbacks } = this.props;
    let newFeedbacks = JSON.stringify(feedbacks);
    newFeedbacks = JSON.parse(newFeedbacks).feedbacks || [];
    if (newFeedbacks.length > 0) {
      const index = newFeedbacks.findIndex(item => item._id === feedback_id);
      newFeedbacks[index] = {
        ...newFeedbacks[index],
        Feedback: answer,
        pending: false
      };
    }
    this.forceUpdateLocalFeedback({ feedbacks: newFeedbacks });
  };

  render() {
    const { formatMessage, currentTheme } = this.context;
    const { index, routes, feedbacks } = this.state;

    return (
      <App>
        <HeaderTitle>{formatMessage('Feedback.headerTitle')}</HeaderTitle>
        <HeaderRight />
        <TabView
          navigationState={{ index, routes }}
          renderScene={SceneMap({
            pending: () => (
              <Pending
                pending={feedbacks.pending || []}
                forceUpdateLocalFeedback={this.forceUpdateLocalFeedback}
                callback={this.leftAnswers}
              />
            ),
            requested: () => (
              <Requested
                requested={(feedbacks || {}).requested || []}
                forceUpdateLocalFeedback={this.forceUpdateLocalFeedback}
                callback={this.removeFeedbacks}
              />
            ),
            received: () => <Received received={feedbacks.received || []} />,
            sent: () => <Sent sent={feedbacks.sent || []} />
          })}
          renderTabBar={props => {
            return (
              <TabBar
                {...props}
                indicatorStyle={{
                  backgroundColor: currentTheme.COLORS.PRIMARY
                }}
                style={{ backgroundColor: 'transparent' }}
                renderLabel={({ route }) => {
                  const routeTitle = route.title
                    ? route.title.toLowerCase()
                    : '';

                  const thisFeedbacks = (feedbacks || {})[routeTitle] || [];
                  const len = thisFeedbacks.length;
                  const alert = len > 0 ? `(${len})` : '';
                  const title = formatMessage(`feedback.${routeTitle}`);
                  return (
                    <Text
                      style={{
                        color: currentTheme.COLORS.PRIMARY,
                        fontSize: 10
                      }}
                    >
                      {title + alert}
                    </Text>
                  );
                }}
              />
            );
          }}
          onIndexChange={index => this.setState({ index })}
          initialLayout={{ flex: 1 }}
        />
      </App>
    );
  }
}

const mapStateToProps = state => ({
  feedbacks: getSelector('feedback', 'feedbacks')(state)
});

const mapDispatchToProps = dispatch => ({
  readFeedbacks: payload => dispatch(readFeedbacks(payload)),
  setFeedbacks: payload => dispatch(setFeedbacks(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(Feedback);
