import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import uuid from 'uuid';

import { Text, SmallText, ImageWithLoading } from 'elements';

const Row = styled.View`
  width: 100%;
  flex-direction: row;
  margin-bottom: 20px;
`;

export const AvatarArea = styled.View`
  width: 70px;
  align-items: center;
`;

export const Avatar = styled.Image`
  width: 60px;
  height: 60px;
  border-radius: 30px;
  margin-bottom: 5px;
`;

const FeedbackArea = styled.View`
  flex: 1;
  padding-horizontal: 10px;
`;

const Feedback = styled(Text)`
  margin-bottom: 10px;
  border-radius: 10px;
  border: ${({ theme }) => `1px solid ${theme.COLORS.BORDER}`};
  padding: 3px;
`;

const RequestFBBox = ({ feedback, callback }, { currentTheme }) => {
  const { avatar, name, questions } = feedback;
  return (
    <Row>
      <AvatarArea>
        <ImageWithLoading image={avatar} width={60} height={60} circle />
        <SmallText>{name || 'unnamed'}</SmallText>
      </AvatarArea>

      <FeedbackArea>
        {questions.map(q => (
          <Feedback key={uuid.v4()}>{q}</Feedback>
        ))}
      </FeedbackArea>
      <AvatarArea style={{ width: 20, paddingTop: 15 }}>
        <TouchableOpacity onPress={callback}>
          <AntDesign
            name="delete"
            size={20}
            color={currentTheme.COLORS.PRIMARY}
          />
        </TouchableOpacity>
      </AvatarArea>
    </Row>
  );
};

RequestFBBox.propTypes = {
  feedback: PropTypes.shape({
    avatar: PropTypes.string,
    name: PropTypes.string,
    questions: PropTypes.arrayOf(PropTypes.string)
  }),
  callback: PropTypes.func
};

RequestFBBox.contextTypes = {
  currentTheme: PropTypes.shape()
};

RequestFBBox.defaultProps = {
  feedback: {},
  callback: () => {}
};

export default RequestFBBox;
