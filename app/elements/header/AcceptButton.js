import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Actions } from 'react-native-router-flux';
import { noop } from 'lodash';

import H5 from '../texts/H5';

const AcceptButtonWrapper = styled.TouchableOpacity`
  ${({ disabled }) => disabled && 'opacity: 0.5;'}
`;

const AcceptButton = ({ onPress, type, ...rest }, { formatMessage }) => (
  <AcceptButtonWrapper
    onPress={(...args) => {
      onPress(...args);
      Actions['add.congrats']({ addType: type });
    }}
    {...rest}
  >
    <H5 mb={5}>{formatMessage('add.acceptButton')}</H5>
  </AcceptButtonWrapper>
);

AcceptButton.contextTypes = {
  formatMessage: PropTypes.func
};

AcceptButton.propTypes = {
  onPress: PropTypes.func,
  type: PropTypes.string.isRequired
};

AcceptButton.defaultProps = {
  onPress: noop
};

export default AcceptButton;
