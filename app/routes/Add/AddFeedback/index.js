import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Col } from 'react-native-easy-grid';
import { AntDesign } from '@expo/vector-icons';

import { getSelector } from 'redux/selectors';
import { createFeedbacks, setFeedbacks } from 'redux/feedback/actions';
import {
  H2,
  HeaderTitle,
  HeaderRight,
  HeaderButton,
  H5,
  Section
} from 'elements';
import { App, AddUsers, LoadUsers } from 'components';

import { FeedbackBox } from './_components';

const CenterView = styled.View`
  width: 100%;
  text-align: center;
  margin-bottom: 10px;
`;

const IconRightWrapper = styled(Col)`
  width: 40;
  align-items: center;
  ${({ disabled }) =>
    disabled &&
    `
    opacity: 0.5;
  `}}
`;

class AddFeedback extends Component {
  static propTypes = {
    createFeedbacks: PropTypes.func.isRequired,
    setFeedbacks: PropTypes.func.isRequired,
    feedbacks: PropTypes.shape({
      updated: PropTypes.string,
      feedbacks: PropTypes.arrayOf(PropTypes.shape({}))
    }).isRequired
  };

  static contextTypes = {
    formatMessage: PropTypes.func,
    currentTheme: PropTypes.shape(),
    setReflection: PropTypes.func,
    reflection: PropTypes.arrayOf(PropTypes.shape()),
    users: PropTypes.shape({}).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      feedbackUserList: [],
      feedbackList: []
    };
  }

  onRequestFeedback = () => {
    const { feedbackUserList, feedbackList } = this.state;
    const { createFeedbacks } = this.props;

    createFeedbacks({
      receivers: feedbackUserList.map(item => {
        return {
          _id: item._id
        };
      }),
      questions: feedbackList,
      onSuccess: () => {
        const { setFeedbacks, feedbacks } = this.props;
        setFeedbacks({ ...feedbacks });
        Actions['add.congrats']({ addType: 'Feedback' });
      }
    });
  };

  removeFeedback = feedback => {
    const { feedbackList } = this.state;
    const filters = feedbackList.filter(item => item !== feedback);
    this.setState({ feedbackList: filters });
  };

  onCreateFeedback = feedback => {
    const { feedbackList } = this.state;
    if (
      feedbackList.length === 0 ||
      feedbackList.findIndex(f => f === feedback) < 0
    ) {
      feedbackList.push(feedback);
    }
    this.setState({ feedbackList });
  };

  render() {
    const { formatMessage, currentTheme } = this.context;
    const { feedbackUserList, isDialogOpened, feedbackList } = this.state;

    return (
      <App>
        <LoadUsers />
        <HeaderTitle>{formatMessage('add.feedback.headerTitle')}</HeaderTitle>
        {!isDialogOpened && (
          <HeaderRight>
            <HeaderButton
              onPress={this.onRequestFeedback}
              disabled={
                feedbackUserList.length === 0 || feedbackList.length === 0
              }
            >
              {formatMessage('add.feedback.request')}
            </HeaderButton>
          </HeaderRight>
        )}
        <Section align="left">
          <CenterView>
            <H2 mt={20} mb={20} align="center">
              {formatMessage('add.feedback.heading')}
            </H2>
          </CenterView>
          <H5>{formatMessage('add.feedback.who')}</H5>
          <AddUsers
            userList={feedbackUserList}
            callback={res => {
              this.setState({ feedbackUserList: res });
            }}
            setModalStatus={status => {
              this.setState({
                isDialogOpened: status
              });
            }}
          />
          <H5 mb={10}>{formatMessage('add.feedback.questionTitle')}</H5>
          {feedbackList &&
            feedbackList.length > 0 &&
            feedbackList.map(f => {
              return (
                <FeedbackBox
                  text={f}
                  removeClicked={() => {
                    this.removeFeedback(f);
                  }}
                  key={f}
                />
              );
            })}
          <IconRightWrapper
            onPress={() => {
              Actions['add.feedback.create']({
                callback: this.onCreateFeedback
              });
            }}
          >
            <AntDesign
              name="plus"
              size={50}
              color={currentTheme.COLORS.PRIMARY}
            />
          </IconRightWrapper>
        </Section>
      </App>
    );
  }
}

const mapStateToProps = state => ({
  feedbacks: getSelector('feedback', 'feedbacks')(state)
});

const mapDispatchToProps = dispatch => ({
  createFeedbacks: payload => dispatch(createFeedbacks(payload)),
  setFeedbacks: payload => dispatch(setFeedbacks(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(AddFeedback);
