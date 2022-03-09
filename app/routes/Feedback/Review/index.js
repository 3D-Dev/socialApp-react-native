import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import uuid from 'uuid';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { updateFeedback } from 'redux/feedback/actions';
import { H5, Section, HeaderTitle, HeaderRight, Avatar } from 'elements';
import { App } from 'components';

import { ReviewFeedBackBox } from '../_components';

const UserItem = styled.View`
  flex-direction: row;
  padding-vertical: 5;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const FeedbacksWrapper = styled.View`
  width: 350px;
  margin: 20px auto;
`;

const Review = (
  { editable, questions, user, updateFeedback, callback },
  { formatMessage }
) => {
  return (
    <App>
      <HeaderTitle>
        {formatMessage(
          `feedback.review.${editable ? 'pending' : 'sent'}.headerTitle`
        )}
      </HeaderTitle>
      <HeaderRight />
      <Section>
        <UserItem>
          <Avatar source={user.avatar} mr={10} />
          <H5>{user.name}</H5>
        </UserItem>
      </Section>
      <FeedbacksWrapper>
        {questions.length > 0 &&
          questions.map(item => {
            return (
              <ReviewFeedBackBox
                key={uuid.v4()}
                title={item.question}
                text={item.feedback}
                mb={40}
                editable={editable}
                leaveClicked={answer => {
                  const { feedback_id } = item;
                  updateFeedback(feedback_id, {
                    feedback: {
                      ...item,
                      pending: false,
                      feedback: answer
                    },
                    onSuccess: p => {
                      console.log('update feedback failed', p);
                      callback(feedback_id, answer);
                      Actions.feedback();
                    },
                    onFailure: e => {
                      console.log('update feedback failed', e);
                    }
                  });
                }}
              />
            );
          })}
      </FeedbacksWrapper>
    </App>
  );
};

Review.propTypes = {
  updateFeedback: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.shape({})),
  user: PropTypes.shape(),
  editable: PropTypes.bool,
  callback: PropTypes.func
};

Review.contextTypes = {
  formatMessage: PropTypes.func
};

Review.defaultProps = {
  editable: true,
  questions: [],
  user: {},
  callback: () => {}
};

const mapDispatchToProps = dispatch => ({
  updateFeedback: (id, payload) => dispatch(updateFeedback(id, payload))
});

export default connect(null, mapDispatchToProps)(Review);
