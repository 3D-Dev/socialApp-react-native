import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Image from 'react-native-image-progress';
import uuid from 'uuid';

import { ImageWithLoading } from 'elements';
import { removeDuplicates } from 'utils/feedback';

const Collaborators = styled.View`
  width: 50;
  margin-right: 10;
  flex-direction: row;
  justify-content: flex-end;
  position: relative;
`;

const UserAvatars = ({ members }, { profileData }) => {
  let selectedAvatars = [];

  // get avatar list form memberID and storage Users list
  if (members && members.length > 0) {
    members.forEach(member => {
      if (member && member.avatar) {
        selectedAvatars.push(member.avatar);
      }
    });
  }
  if (profileData.avatar) {
    selectedAvatars.push(profileData.avatar);
  }

  if (selectedAvatars.length > 2) {
    selectedAvatars = removeDuplicates(selectedAvatars);
  }

  // select only 3 avatars from list
  if (selectedAvatars.length > 3) {
    selectedAvatars = selectedAvatars.slice(
      selectedAvatars.length - 4,
      selectedAvatars.length - 1
    );
  }

  return (
    <Collaborators>
      {selectedAvatars.length > 0 ? (
        selectedAvatars.map(item => {
          return (
            <ImageWithLoading
              key={uuid.v4()}
              image={item}
              width={30}
              height={30}
              circle
              imgStyle={{
                marginLeft: -20
              }}
            />
          );
        })
      ) : (
        <Image key={uuid.v4()} />
      )}
    </Collaborators>
  );
};

UserAvatars.propTypes = {
  members: PropTypes.arrayOf(PropTypes.shape({}))
};

UserAvatars.contextTypes = {
  profileData: PropTypes.shape({}).isRequired
};

UserAvatars.defaultProps = {
  members: []
};

export default UserAvatars;
