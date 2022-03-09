import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { Actions } from 'react-native-router-flux';

import { H5, H4, Avatar } from 'elements';

import styled from 'styled-components';
import {
  SceneContainer,
  UserListWrapper,
  FullWidthFlatList
} from '../_components';

export const UserItem = styled.View`
  flex-direction: row;
  padding-vertical: 5;
  align-items: center;
  width: 100%;
`;

const FullH5 = styled(H5)`
  flex: 1;
`;

const EditButton = styled.TouchableOpacity`
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  padding: 5px 10px;
`;

const Pending = ({ pending, callback }, { formatMessage }) => {
  let users = pending.map(item => item.user);
  if (users && users.length > 0) {
    users = users.filter(
      (user, index, self) =>
        index === self.findIndex(t => t.user_id === user.user_id)
    );
  }

  return (
    <SceneContainer>
      <H4 align="left" mt={20} ml={20} mb={0}>
        {formatMessage('feedback.pending.displayText1')}
      </H4>
      <H5 align="left" ml={20} mb={20}>
        {formatMessage('feedback.pending.displayText2')}
      </H5>
      {Boolean(users.length) && (
        <UserListWrapper>
          <FullWidthFlatList
            data={users}
            renderItem={({ item }) => (
              <UserItem key={uuid.v4()} onPress={() => {}}>
                <Avatar size={50} mr={10} source={item.avatar} />
                <FullH5 align="left">{item.name}</FullH5>
                <EditButton
                  onPress={() => {
                    const pendingRequestedByThisUser = pending.filter(
                      subSent => subSent.user.user_id === item.user_id
                    );
                    Actions['feedback.review.sent']({
                      questions: pendingRequestedByThisUser,
                      user: item,
                      editable: true,
                      callback
                    });
                  }}
                >
                  <H5 mb={0}>{formatMessage('feedback.pending.review')}</H5>
                </EditButton>
              </UserItem>
            )}
            keyExtractor={item => {
              return `${item.user_id}_${uuid.v4()}`;
            }}
          />
        </UserListWrapper>
      )}
    </SceneContainer>
  );
};

Pending.propTypes = {
  pending: PropTypes.arrayOf(PropTypes.shape({})),
  callback: PropTypes.func.isRequired
};

Pending.contextTypes = {
  formatMessage: PropTypes.func
};

Pending.defaultProps = {
  pending: []
};

export default Pending;
