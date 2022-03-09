import React, { Component } from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { connect } from 'react-redux';

import { deleteFeedbacks } from 'redux/feedback/actions';

import { RequestFBBox, SceneContainer } from '../_components';

class Requested extends Component {
  static propTypes = {
    requested: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({}))),
    deleteFeedbacks: PropTypes.func.isRequired,
    callback: PropTypes.func.isRequired
  };

  static contextTypes = {
    formatMessage: PropTypes.func
  };

  static defaultProps = {
    requested: []
  };

  constructor(props) {
    super(props);
    this.state = {
      requested: props.requested || []
    };
  }

  removeFeedbacks = (groupId, userId) => {
    const { deleteFeedbacks, callback } = this.props;

    deleteFeedbacks(groupId, {
      receiver: userId,
      onSuccess: p => {
        console.log('feedback remove success', p);
        callback(groupId, userId);
      },
      onFailure: e => {
        console.log('feedback delte failure', e);
      }
    });
  };

  render() {
    const { requested } = this.state;

    const feedbackComponents = [];
    if (requested.length > 0) {
      requested.forEach(byGroupIds => {
        if (byGroupIds.length > 0) {
          const newItem = {
            user_id: byGroupIds[0].user_id,
            name: byGroupIds[0].name,
            avatar: byGroupIds[0].avatar,
            groupId: byGroupIds[0].groupId,
            questions: byGroupIds.map(item => item.question)
          };
          feedbackComponents.push(
            <RequestFBBox
              key={uuid.v4()}
              feedback={newItem}
              callback={() => {
                const { groupId, user_id } = newItem;
                this.removeFeedbacks(groupId, user_id);
              }}
            />
          );
        }
      });
    }
    return <SceneContainer>{feedbackComponents}</SceneContainer>;
  }
}

const mapDispatchToProps = dispatch => ({
  deleteFeedbacks: (id, payload) => dispatch(deleteFeedbacks(id, payload))
});

export default connect(null, mapDispatchToProps)(Requested);
