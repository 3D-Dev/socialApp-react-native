import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import H5 from 'elements/texts/H5';

const HeaderButtonWrapper = styled.TouchableOpacity`
  ${({ disabled }) => disabled && 'opacity: 0.5;'}
`;

const HeaderButton = ({ children, ...rest }, { currentTheme }) => (
  <HeaderButtonWrapper {...rest}>
    <H5 mb={5} color={currentTheme.COLORS.NAVBAR}>
      {children}
    </H5>
  </HeaderButtonWrapper>
);

HeaderButton.contextTypes = {
  formatMessage: PropTypes.func,
  currentTheme: PropTypes.shape()
};

HeaderButton.propTypes = {
  children: PropTypes.string
};

HeaderButton.defaultProps = {
  children: null
};

export default HeaderButton;
