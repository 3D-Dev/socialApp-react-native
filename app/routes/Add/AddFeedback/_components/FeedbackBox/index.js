import React from 'react';
import PropTypes from 'prop-types';
import { TouchableOpacity } from 'react-native';
import styled from 'styled-components';
import { Col, Row } from 'react-native-easy-grid';
import { AntDesign } from '@expo/vector-icons';

import { H4 } from 'elements';

const ColContainer = styled(Col)`
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 10;
  border-width: 1px;
  padding: 10px;
  margin-vertical: 10px;
`;

const FeedBackBox = ({ text, removeClicked }, { currentTheme }) => (
  <Row>
    <ColContainer
      style={{
        alignItems: 'center',
        paddingHorizontal: 1
      }}
    >
      <H4 align="left">{text}</H4>
    </ColContainer>
    <Col style={{ width: 50, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity onPress={removeClicked}>
        <AntDesign
          name="delete"
          size={30}
          color={currentTheme.COLORS.PRIMARY}
        />
      </TouchableOpacity>
    </Col>
  </Row>
);

FeedBackBox.propTypes = {
  text: PropTypes.string.isRequired,
  removeClicked: PropTypes.func.isRequired
};

FeedBackBox.contextTypes = {
  currentTheme: PropTypes.shape()
};

export default FeedBackBox;
