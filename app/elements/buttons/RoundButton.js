import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

const Container = styled.View`
  min-width: 80px;
  text-align: center;
  ${({ isFullWidth }) => !isFullWidth && 'align-self: flex-start;'};
  margin: ${({ isFullWidth }) => (isFullWidth ? '0 20px' : '0 auto')};
  opacity: ${({ disabled }) => (disabled ? '0.5' : '1')};
`;

const ClickArea = styled.TouchableOpacity`
  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  border-radius: 7px;
  padding: 8px 20px 3px;
  margin-top: ${({ mt }) => mt}px;
  margin-bottom: ${({ mb }) => mb}px;
  margin-horizontal: 0px;
  ${props => {
    const bgColor = props.danger ? props.theme.COLORS.DANGER : 'transparent';
    return `background-color: ${bgColor};`;
  }}
`;

const Divider = styled.View`
  border-bottom-color: ${({ theme }) => theme.COLORS.PRIMARY};
  border-bottom-width: 1.1px;
  margin: 0px 35px;
`;

const RoundButton = ({
  children,
  isFullWidth,
  onPress,
  hasDivider,
  disabled,
  danger,
  mt,
  mb
}) => {
  return (
    <Container isFullWidth={isFullWidth} disabled={disabled}>
      <ClickArea
        onPress={onPress}
        disabled={disabled}
        danger={danger}
        mt={mt}
        mb={mb}
      >
        {children}
      </ClickArea>
      {hasDivider && <Divider />}
    </Container>
  );
};

RoundButton.propTypes = {
  onPress: PropTypes.func,
  children: PropTypes.node.isRequired,
  hasDivider: PropTypes.bool,
  isFullWidth: PropTypes.bool,
  disabled: PropTypes.bool,
  danger: PropTypes.bool,
  mt: PropTypes.number,
  mb: PropTypes.number
};

RoundButton.defaultProps = {
  mt: 15,
  mb: 15,
  onPress: () => {},
  hasDivider: false,
  isFullWidth: false,
  disabled: false,
  danger: false
};

export default RoundButton;
