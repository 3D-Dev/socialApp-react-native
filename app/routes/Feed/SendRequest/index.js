import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { getSelector } from 'redux/selectors';
import { readRequests, setRequests } from 'redux/contact/actions';
import { HeaderTitle, HeaderRight, Section } from 'elements';
import { App, LoadUsers } from 'components';
import { UserListMultiPicker } from 'routes/UserSearch/_components';

import RequestSection from './RequestSection';

const SearchContainer = styled(Section)`
  max-height: 430px;
`;

class SearchContact extends Component {
  static propTypes = {
    contacts: PropTypes.shape({
      contacts: PropTypes.arrayOf(PropTypes.shape({}))
    }).isRequired,
    requests: PropTypes.shape({
      contacts: PropTypes.arrayOf(PropTypes.shape({})),
      updated: PropTypes.string
    }).isRequired,
    readRequests: PropTypes.func.isRequired,
    setRequests: PropTypes.func.isRequired
  };

  static contextTypes = {
    currentTheme: PropTypes.shape(),
    formatMessage: PropTypes.func,
    users: PropTypes.shape({
      users: PropTypes.arrayOf(PropTypes.shape({})),
      updated: PropTypes.string
    }).isRequired,
    profileData: PropTypes.shape({}).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedUsers: [],
      requests: (props.requests || {}).contacts || []
    };
  }

  componentWillMount() {
    const { readRequests, requests } = this.props;
    readRequests({
      onSuccess: payload => {
        if (payload && payload.contacts) {
          if (
            !requests.updated ||
            new Date(payload.updated) > new Date(requests.updated)
          ) {
            this.updateRequestState(payload);
          }
        }
      }
    });
  }

  updateRequestState = payload => {
    const { setRequests } = this.props;
    setRequests(payload);
    this.setState({
      requests: payload.contacts
    });
  };

  render() {
    const { currentTheme, formatMessage, users, profileData } = this.context;
    let usersExceptMe = [];
    if (
      profileData &&
      profileData._id &&
      users.users &&
      users.users.length > 1
    ) {
      usersExceptMe = users.users.filter(item => item._id !== profileData._id);
    }

    const { selectedUsers, requests } = this.state;
    if (usersExceptMe.length > 0 && requests.length > 0) {
      usersExceptMe = usersExceptMe.map(item => {
        const index = requests.findIndex(request => item._id === request._id);
        let status = -1;
        if (index > -1) {
          status = requests[index].status;
          const statusText = formatMessage('feed.contact.request.status', {
            status: status === 0 ? 'Pending' : 'Accepted'
          });
          const newItem = {
            ...item,
            info: statusText
          };
          return newItem;
        }
        return item;
      });
    }

    return (
      <App>
        <LoadUsers />
        <HeaderTitle theme={currentTheme}>
          {formatMessage('user.search.headerTitle')}
        </HeaderTitle>
        <HeaderRight />
        <SearchContainer>
          <UserListMultiPicker
            data={usersExceptMe}
            multiple={false}
            search
            placeholder="Type your name to filter users"
            placeholderTextColor={currentTheme.COLORS.PRIMARY}
            callback={res => {
              this.setState({ selectedUsers: res });
            }}
            searchIconName="ios-search"
            labelColor={currentTheme.COLORS.PRIMARY}
            selectedIconName="ios-checkmark-circle-outline"
            unselectedIconName="ios-add-circle-outline"
            scrollViewHeight={350}
            selected={selectedUsers}
          />
        </SearchContainer>
        {selectedUsers && selectedUsers.length > 0 && (
          <RequestSection
            selectedUser={selectedUsers[0]}
            updateStatus={this.updateRequestState}
          />
        )}
      </App>
    );
  }
}

const mapStateToProps = state => ({
  contacts: getSelector('contact', 'contacts')(state),
  requests: getSelector('contact', 'requests')(state)
});

const mapDispatchToProps = dispatch => ({
  readRequests: payload => dispatch(readRequests(payload)),
  setRequests: payload => dispatch(setRequests(payload))
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchContact);
