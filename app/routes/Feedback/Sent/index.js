import React from 'react';
import PropTypes from 'prop-types';
import uuid from 'uuid';
import { Actions } from 'react-native-router-flux';
import styled from 'styled-components';

import { H4, H5, Avatar } from 'elements';

import {
  SceneContainer,
  UserListWrapper,
  FullWidthFlatList
} from '../_components';

export const UserItem = styled.TouchableOpacity`
  flex-direction: row;
  padding-vertical: 9px;
  align-items: center;
  width: 100%;
`;

const Sent = ({ sent }, { formatMessage }) => {
  let users = sent.map(item => item.user);
  if (users && users.length > 0) {
    users = users.filter(
      (user, index, self) =>
        index === self.findIndex(t => t.user_id === user.user_id)
    );
  }

  return (
    <SceneContainer>
      <H4 align="left" mt={20} ml={20} mb={0}>
        {formatMessage('feedback.sent.displayText1')}
      </H4>
      <H5 align="left" ml={20} mb={20}>
        {formatMessage('feedback.sent.displayText2')}
      </H5>
      {Boolean(users.length) && (
        <UserListWrapper>
          <FullWidthFlatList
            data={users}
            renderItem={({ item }) => (
              <UserItem
                key={uuid.v4()}
                onPress={() => {
                  const SentByThisUser = sent.filter(
                    subSent => subSent.user.user_id === item.user_id
                  );
                  Actions['feedback.review.sent']({
                    questions: SentByThisUser,
                    user: item,
                    editable: false
                  });
                }}
              >
                <Avatar source={item.avatar} mr={10} />
                <H5>{item.name}</H5>
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

Sent.propTypes = {
  sent: PropTypes.arrayOf(PropTypes.shape({}))
};

Sent.contextTypes = {
  formatMessage: PropTypes.func
};

Sent.defaultProps = {
  sent: []
};

export default Sent;
