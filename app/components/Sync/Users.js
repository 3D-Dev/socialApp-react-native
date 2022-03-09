import { Component } from 'react';
import PropTypes from 'prop-types';

import { getLatestUpdateFromArray } from 'utils/api';

class LoadUsers extends Component {
  static contextTypes = {
    formatMessage: PropTypes.func.isRequired,
    readUsers: PropTypes.func.isRequired,
    setUsers: PropTypes.func.isRequired,
    users: PropTypes.shape({}).isRequired
  };

  state = {
    users: []
  };

  componentWillMount() {
    // preload user list by calling API
    const { readUsers, setUsers, users } = this.context;
    readUsers({
      onSuccess: payload => {
        if (payload && payload.users) {
          if (
            !users.updated ||
            getLatestUpdateFromArray(payload.users) > new Date(users.updated)
          ) {
            setUsers({
              updated: getLatestUpdateFromArray(payload.users).toString(),
              users: payload.users
            });
            this.setState({ users: payload.users });
          }
        }
      },
      onFailure: e => {
        console.log('call user list API failed:', e);
      }
    });
  }

  render() {
    const { users } = this.state;
    console.log(users);
    return null;
  }
}

export default LoadUsers;
