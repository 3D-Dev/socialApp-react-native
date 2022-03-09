import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { getSelector } from 'redux/selectors';
import { readFeedbacks, setFeedbacks } from 'redux/feedback/actions';
import { H4, H5 } from 'elements';
import { FlatListWithEnd } from 'components';
import { convertPropFeedbacksToState } from 'utils/feedback';

import Feedback from './Feedback';

const Container = styled.View`
  padding-horizontal: 10px;
  margin-bottom: 20px;
`;

const NoData = styled.View`
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 8;
  margin-horizontal: 10px;
`;

class FeedbackHorizontal extends Component {
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
    profileData: PropTypes.shape().isRequired
  };

  constructor(props, context) {
    super(props);
    this.state = {
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
          new Date(payload.feedbacks.updated) > new Date(feedbacks.updated)
        ) {
          const { setFeedbacks } = this.props;
          const { profileData } = this.context;
          setFeedbacks(payload.feedbacks);
          this.setState({
            feedbacks: convertPropFeedbacksToState(
              payload.feedbacks,
              profileData
            )
          });
        }
      }
    });
  }

  render() {
    const { formatMessage } = this.context;
    const { feedbacks } = this.state;
    const contents = feedbacks.received || [];

    return (
      <Container>
        <TouchableOpacity
          onPress={() => {
            Actions.feedback();
          }}
          style={{ paddingLeft: 10 }}
        >
          <H4 align="left" mt={20} mb={10}>
            {formatMessage('profile.feedback.title')}
          </H4>
        </TouchableOpacity>

        {contents.length === 0 ? (
          <NoData>
            <H5 mt={30} mb={30}>
              {formatMessage('profile.noData', { type: 'feedback' })}
            </H5>
          </NoData>
        ) : (
          <FlatListWithEnd
            horizontal
            scrollEnabled
            data={contents}
            keyExtractor={(item, index) => `${index}`}
            renderItem={({ item }) => {
              if (item) {
                return <Feedback item={item} />;
              }
              return <View />;
            }}
          />
        )}
      </Container>
    );
  }
}

const mapStateToProps = state => ({
  feedbacks: getSelector('feedback', 'feedbacks')(state),
  profileData: getSelector('user', 'profileData')(state)
});

const mapDispatchToProps = dispatch => ({
  readFeedbacks: payload => dispatch(readFeedbacks(payload)),
  setFeedbacks: payload => dispatch(setFeedbacks(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(FeedbackHorizontal);
