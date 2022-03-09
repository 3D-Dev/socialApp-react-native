import React from 'react';
import { TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import EditableText from './EditableText';

const Container = styled.View`
  padding: 30px 20px;
  display: flex;
  flex-direction: row;
`;

const QRImage = styled.Image`
  width: 70;
  height: 70;
  margin-right: 20px;
`;

const NameArea = styled.View`
  padding-top: 10px;
  flex: 1;
`;

const QRArea = (
  { name, user_id, updateName, updateUserId, editable },
  { profileData, formatMessage }
) => {
  let required = false;
  if (profileData && profileData._id && profileData._id !== '') {
    required = true;
  }
  return (
    <Container>
      <TouchableOpacity onPress={() => {}}>
        <QRImage
          source={require('assets/images/icons/qr_icon.png')}
          style={{
            width: 70,
            height: 70,
            marginRight: 20
          }}
        />
      </TouchableOpacity>

      <NameArea>
        <EditableText
          text={name}
          onUpdate={updateName}
          type={formatMessage('name')}
          editable={editable}
          required={required}
        />
        <EditableText
          text={user_id}
          onUpdate={updateUserId}
          type={formatMessage('username')}
          editable={!user_id && editable}
        />
      </NameArea>
    </Container>
  );
};

QRArea.propTypes = {
  name: PropTypes.string,
  user_id: PropTypes.string,
  updateName: PropTypes.func,
  updateUserId: PropTypes.func,
  editable: PropTypes.bool
};

QRArea.contextTypes = {
  profileData: PropTypes.shape(),
  formatMessage: PropTypes.func
};

QRArea.defaultProps = {
  name: '',
  user_id: '',
  editable: true,
  updateName: () => {},
  updateUserId: () => {}
};

export default QRArea;
