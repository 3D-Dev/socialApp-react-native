import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { View } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { UserListMultiPicker } from 'routes/UserSearch/_components';
import { readUserReflections } from 'redux/reflection/actions';
import activities from 'mockups/data';
import { retrieveUserDataWithID } from 'utils/contact';

import { FeedBox } from '../_components';

const SearchContainer = styled.View`
  left: 15px;
  max-height: 10000px;
  position: absolute;
  z-index: 10;
`;

const FeedsContainer = styled.View`
  margin-top: 70px;
`;

class FeedSection extends Component {
  static propTypes = {
    // for networks
    networks: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    contacts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
    // for user's reflections
    readUserReflections: PropTypes.func.isRequired
  };

  static contextTypes = {
    users: PropTypes.shape({
      users: PropTypes.arrayOf(PropTypes.shape({})),
      updated: PropTypes.string
    }).isRequired,
    currentTheme: PropTypes.shape(),
    profileData: PropTypes.shape({}).isRequired
  };

  onPress = user => {
    const { networks } = this.props;
    let permissions = [];
    if (networks.length > 0) {
      networks.forEach(network => {
        const memberIds = network.members.map(item => item._id);
        if (memberIds.includes(user._id)) {
          permissions = permissions.concat(network.permissions);
        }
      });
      this.readUserReflectionData(user, permissions);
    }
  };

  readUserReflectionData = (user, permissions) => {
    const { readUserReflections } = this.props;
    readUserReflections(user._id, {
      onSuccess: p => {
        const { reflections } = p;
        return Actions['feed.profile']({
          user,
          permissions,
          reflections
        });
      },
      onFailure: e => {
        console.log(e);
      }
    });
  };

  render() {
    const { users, currentTheme, profileData } = this.context;
    const { contacts } = this.props;
    const feedData = [];

    for (let i = 0; i < contacts.length; i++) {
      const newFeed = {
        ...contacts[i],
        ...activities[i]
      };
      feedData.push(newFeed);
    }
    let fullFeedData = [];
    if (users && users.users && users.users.length > 0) {
      fullFeedData = retrieveUserDataWithID(feedData, users, 1);
    }

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
      <View style={{ padding: 15 }}>
        <SearchContainer>
          <UserListMultiPicker
            data={usersExceptMe}
            multiple={false}
            search
            placeholder="Type your name to filter users"
            placeholderTextColor={currentTheme.COLORS.PRIMARY}
            callback={([profile]) => {
              this.onPress(profile);
            }}
            searchIconName="ios-search"
            labelColor={currentTheme.COLORS.PRIMARY}
            selectedIconName=""
            unselectedIconName=""
            scrollViewHeight={300}
            isDropdown
          />
        </SearchContainer>
        <FeedsContainer>
          {fullFeedData.length > 0 &&
            fullFeedData.map(feed => (
              <FeedBox
                onPress={() => {
                  this.onPress(feed.joiner);
                }}
                key={feed._id}
                user={feed.joiner}
                text={feed.description}
                upVotePressed={() => {}}
                asset={feed.assetUrl}
                voted={feed.voted || false}
              />
            ))}
        </FeedsContainer>
      </View>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  readUserReflections: (id, payload) =>
    dispatch(readUserReflections(id, payload))
});

export default connect(null, mapDispatchToProps)(FeedSection);
