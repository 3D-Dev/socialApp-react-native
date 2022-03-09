import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import ImageWithLoading from './ImageWithLoading';

const Avatar = ({ size, mr, source, ml }) => (
  <ImageWithLoading
    image={source}
    width={size}
    height={size}
    circle
    imgStyle={{
      borderRadius: size / 2,
      marginRight: mr,
      marginLeft: ml
    }}
  />
);

Avatar.propTypes = {
  size: PropTypes.number,
  mr: PropTypes.number,
  ml: PropTypes.number,
  source: PropTypes.string.isRequired
};

Avatar.defaultProps = {
  size: 30,
  mr: 0,
  ml: 0
};

const NoAvatarWrapper = styled(ImageWithLoading)`
  border-color: ${({ theme }) => theme.COLORS.BORDER};
  width: ${({ size }) => `${size}px`};
  height: ${({ size }) => `${size}px`};
  border-radius: ${({ size }) => `${size / 2}px`};
  border-width: 1;
  margin-right: ${({ mr }) => (mr ? `${mr}px` : '0px')};
`;

const NoAvatar = props => (
  <NoAvatarWrapper
    source={require('assets/images/profile/avatar.png')}
    {...props}
  />
);

export { Avatar, NoAvatar };
