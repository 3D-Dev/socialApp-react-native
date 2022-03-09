import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';
import { TouchableOpacity, View } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

import { UploadButton, Avatar, NoAvatar, H5 } from 'elements';
import { removeDuplicates } from 'utils/api';
import LoadUsers from '../Sync/Users';
import FlatListWithEnd from '../FlatListWithEnd';

const Container = styled.View`
  height: 150px;
  margin-vertical: 10px;
`;

const TrashWrapper = styled(TouchableOpacity)`
  position: absolute;
  right: 2;
  top: 5;
`;

class AddUsers extends Component {
  static propTypes = {
    callback: PropTypes.func,
    userList: PropTypes.arrayOf(PropTypes.shape({})),
    setModalStatus: PropTypes.func
  };

  static contextTypes = {
    currentTheme: PropTypes.shape(),
    formatMessage: PropTypes.func,
    users: PropTypes.shape({}).isRequired
  };

  static defaultProps = {
    callback: () => {},
    setModalStatus: () => {},
    userList: []
  };

  onRemoveUser = id => () => {
    const { userList, callback } = this.props;
    if (userList && userList.length > 0) {
      const users = userList.filter(u => u._id !== id);
      callback(users);
    }
  };

  callback = res => {
    const { userList, callback } = this.props;
    const newUL = userList.concat(res);
    const filteredArray = res.length === 0 ? [] : removeDuplicates(newUL);
    callback(filteredArray);
  };

  render() {
    const { currentTheme } = this.context;
    const { userList, setModalStatus } = this.props;

    return (
      <Container>
        <LoadUsers />
        <FlatListWithEnd
          hasEnd
          inverted
          horizontal
          scrollEnabled
          data={userList}
          keyExtractor={(item, index) => `${index}`}
          renderItem={({ item }) => {
            if (item) {
              return (
                <View style={{ padding: 10, maxWidth: 120 }}>
                  {item.avatar ? (
                    <Avatar source={item.avatar} size={80} />
                  ) : (
                    <NoAvatar size={80} />
                  )}
                  <TrashWrapper onPress={this.onRemoveUser(item._id)}>
                    <EvilIcons
                      name="trash"
                      size={40}
                      color={currentTheme.COLORS.PRIMARY}
                    />
                  </TrashWrapper>
                  <View style={{ maxWidth: 100 }}>
                    <H5>{item.name || 'unanmed'}</H5>
                  </View>
                </View>
              );
            }
            return <View />;
          }}
          renderEndComponent={() => {
            return (
              <View style={{ paddingVertical: 10, paddingLeft: 5 }}>
                <UploadButton
                  onPress={() => {
                    setModalStatus(true);
                    return Actions['user.search']({
                      selectedUsers: userList,
                      callback: this.callback,
                      setModalStatus
                    });
                  }}
                  circle
                  icon="plus"
                />
              </View>
            );
          }}
        />
      </Container>
    );
  }
}

export default AddUsers;
