import React from 'react';
import PropTypes from 'prop-types';
import { AntDesign } from '@expo/vector-icons';
import styled from 'styled-components';

const Container = styled.TouchableOpacity`
  width: ${({ width }) => width};
  height: ${({ height }) => height};

  align-items: center;
  justify-content: center;

  border: 1px solid ${({ theme }) => theme.COLORS.BORDER};
  padding-horizontal: 5;
  padding-vertical: 5;
  ${props =>
    props.circle &&
    `
    border-radius: ${props.width / 2};
  `}
`;

const UploadButton = (
  { circle, icon, onPress, width, height },
  { currentTheme }
) => (
  <Container onPress={onPress} circle={circle} width={width} height={height}>
    <AntDesign name={icon} size={50} color={currentTheme.COLORS.PRIMARY} />
  </Container>
);

UploadButton.propTypes = {
  width: PropTypes.number,
  height: PropTypes.number,
  circle: PropTypes.bool,
  icon: PropTypes.string,
  onPress: PropTypes.func
};

UploadButton.contextTypes = {
  currentTheme: PropTypes.shape()
};

UploadButton.defaultProps = {
  onPress: () => {},
  circle: false,
  icon: 'upload',
  width: 80,
  height: 80
};

export default UploadButton;
