import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FlatList, TouchableOpacity } from 'react-native';
import { Row } from 'react-native-easy-grid';
import { AntDesign } from '@expo/vector-icons';

import { H4, Avatar, NoAvatar } from 'elements';

import { ColVerticalCentered } from '../TrustNetworkBox';

const Container = styled.View`
  padding-horizontal: 10px;
  height: 200px;
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 5;
  padding-vertical: 10px;
`;

const UserListDropdown = (
  { users, onPress },
  { currentTheme, profileData }
) => {
  const userData =
    users.length > 0 ? users.filter(item => item._id !== profileData._id) : [];

  return (
    <Container theme={currentTheme}>
      <FlatList
        scrollEnabled
        data={userData}
        extraData={users.length}
        keyExtractor={(item, index) => `${item._id}_${index}`}
        renderItem={({ item }) => {
          return (
            <Row style={{ marginBottom: 10 }}>
              <ColVerticalCentered style={{ width: 50 }}>
                {item.avatar ? (
                  <Avatar source={item.avatar} size={50} />
                ) : (
                  <NoAvatar size={50} />
                )}
              </ColVerticalCentered>
              <ColVerticalCentered
                style={{ paddingLeft: 10, alignItems: 'flex-start' }}
              >
                <H4 align="left">{item.name}</H4>
              </ColVerticalCentered>
              <ColVerticalCentered style={{ width: 50 }}>
                <TouchableOpacity
                  onPress={() => {
                    onPress(item._id);
                  }}
                >
                  <AntDesign
                    name="minuscircleo"
                    size={25}
                    color={currentTheme.COLORS.PRIMARY}
                  />
                </TouchableOpacity>
              </ColVerticalCentered>
            </Row>
          );
        }}
      />
    </Container>
  );
};

UserListDropdown.propTypes = {
  users: PropTypes.arrayOf(PropTypes.shape({})),
  onPress: PropTypes.func.isRequired
};

UserListDropdown.contextTypes = {
  currentTheme: PropTypes.shape(),
  profileData: PropTypes.shape()
};

UserListDropdown.defaultProps = {
  users: []
};

export default UserListDropdown;
