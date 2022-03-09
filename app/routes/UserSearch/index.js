import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Actions } from 'react-native-router-flux';

import { HeaderButton, HeaderTitle, HeaderRight, Section } from 'elements';
import { App } from 'components';

import { UserListMultiPicker } from './_components';

class UserSearch extends Component {
  static propTypes = {
    selectedUsers: PropTypes.arrayOf(PropTypes.shape()),
    callback: PropTypes.func,
    setModalStatus: PropTypes.func
  };

  static contextTypes = {
    currentTheme: PropTypes.shape(),
    formatMessage: PropTypes.func,
    users: PropTypes.shape({}).isRequired,
    profileData: PropTypes.shape({}).isRequired
  };

  static defaultProps = {
    selectedUsers: [],
    callback: () => {},
    setModalStatus: () => {}
  };

  render() {
    const { currentTheme, formatMessage } = this.context;
    const { selectedUsers, callback, setModalStatus } = this.props;
    const { users, profileData } = this.context;

    let usersExceptMe = [];
    if (
      profileData &&
      profileData._id &&
      users.users &&
      users.users.length > 1
    ) {
      usersExceptMe = users.users.filter(item => item._id !== profileData._id);
    }

    return (
      <App
        onBack={() => {
          callback([]);
        }}
      >
        <HeaderTitle theme={currentTheme}>
          {formatMessage('user.search.headerTitle')}
        </HeaderTitle>
        <HeaderRight>
          <HeaderButton
            onPress={() => {
              setModalStatus(false);
              Actions.pop();
            }}
          >
            {formatMessage('add.addButton')}
          </HeaderButton>
        </HeaderRight>
        <Section>
          <UserListMultiPicker
            data={usersExceptMe}
            search
            multiple
            placeholder="Type your name to filter users"
            placeholderTextColor={currentTheme.COLORS.PRIMARY}
            callback={res => {
              callback(res);
            }}
            searchIconName="ios-search"
            labelColor={currentTheme.COLORS.PRIMARY}
            selectedIconName="ios-checkmark-circle-outline"
            unselectedIconName="ios-add-circle-outline"
            scrollViewHeight={500}
            selected={selectedUsers}
          />
        </Section>
      </App>
    );
  }
}

export default UserSearch;
